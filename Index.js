const cTable = require("console.table");
const inquirer = require("inquirer");
const mysql = require("mysql");
const viewFunctions = require("./viewFunctions");
const addFunctions = require("./addFunctions");
const updateFunctions = require("./updateFunctions");

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
module.exports = mainMenu = () => {
  joinedTable().then((response) => {
    inquirer
      .prompt([
        {
          type: "list",
          message: "What would you like to do?",
          name: "choice",
          choices: [
            "View Employees",
            "View Departments",
            "Update Employee's Manager",
            "Update Employee's Role",
            "Add Employee",
            "Add Department",
            "Add Role",
          ],
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
          case "Add Employee":
            addEmployee();
            break;
          case "Update Employee's Manager":
            updateEmployeeManager();
            break;
          case "Update Employee's Role":
            updateEmployeeRole();
            break;
          case "View Employees":
            viewEmployees();
            break;
          case "View Departments":
            viewDepartments();
            break;
          case "Exit":
            process.exit([]);
            break;

          default:
            break;
        }
      });
  });
};

module.exports = navMenu = () => {
  inquirer
    .prompt([
      {
        type: "list",
        choices: ["Main Menu", "Exit"],
        message: "What would you like to do next? \n",
        name: "choice",
      },
    ])
    .then((response) => {
      switch (response.choice) {
        case "Main Menu":
          mainMenu();
          break;
        case "Exit":
          process.exit([]);
          break;
        default:
          break;
      }
    });
};

mainMenu();
