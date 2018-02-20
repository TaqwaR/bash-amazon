const dotenv = require("dotenv").config();
const mysql = require("mysql");
const inquirer = require("inquirer");

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
  // prompt();
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
      promptOne();
  })

};

function promptOne() {
    inquirer
      .prompt({
          name: "productID",
          type: "input",
          message: "What is the ID of the product that you would like to buy?"
        })
        .then(function(answer) {
          console.log(answer);
          promptTwo()
      })
};

function promptTwo() {
  inquirer
  .prompt({
    name: "howMany",
    type: "input",
    message: "How many would you like to buy?"
  })
  .then(function(answer) {
    console.log(answer);
  })
};
