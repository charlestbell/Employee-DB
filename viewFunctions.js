const mysql = require("mysql");
connection = require("./index.js");

// Print joined employee, with role and depeartments to screen.
module.exports = joinedTable = () => {
  return new Promise((resolve) => {
    connection.query(
      `SELECT
      employee.id,
      employee.first_name,
      employee.last_name,
      role.title,
      department.name AS department,
      role.salary
  FROM
      employee
  LEFT JOIN
      role ON
      employee.role_id = role.id
  LEFT JOIN
      department ON
      department.id = role.department_id;`,
      (err, result) => {
        if (err) throw err;
        console.table(result);
        resolve();
      }
    );
  });
};

//Print Table of all Departments to screen
module.exports = listDepartments = () => {
  return new Promise((resolve) => {
    console.log("List of Departments:");
    connection.query(`SELECT * FROM department`, (err, result) => {
      if (err) throw err;
      console.table(result);
      resolve();
    });
  });
};
//Print Table of all Roles to screen
module.exports = listRoles = () => {
  return new Promise((resolve) => {
    console.log("List of Roles:");
    connection.query(`SELECT * FROM role`, (err, result) => {
      if (err) throw err;
      console.table(result);
      resolve();
    });
  });
};
