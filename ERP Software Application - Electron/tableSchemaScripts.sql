DROP TABLE IF EXISTS product_Dimension CASCADE;
DROP TABLE IF EXISTS customer_Dimension CASCADE;
DROP TABLE IF EXISTS order_Time_Dimension CASCADE;
DROP TABLE IF EXISTS employee_Dimension CASCADE;
DROP TABLE IF EXISTS Fact_Sales CASCADE;
DROP SCHEMA IF EXISTS Star CASCADE;




CREATE SCHEMA IF NOT EXISTS Star;


CREATE TABLE IF NOT EXISTS product_Dimension (
	productID SERIAL NOT NULL,
  productName VARCHAR(50),
  productCategory VARCHAR(50),
  productDescription VARCHAR(50),
  PRIMARY KEY (productID)
);

CREATE TABLE IF NOT EXISTS customer_Dimension (
	customerID SERIAL  NOT NULL,
  customerName VARCHAR(50),
  customerAddress VARCHAR(50),
  customerCity VARCHAR(50),
  customerZip VARCHAR(50),
  PRIMARY KEY (customerID)
);

CREATE TABLE IF NOT EXISTS order_Time_Dimension (
	orderDateID SERIAL NOT NULL,
  orderDate DATE,
  year INT,
  month INT,
  day INT,
  quarter INT,
  PRIMARY KEY (orderDateID)
);

CREATE TABLE IF NOT EXISTS employee_Dimension (
	employeeID SERIAL NOT NULL,
  employeeName VARCHAR(100),
  title VARCHAR(50),
  department VARCHAR(50),
  PRIMARY KEY (employeeID)
);

CREATE TABLE IF NOT EXISTS Fact_Sales (
	productID INT,
	customerID INT,
	orderDateID INT,
	employeeID INT,
	quantity INT,
	discount INT,
  unitPrice INT,
  totalSales INT,
  totalCost INT
  /*CONSTRAINT FK_productID FOREIGN KEY (productID) REFERENCES product_Dimension(productID),
  CONSTRAINT FK_customerID FOREIGN KEY (customerID) REFERENCES customer_Dimension(customerID),
  CONSTRAINT FK_orderDateID FOREIGN KEY (orderDateID) REFERENCES order_Time_Dimension(orderDateID),
  CONSTRAINT FK_employeeID FOREIGN KEY (employeeID) REFERENCES employee_Dimension(employeeID)*/
);


/*Prouduct Table*/
INSERT INTO product_Dimension (productName, productCategory, productDescription) values ('tomato', 'produce', 'red and yummy');
INSERT INTO product_Dimension (productName, productCategory, productDescription) values ('lettuce', 'produce', 'leafy');
INSERT INTO product_Dimension (productName, productCategory, productDescription) values ('zucchini', 'produce', '7 out of 10');
INSERT INTO product_Dimension (productName, productCategory, productDescription) values ('beef', 'meat', 'beefy');
INSERT INTO product_Dimension (productName, productCategory, productDescription) values ('turkey', 'meat', 'thanksgiving');
INSERT INTO product_Dimension (productName, productCategory, productDescription) values ('chicken', 'meat', 'healthy option');
INSERT INTO product_Dimension (productName, productCategory, productDescription) values ('onion', 'produce', 'makes you cry when cut');
INSERT INTO product_Dimension (productName, productCategory, productDescription) values ('doritos', 'snack', 'cool ranch');
INSERT INTO product_Dimension (productName, productCategory, productDescription) values ('oreos', 'snack', 'classic');
INSERT INTO product_Dimension (productName, productCategory, productDescription) values ('milk', 'dairy', '2%');

/*Customer Table*/
INSERT INTO customer_Dimension (customerName, customerAddress, customerCity, customerZip) values ('Joe Schmo', '3569 Surrey Crossing', 'New York City', '93017');
INSERT INTO customer_Dimension (customerName, customerAddress, customerCity, customerZip) values ('Timothy Stump', '232 Maple Wood Street', 'London', '5047');
INSERT INTO customer_Dimension (customerName, customerAddress, customerCity, customerZip) values ('George Hernandez', '7945 Fairview Parkway', 'San Francisco', '250258');
INSERT INTO customer_Dimension (customerName, customerAddress, customerCity, customerZip) values ('Loriann Spaghetti', '89382 Stuart Parkway', 'London', '4765-122');
INSERT INTO customer_Dimension (customerName, customerAddress, customerCity, customerZip) values ('Charle Chicken', '	4 Dakota Terrace', 'New York City', '68100');
INSERT INTO customer_Dimension (customerName, customerAddress, customerCity, customerZip) values ('Scott Sterling', '107 Ridge Oak Plaza', 'New York City', '35010');
INSERT INTO customer_Dimension (customerName, customerAddress, customerCity, customerZip) values ('Harry Potter', '28 Larry Junction', 'San Francisco', '7213');
INSERT INTO customer_Dimension (customerName, customerAddress, customerCity, customerZip) values ('Andrew Topper', '9915 Atwood Parkway', 'Chicago', '1711');
INSERT INTO customer_Dimension (customerName, customerAddress, customerCity, customerZip) values ('Harry Styles', '2 Cascade Pass', 'Chigaco', '36195');
INSERT INTO customer_Dimension (customerName, customerAddress, customerCity, customerZip) values ('Matt Matthews', '3984 Crowley Park', 'London', '624577');

