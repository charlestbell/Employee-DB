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
          type: "input",
          message: "What Department ID is associated with this Role?",
          name: "departmentID",
        },
      ])
      .then((response) => {
        title = response.title;
        salary = response.salary;
        departmentID = response.departmentID;
        //   TODO Make first letter always uppercase
        connection.query(
          `INSERT INTO role (title, salary, department_id)
          VALUES ("${title}", ${salary}, ${departmentID});`,
          (err, result) => {
            if (err) throw err;
            console.log(`New department called "${Title}" added successfully`);

            listRoles();
            mainMenu();
          }
        );
      });
  });
};
