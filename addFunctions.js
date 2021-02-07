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
              `New department called "${newDept}" added successfully`
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
              results.forEach(({ name }) => {
                choicesArray.push(name);
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

              console.log(
                `New department called "${title}" added successfully`
              );
              listRoles();
              mainMenu();
            }
          );
        });
    });
  });
};
