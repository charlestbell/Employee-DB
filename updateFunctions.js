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
          message: "Which employee's manager who you want to update?",
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
        const managerFirstName = response.manager.split(" ");
        const employeeFirstName = response.employee.split(" ");
        let employee_id;
        let newManager_id;
        // Find the id number of the chosen employee and store it in employee_id
        employee.forEach((element) => {
          if (
            element.first_name === employeeFirstName[0] &&
            element.last_name === employeeFirstName[1]
          ) {
            employee_id = element.id;
          }
        });
        employee.forEach((element) => {
          if (
            element.first_name === managerFirstName[0] &&
            element.last_name === managerFirstName[1]
          ) {
            newManager_id = element.id;
          }
        });
        connection.query(
          `UPDATE employee SET ? WHERE ?`,
          [{ manager_id: newManager_id }, { id: employee_id }],

          (err, result) => {
            if (err) throw err;
            joinedTable().then(() => {
              console.log(
                `Employee ${response.employee}'s manager is now ${response.manager} \n`
              );
              navMenu();
            });
          }
        );
      });
  });
};
// Update the role id of one employee in the db
module.exports = updateEmployeeRole = () => {
  let employee;
  let role;
  connection.query(
    `SELECT *
  FROM employee;`,
    (err, results) => {
      employee = results;
      connection.query(
        `SELECT *
      FROM role;`,
        (err, results) => {
          role = results;
          inquirer
            .prompt([
              {
                type: "list",
                choices() {
                  const choicesArray = [];
                  employee.forEach((element) => {
                    choicesArray.push(
                      `${element.first_name} ${element.last_name}`
                    );
                  });
                  return choicesArray;
                },
                message: "Which employee's role who you want to update?",
                name: "employee",
              },
              {
                type: "list",
                choices() {
                  const choicesArray = [];
                  role.forEach((element) => {
                    choicesArray.push(element.title);
                  });
                  return choicesArray;
                },
                message: "Which role do you want to set for this employee?",
                name: "role",
              },
            ])
            .then((response) => {
              const employeeFirstName = response.employee.split(" ");
              let employee_id;
              let newRole_id;
              // Find the id number of the chosen employee and store it in employee_id
              employee.forEach((element) => {
                if (
                  element.first_name === employeeFirstName[0] &&
                  element.last_name === employeeFirstName[1]
                ) {
                  employee_id = element.id;
                }
              });
              employee.forEach((element) => {
                if (element.title === element.role) {
                  role.forEach((element) => {
                    if (response.role === element.title)
                      newRole_id = element.id;
                  });
                }
              });
              connection.query(
                `UPDATE employee SET ? WHERE ?`,
                [{ role_id: newRole_id }, { id: employee_id }],

                (err, result) => {
                  if (err) throw err;
                  joinedTable().then(() => {
                    console.log(
                      `Employee ${response.employee}'s role is now ${response.role} \n`
                    );
                    navMenu();
                  });
                }
              );
            });
        }
      );
    }
  );
};
