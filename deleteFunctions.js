const { restoreDefaultPrompts } = require("inquirer");
const inquirer = require("inquirer");
const mysql = require("mysql");
connection = require("./index.js");
const viewFunctions = require("./viewFunctions");

module.exports = deleteEmployee = () => {
  joinedTable().then(() => {
    connection.query(`SELECT * FROM employee`, (err, employee) => {
      inquirer
        .prompt([
          {
            type: "list",
            choices() {
              const choicesArray = [];
              employee.forEach((element) => {
                choicesArray.push(`${element.first_name} ${element.last_name}`);
              });
              choicesArray.push("Cancel");
              return choicesArray;
            },
            message: "Which employee do you want to delete?",
            name: "employee",
          },
        ])
        .then((response) => {
          const employeeFirstName = response.employee.split(" ");
          let employee_id;
          employee.forEach((element) => {
            if (
              element.first_name === employeeFirstName[0] &&
              element.last_name === employeeFirstName[1]
            ) {
              employee_id = element.id;
            } else {
              mainMenu();
            }
          });
          connection.query(
            `DELETE FROM employee WHERE employee.id = ${employee_id}`
          );
          joinedTable().then(() => {
            console.log(
              `Employee ${response.employee} has been deleted from the database \n`
            );
            navMenu();
          });
        });
    });
  });
};
// Delete a Department from the db
module.exports = deleteDepartment = () => {
  listDepartments().then(() => {
    connection.query(`SELECT * FROM department`, (err, department) => {
      inquirer
        .prompt([
          {
            type: "list",
            choices() {
              const choicesArray = [];
              department.forEach((element) => {
                choicesArray.push(element.name);
              });
              choicesArray.push("Cancel");
              return choicesArray;
            },
            message: "Which department do you want to delete?",
            name: "department",
          },
        ])
        .then((response) => {
          const departmentName = response.department;
          let toBeDeleted;
          department.forEach((element) => {
            if (element.name === departmentName) {
              toBeDeleted = element.id;
            } else {
              mainMenu();
            }
          });
          connection.query(
            `DELETE FROM department WHERE department.id = ${toBeDeleted}`
          );
          listDepartments().then(() => {
            console.log(
              `Department "${departmentName}" has been deleted from the database \n`
            );
            navMenu();
          });
        });
    });
  });
};