/*Order_Time Table*/
INSERT INTO order_Time_Dimension (orderDate, year, month, day, quarter) values ('12/3/2020', 2020, 12, 3, 4);
INSERT INTO order_Time_Dimension (orderDate, year, month, day, quarter) values ('3/17/2021', 2021, 3, 17, 1);
INSERT INTO order_Time_Dimension (orderDate, year, month, day, quarter) values ('1/2/2021', 2021, 1, 2, 1);
INSERT INTO order_Time_Dimension (orderDate, year, month, day, quarter) values ('8/13/2020', 2020, 8, 13, 3);
INSERT INTO order_Time_Dimension (orderDate, year, month, day, quarter) values ('3/3/2021', 2021, 3, 3, 1);
INSERT INTO order_Time_Dimension (orderDate, year, month, day, quarter) values ('3/31/2021', 2021, 3, 31, 1);
INSERT INTO order_Time_Dimension (orderDate, year, month, day, quarter) values ('1/28/2021', 2021, 1, 28, 1);
INSERT INTO order_Time_Dimension (orderDate, year, month, day, quarter) values ('8/7/2020', 2020, 8, 7, 3);
INSERT INTO order_Time_Dimension (orderDate, year, month, day, quarter) values ('10/21/2020', 2020, 10, 21, 4);
INSERT INTO order_Time_Dimension (orderDate, year, month, day, quarter) values ('8/9/2020', 2020, 8, 9, 3);

/*Employee Table*/
INSERT INTO employee_Dimension (employeeName, title, department) values ('Chris Jenkins', 'Financial Analyst', 'Accounting');
INSERT INTO employee_Dimension (employeeName, title, department) values ('Brian Schmidt', 'Book Keeper', 'Accounting');
INSERT INTO employee_Dimension (employeeName, title, department) values ('Natale Apples', 'Customer Support Lead', 'CRM');
INSERT INTO employee_Dimension (employeeName, title, department) values ('Gregory Cheese', 'Invoice Manager', 'Orders');
INSERT INTO employee_Dimension (employeeName, title, department) values ('Baci Buttons', 'Customer Support Intern', 'CRM');


/*Sales Table ---------------------This Fact table and model used is shorthanded and not exactly accurate for a functional model of a star schema that would be used for analytical purposes such as This
 but more so contains some test data for the purpose of showing examples. If I were to want a production quality database more work would need to be done*/

INSERT INTO Fact_Sales (productID, customerID, orderDateID, employeeID, quantity, discount, unitPrice, totalSales, totalCost) values (5,7,6,2,58,0.64,983.62,5517.17,4562.67);
INSERT INTO Fact_Sales (productID, customerID, orderDateID, employeeID, quantity, discount, unitPrice, totalSales, totalCost) values (10,4,7,3,55,0.57,549.92,5460.90,2803.55);
INSERT INTO Fact_Sales (productID, customerID, orderDateID, employeeID, quantity, discount, unitPrice, totalSales, totalCost) values (2,6,6,4,58,0.24,758.63,9891.04,6577.08);
INSERT INTO Fact_Sales (productID, customerID, orderDateID, employeeID, quantity, discount, unitPrice, totalSales, totalCost) values (5,4,4,3,91,0.0,626.62,5805.28,2375.77);
INSERT INTO Fact_Sales (productID, customerID, orderDateID, employeeID, quantity, discount, unitPrice, totalSales, totalCost) values (6,5,2,5,19,0.33,893.87,9780.24,2001.82);
INSERT INTO Fact_Sales (productID, customerID, orderDateID, employeeID, quantity, discount, unitPrice, totalSales, totalCost) values (9,7,8,2,8,0.27,28.40,1873.65,9374.66);
INSERT INTO Fact_Sales (productID, customerID, orderDateID, employeeID, quantity, discount, unitPrice, totalSales, totalCost) values (1,7,8,5,3,0.58,30.63,8570.50,2343.47);
INSERT INTO Fact_Sales (productID, customerID, orderDateID, employeeID, quantity, discount, unitPrice, totalSales, totalCost) values (3,6,3,1,95,0.78,449.47,7927.59,2356.41);
INSERT INTO Fact_Sales (productID, customerID, orderDateID, employeeID, quantity, discount, unitPrice, totalSales, totalCost) values (7,5,9,3,100,0.13,429.69,7491.69,2742.34);
