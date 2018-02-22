# Bamazon (Bash-Amazon)
 This application is an Amazon-like storefront with the MySQL. The CLI app will take in orders from customers and deplete stock from the store's MySQL-strored inventory.



# Screenshots





# Built with

- Node.js
- JavaScript
- MySQL
- Inquirer
- Console.table




# Features

- Dynamic database that updates inventory levels based on customers purchases.
- Displays relevant product data to customer - product name, price, and department, as well as the product id.
- Prompts customers, and stores infomration about item(s) that they would like to buy, and displays a total cost.




# Key Functions

#### `accio()` 

Initial function that displays items available for custumers to purchase.

#### `prompts()`

Prompts to gather information about items that the costumer wnats to purchase. This function requires the Inquirer npm package

#### `checkStock()`

Compares the customer's request against the available stock quantities, and let's the costumer know if their request exceeds what is available in stock. 

#### `updateInventory()`

Once the the custumer decides on a sufficient quantity, this calculates the remaining stock quantity and updates the inventory database to reflect the recent changes.



# Installation

### Node.js

Bamazon requires **Node.js**. To install, run `npm install` in your terminal.

This application's interface is accessed through your computer's terminal. Clone this repository, and access all of the neccessary software packages. Once complete, open your terminal and navigate to the cloned repository.

### MySQL

Bamazon accesses products and inventory that are stored in a MySQL database. To make sure your MySQL server is running while using the program, run `mysql.server start` in your terminal.

You can create your own database of items, as described [here](https://dev.mysql.com/doc/refman/5.7/en/database-use.html). Or you can use the provided .sql file included in the repository.

Downlading a program like [SequelPro](https://www.sequelpro.com/) or [Workbench](https://dev.mysql.com/downloads/workbench/) is optional. However, I would highly recommend it. They allow you to update and create items and databases more efficiently, and provide an easy to use GUI. 



# How to use?

Assuming that you have installed all the neccessary packages and dependencies as listed above under '*Installation*', you will now run this command in your terminal to begin the program:

```javascript
node bamazonCustomer.js 
```



After running the above command, items for purchase will appear in a list - including product id, product name, product department, and product cost - followed by a prompt that asks which item you would like to purchase. 

```javascript
? What is the ID of the product that you would like to buy?  
```



You will then recieve another prompt asking about the quantity that you would like to purchase.

```javascript
? How many would you like to buy? 
```

One you answer both prompts, the program will check the inventory to see if a sufficient quantitity is available. If there is enough of the product available, if will calculate your total cost. 

If there is not enough of the product available to meet your request, the program will let you know, and reload the product list and initial prompts again - so that you may select an item and  another quantity. 