# Yoroi store

**Project scope**

Develop an e-commerce site that's going to allow the user to login or create an account, add products to a cart, purchase the items and keep track of the purchases

**Modules**

 - Authentication Module
 - Products Module
 - Home Page Module
 - Cart Module
 - Purchase Module

**Entities**

**Product**
 - id
 - name
 - price
 - description
 - stock

**User**
 - email
 - password
 - role
 - purchases

**Purchase**
 - id
 - products
 - amount
 - quantity
 - transaction date

**Functional requirements**

**Authentication Module**

|Code|Description|
|--|--|
|**FR01**|In the create account page and log in page, the site is going to show the validity of the form and display the messages, the user can not submit the form if these fields are not valid|
|**FR02**|When the user creates an account or logs in a succesful message is shown and it will redirect to the home page otherwise it will show an error message|

**Products Module**

|Code|Description|
|--|--|
|**FR01**|When the user has an admin role an additional link is show to go to the product module|
|**FR02**|The admin user can create, update, delete and see the products to manage on the page, for each action the site is going to display a succesful or unsucessful message|

**Home Page Module**

|Code|Description|
|--|--|
|**FR01**|The home page is going to display some products for the user to see and have the options to add to the cart|

**Cart Module**
|Code|Description|
|--|--|
|**FR01**|The site is going to show an overlay when the cart button is clicked|
|**FR02**|The cart overlay is going to display the items added to the cart|
|**FR03**|For each item displayed the site is going to have options for removing the item from the cart, options to increment and decrement the quantity in case the quantity surpasses the available stock the site will show a message|
|**FR04**|The cart overlay is going to have and options to purchase the items and redirect the user to the purchase page|

**Purchase Module**
|Code|Description|
|--|--|
|**FR01**|The purchase page is going to show the items and allow the user to remove the item, increment, decrement the quantity, show the total price of the purchase and have a button to pay the items|
|**FR02**|The purchase page is going to show an option to see an overall detail of the purchases|

**Non-functional requirements**

|Quality Attribute|Tool(s)|Scope description|
|--|--|--|
|**Performance**|React|This library lets you build user interfaces out of individual pieces called components optimizing page loading and developer set up|
|**Scalibility**|Client server-architecture|This architecture allows the site or application to have independent frontend and backend communication by making use of APIs|
|**Environmental**|Nodejs-Express|These environment and library allows us to create APIs|
|**Availability-Reliability**|MySql-Postgres|These Database allows us to have available and reliable access to data|

**Wireframes**

**Home page & Products page**

![image](https://github.com/sebastiansernaunosquare/e-commerce-project-ssv/assets/137529439/d99f5c53-6e29-4319-b7b9-008940e37026)

**Login & Sign Up pages**

![image](https://github.com/sebastiansernaunosquare/e-commerce-project-ssv/assets/137529439/6885a31c-8f25-4b5e-8ac2-3dfda1148d59)

**Cart overlay**

![image](https://github.com/sebastiansernaunosquare/e-commerce-project-ssv/assets/137529439/e38ed1f4-e8e6-48ed-b5cd-90868df46480)

**Product page**

![image](https://github.com/sebastiansernaunosquare/e-commerce-project-ssv/assets/137529439/6d2a2600-df69-4e87-90d4-d4462d583fa9)

**Purchase page**

![image](https://github.com/sebastiansernaunosquare/e-commerce-project-ssv/assets/137529439/d28534b5-8444-499d-bdc5-c75cae6fb68e)

**Admin product page**

![image](https://github.com/sebastiansernaunosquare/e-commerce-project-ssv/assets/137529439/8ef451c3-fa14-4d57-9f3f-dbf34d1ccb97)
