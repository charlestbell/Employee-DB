require("dotenv").config();
const cTable = require("console.table");
const inquirer = require("inquirer");
const mysql = require("mysql");
const figlet = require("figlet");
const viewFunctions = require("./viewFunctions");
const addFunctions = require("./addFunctions");
const updateFunctions = require("./updateFunctions");
const deleteFunctions = require("./deleteFunctions");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms)); //Copied from here: https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
}

module.exports = connection = mysql.createConnection({
  host: "localhost",

  // Your port, if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Be sure to update with your own MySQL password!
  password: process.env.SQL_PASSWORD,
  database: "employee_DB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
});

//Run the inquirer prompt
module.exports = mainMenu = async () => {
  figlet("Employee DB", function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
  });
  await sleep(400);
  joinedTable().then((response) => {
    inquirer
      .prompt([
        {
          type: "list",
          message: "What would you like to do?",
          name: "choice",
          choices: [
            "View Employees",
            "View Employees by Manager",
            "View Departments",
            "View Roles",
            "Update Employee's Manager",
            "Update Employee's Role",
            "Add Employee",
            "Add Department",
            "Add Role",
            "Delete Employee",
            "Delete Department",
            "Delete Role",
            "Exit",
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
            joinedTable().then(() => {
              navMenu();
            });
            break;
          case "View Departments":
            listDepartments().then(() => {
              navMenu();
            });
            break;
          case "View Roles":
            listRoles().then(() => {
              navMenu();
            });
            break;
          case "Delete Employee":
            deleteEmployee();
            break;
          case "Delete Department":
            deleteDepartment();
            break;
          case "Delete Role":
            deleteRole();
            break;
          case "View Employees by Manager":
            joinedTable(`managerTable.id DESC`).then(() => {
              navMenu();
            });
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

// Navigation Menu
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
