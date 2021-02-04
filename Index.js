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
  }
);
