const cTable = require("console.table");
const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
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

// Print employee to screen
// connection.query("SELECT * FROM employee", (err, result) => {
//   if (err) throw err;

//   console.table(result);
// });
// Print joined employee, with role and depeartments to screen.
const joinedTable = async () => {
  connection.query(
    `SELECT *
    FROM employee
    LEFT JOIN role
    ON employee.role_id = role.id
    LEFT JOIN department
    ON role.department_id = department.id`,
    (err, result) => {
      if (err) throw err;

      console.table(result);
      mainMenu();
    }
  );
};

//Run the inquirer prompt
const mainMenu = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: ["Add Department"],
      },
    ])
    .then((response) => {
      switch (response.choice) {
        case "Add Department":
          addDepartment();
          break;

        default:
          break;
      }
    });
};

// Add a department to the db
const addDepartment = () => {
  //TODO: listDepartments();
  inquirer
    .prompt([
      {
        type: "input",
        message: "Name the department you would like to add.",
        name: "newDepartment",
      },
    ])
    .then((response) => {
      newDept = response.newDepartment;
      connection.query(
        `INSERT INTO department (name)
        VALUES ("${newDept}");`,
        (err, result) => {
          if (err) throw err;
          console.log(`New department called "${newDept}" added successfully`);
          mainMenu();
        }
      );
    });
};
joinedTable();
