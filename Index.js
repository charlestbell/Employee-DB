const cTable = require("console.table");
const inquirer = require("inquirer");
const mysql = require("mysql");
const viewFunctions = require("./viewFunctions");
const addFunctions = require("./addFunctions");

module.exports = connection = mysql.createConnection({
  host: "localhost",

  // Your port, if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Be sure to update with your own MySQL password!
  password: "222rangerGreen",
  database: "employee_DB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
});

//Run the inquirer prompt
const mainMenu = () => {
  joinedTable().then((response) => {
    inquirer
      .prompt([
        {
          type: "list",
          message: "What would you like to do?",
          name: "choice",
          choices: ["Add Department", "Add Role"],
        },
      ])
      .then((response) => {
        switch (response.choice) {
          case "Add Department":
            addDepartment();
            break;
          case "Add Role":
            addRole();
            break;

          default:
            break;
        }
      });
  });
};

mainMenu();
