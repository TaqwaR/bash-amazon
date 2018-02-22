const dotenv = require("dotenv").config();
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "",
  database: "itsmagic_db"
});



connection.connect(function(error) {
  if (error) throw error;
  console.log("Connected as ID " + connection.threadId + "\n");
  accio();
});


function accio() {
  console.log("🔍 🔍 🔍 Loading Magical Products 🔍 🔍 🔍 \n");

  connection.query("SELECT item_id, product_name, department_name, price FROM inventory", function(error, response) {
    if (error) throw error;

    console.table(response);
    prompts();
  })

};


function prompts() {
  inquirer.prompt({
        name: "productID",
        type: "input",
        message: "What is the ID of the product that you would like to buy?"
      }).then(function(answer) {
        if (answer.productID) {
          let userRequest = parseInt(answer.productID);
          console.log("Customer Request: Product " + userRequest);
          console.log("                    ");

          inquirer.prompt({
            name: "howMany",
            type: "input",
            message: "How many would you like to buy?"
          }).then(function(answer) {
              let userQuantity = parseInt(answer.howMany);
              console.log("Desired quantity: " + userQuantity);
              console.log("                    ");

              function checkStock() {
                connection.query(
                  "SELECT * FROM inventory WHERE ?",
                  {
                    item_id: userRequest
                  },

                  function(error, response) {
                  if (error) throw error;

                  if (userQuantity > response[0].stock_quantity) {
                    console.log("Whoops!", " We don't have enough " + response[0].product_name + "s in stock. :-( Try again.");
                    console.log("                    ");
                    prompts()
                  }

                  else {
                    console.log("Lucky you!", " We have " + response[0].product_name + "s in stock.");
                    console.log("                    ");
                    let stockAvail = response[0].stock_quantity;
                    let productPrice = response[0].price;
                    let purchaseTotal = productPrice * userQuantity;
                    updateInventory(stockAvail, userQuantity, userRequest);
                    totalCost(purchaseTotal, userQuantity);
                    connection.end();
                  }

                })

              }

              checkStock()
          })
        }
      })
}

function updateInventory(response, userQuantity, userRequest) {
  console.log("🧠 🧠 🧠 Updating inventory and calculating your total 🧠 🧠 🧠");
  console.log("                    ");
  connection.query(
    "UPDATE inventory SET ? WHERE ?",
    [
      {
        stock_quantity: response - userQuantity
      },
      {
        item_id: userRequest
      }
    ],
    function(error, res) {
      if (error) throw error;
      console.log(res.affectedRows + " inventory updated.");
      console.log("                    ");
    }
  )
}


function totalCost(purchaseTotal) {
  console.log("Your total is: $" + purchaseTotal);
}
