const { restoreDefaultPrompts } = require("inquirer");
const inquirer = require("inquirer");
const mysql = require("mysql");
connection = require("./index.js");
const viewFunctions = require("./viewFunctions");

// Add a department to the db
module.exports = addDepartment = () => {
  listDepartments().then((response) => {
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
        //   TODO Make first letter always uppercase
        connection.query(
          `INSERT INTO department (name)
          VALUES ("${newDept}");`,
          (err, result) => {
            if (err) throw err;
            console.log(
              `New department called "${newDept}" added successfully \n`
            );

            listDepartments();
            mainMenu();
          }
        );
      });
  });
};
// Add a role to the db
module.exports = addRole = () => {
  connection.query(`SELECT * FROM department;`, (err, results) => {
    listRoles().then((response) => {
      inquirer
        .prompt([
          {
            type: "input",
            message: "Name the role you would like to add.",
            name: "title",
          },
          {
            type: "input",
            message: "What is this role's Salary?",
            name: "salary",
          },
          {
            type: "list",
            choices() {
              const choicesArray = [];
              results.forEach((element) => {
                choicesArray.push(element.name);
              });
              return choicesArray;
            },
            message: "What Department is associated with this Role?",
            name: "departmentName",
          },
        ])
        .then((response) => {
          title = response.title;
          salary = response.salary;
          let departmentID;
          results.forEach((element) => {
            if (element.name === response.departmentName) {
              departmentID = element.id;
            }
          });
          //   TODO Make first letter always uppercase
          connection.query(
            `INSERT INTO role (title, salary, department_id)
                VALUES ("${title}", ${salary}, ${departmentID});`,
            (err, result) => {
              if (err) throw err;

              console.log(`New role called "${title}" added successfully \n`);
              listRoles();
              mainMenu();
            }
          );
        });
    });
  });
};

// Add an employee to the db
module.exports = addEmployee = () => {
  let employee;
  connection.query(`SELECT * FROM employee`, (err, results) => {
    employee = results;
  });

  connection.query(`SELECT * FROM role`, (err, role) => {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the employee's first name?",
          name: "first_name",
        },
        {
          type: "input",
          message: "What is the employee's last name",
          name: "last_name",
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
          message: "Choose which role this employee has",
          name: "roleName",
        },
        {
          type: "list",
          choices() {
            const choicesArray = [];
            employee.forEach((element) => {
              choicesArray.push(`${element.first_name} ${element.last_name}\n`);
            });
            return choicesArray;
          },
          message: "Who is the employee's manager?",
          name: "manager",
        },
      ])
      .then((response) => {
        const managerFistName = response.manager.split(" ");
        const first_name = response.first_name;
        const last_name = response.last_name;
        let role_id;
        let manager_id;
        // Find the id number of the chosen role and store it in role_id
        role.forEach((element) => {
          if (element.title === response.roleName) {
            role_id = element.id;
          }
          // Find the id number of the chosen manager and store it in manager_id
        });
        employee.forEach((element) => {
          if (
            element.first_name === managerFistName[0] &&
            element.last_name === managerFistName[1]
          ) {
            manager_id = element.id;
          }
        });
        //   TODO Make first letter always uppercase
        // Save the new employee to the db
        connection.query(
          `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES ("${first_name}", "${last_name}", ${role_id}, ${manager_id});`,
          (err, result) => {
            if (err) throw err;
            console.log(
              `New employee ${first_name} ${last_name} added successfully\n`
            );
            mainMenu();
          }
        );
      });
  });
};
