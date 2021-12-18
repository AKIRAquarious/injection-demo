CREATE TABLE IF NOT EXISTS products
	(
     id integer primary key autoincrement, 
     name varchar(20) not null, 
     description varchar(120) default ''
    );

CREATE TABLE IF NOT EXISTS staff
	(
     id integer primary key autoincrement, 
     name varchar(20) not null, 
     phone text not null
    );
    
CREATE TABLE IF NOT EXISTS invoice
	(
     id integer primary key autoincrement, 
     total integer not null, 
     staff_id integer,
     constraint staff_fk
      foreign key (staff_id)
      references staff (id)
    );

INSERT INTO products
(name, description)
VALUES
('apple', 'the fruit, not the phone'),
('orange', 'the fruit, not the color'),
('spaghetti', 'moms');

INSERT INTO staff
(name, phone)
VALUES
('minh moc', '123456789'),
('hung heo', '987654321');

INSERT INTO invoice
(total, staff_id)
VALUES
(1, 0),
(99, 0),
(6969, 1);
