from flask import Flask, request
from flask_cors import CORS
import json
import sqlite3

app = Flask(__name__)
app.env = 'development'
CORS(app, origins=["http://localhost:*", "http://127.0.0.1:*"])

@app.route('/')
def hello():
    return 'Hello, World!'

injectionString = f"select * from products where name like \"%%\" or \"%\"=\"%\""

@app.route('/search')
def search():
    query = request.args.get('query', default=injectionString)
    executedQuery = ''

    def callback(trace: str): 
        nonlocal executedQuery
        executedQuery = trace
    
    conn = sqlite3.connect('doc.db')
    conn.set_trace_callback(callback)
    conn.row_factory = sqlite3.Row
    db = conn.cursor()
    rows = db.execute(f"""
        select id, name, description
        from products
        where name = '{query}'
    """).fetchall()
    conn.commit()
    conn.close()

    response = dict(query=executedQuery, data=[dict(row) for row in rows])

    return json.dumps(response)

@app.route('/secured-search')
def securedSearch():
    query = request.args.get('query', default=injectionString)
    executedQuery = ''

    def callback(trace: str): 
        nonlocal executedQuery
        executedQuery = trace
    
    conn = sqlite3.connect('doc.db')
    conn.set_trace_callback(callback)
    conn.row_factory = sqlite3.Row
    db = conn.cursor()
    rows = db.execute("""
        select id, name, description
        from products
        where name = ?
    """, [query]).fetchall()
    conn.commit()
    conn.close()

    response = dict(query=executedQuery, data=[dict(row) for row in rows])

    return json.dumps(response)

if __name__ == '__main__':
   app.run()
