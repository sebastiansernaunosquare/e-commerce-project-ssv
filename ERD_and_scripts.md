# ERD

![image](https://github.com/sebastiansernaunosquare/e-commerce-project-ssv/assets/137529439/0aceccb5-253c-4243-9c70-13bf8ad6261c)

# Database script

```SQL
CREATE DATABASE yoroi-practical-project-db;

USE yoroi-practical-project-db;

CREATE TABLE tbl_user (
	email VARCHAR(100) NOT NULL UNIQUE PRIMARY KEY,
	password VARCHAR(100) NOT NULL,
	role INT
);

CREATE TABLE tbl_product (
	id SERIAL NOT NULL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	price INT NOT NULL,
	description VARCHAR(250) NOT NULL,
	stock INT NOT NULL
);

CREATE TABLE tbl_purchase (
	id SERIAL NOT NULL PRIMARY KEY,
	transactionDate DATE NOT NULL
);

CREATE TABLE tbl_user_purchase (
	userEmail varchar(100) NOT NULL,
	purchaseId INT NOT NULL,
	amount INT NOT NULL,
	PRIMARY KEY (userEmail, purchaseId)
);

CREATE TABLE tbl_purchase_product (
	productId INT NOT NULL,
	purchaseId INT NOT NULL,
	quantity INT,
	PRIMARY KEY (productId, purchaseId)
);

ALTER TABLE tbl_user_purchase
ADD CONSTRAINT FK_userEmail_PK_email
FOREIGN KEY (userEmail) REFERENCES tbl_user (email);

ALTER TABLE tbl_user_purchase
ADD CONSTRAINT FK_purchaseId_PK_id
FOREIGN KEY (purchaseId) REFERENCES tbl_purchase (id);

ALTER TABLE tbl_purchase_product
ADD CONSTRAINT FK_productId_PK_id
FOREIGN KEY (productId) REFERENCES tbl_product (id);

ALTER TABLE tbl_purchase_product
ADD CONSTRAINT FK_purchaseId_PK_id
FOREIGN KEY (purchaseId) REFERENCES tbl_purchase (id);
```
