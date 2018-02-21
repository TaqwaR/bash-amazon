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
  console.log("Loading Magical Products 🔍 🔍 🔍 \n");

  connection.query("SELECT * FROM inventory", function(error, response) {
    if (error) throw error;

    for (var i = 0; i < 11; i++) {
      console.log("⚡Product ID: " + response[i].item_id)
      console.log("⚡Product Name: " + response[i].product_name);
      console.log("⚡Department: " + response[i].department_name);
      console.log("⚡Price: $" + response[i].price);
      console.log("🔮 🔮 🔮 🔮 🔮 🔮 🔮 🔮 🔮 🔮 🔮 🔮 🔮 🔮 🔮 🔮 🔮 🔮");
      console.log("             ");
    }
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

          inquirer.prompt({
            name: "howMany",
            type: "input",
            message: "How many would you like to buy?"
          }).then(function(answer) {
              let userQuantity = parseInt(answer.howMany);
              console.log("Desired quantity: " + userQuantity);

              function checkStock() {
                connection.query(
                  "SELECT * FROM inventory WHERE ?",
                  {
                    item_id: userRequest
                  },

                  function(error, response) {
                  if (error) throw error;
                  console.log("We have Product " + userRequest);

                  if (userQuantity > response[0].stock_quantity) {
                    console.log("Insufficient quantity!", " We have " + response[0].stock_quantity + " in stock");
                    //console.log(response[0].stock_quantity);
                  }

                  else {
                    console.log("Sufficient quantity!", " We have " + response[0].stock_quantity + " in stock");
                    //console.log(response[0].stock_quantity);
                    let responseInt = parseInt(response);
                    //updateInventory(responseInt, userQuantity, userRequest);
                  }

                })

              }

              checkStock()
          })
        }
      })
}

function updateInventory(response, userQuantity, userRequest) {
  console.log("updating inventory and calculating your total...");
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
    }
  )
}
