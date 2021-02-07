const { restoreDefaultPrompts } = require("inquirer");
const inquirer = require("inquirer");
const mysql = require("mysql");
connection = require("./index.js");
const viewFunctions = require("./viewFunctions");

// Update the manager id of one employee in the db
module.exports = updateEmployeeManager = () => {
  let employee;
  connection.query(`SELECT * FROM employee;`, (err, results) => {
    employee = results;
    inquirer
      .prompt([
        {
          type: "list",
          choices() {
            const choicesArray = [];
            employee.forEach((element) => {
              choicesArray.push(`${element.first_name} ${element.last_name}`);
            });
            return choicesArray;
          },
          message: "Which employee's manager wdo you want to update?",
          name: "employee",
        },
        {
          type: "list",
          choices() {
            const choicesArray = [];
            employee.forEach((element) => {
              choicesArray.push(`${element.first_name} ${element.last_name}`);
            });
            return choicesArray;
          },
          message:
            "Which employee do you want to set as manager for the selected employee?",
          name: "manager",
        },
      ])
      .then((response) => {
        const managerFistName = response.manager.split(" ");
        const employeeFistName = response.employee.split(" ");
        const first_name = response.first_name;
        const last_name = response.last_name;
        let employee_id;
        let newManager_id;
        // Find the id number of the chosen employee and store it in employee_id
        employee.forEach((element) => {
          if (
            element.first_name === employeeFistName[0] &&
            element.last_name === employeeFistName[1]
          ) {
            employee_id = element.id;
          }
        });
        employee.forEach((element) => {
          if (
            element.first_name === managerFistName[0] &&
            element.last_name === managerFistName[1]
          ) {
            newManager_id = element.id;
          }
        });
        connection.query(
          `UPDATE employee SET ? WHERE ?`,
          [{ manager_id: newManager_id }, { id: employee_id }],

          (err, result) => {
            if (err) throw err;
            console.log(
              `Employee ${response.employee}'s manager is now ${response.manager}`
            );
            mainMenu();
          }
        );
      });
  });
};
