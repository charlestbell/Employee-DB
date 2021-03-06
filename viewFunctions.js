const mysql = require("mysql");
connection = require("./index.js");

// Print joined employee, with role and depeartments to screen.
module.exports = joinedTable = (sortBy) => {
  return new Promise((resolve) => {
    let orderBy;
    if (sortBy != null) {
      orderBy = sortBy;
    } else {
      orderBy = "'Full Name'";
    }
    console.log("\n All Employees: \n");
    connection.query(
      `SELECT
      employee.id AS ID,
      CONCAT (employee.first_name, ' ', employee.last_name) "Full Name",
      role.title AS Role,
      department.name AS Department,
      CONCAT (managerTable.first_name, ' ', managerTable.last_name) "Manager Name",
      role.salary AS Salary
  FROM
      employee 
  LEFT JOIN
      role ON
      employee.role_id = role.id
  LEFT JOIN
      department ON
      department.id = role.department_id
  LEFT JOIN employee AS managerTable ON
      employee.manager_id = managerTable.id
      ORDER BY ${orderBy};`,
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
    console.log("\n All Departments: \n");
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
    console.log("\n All Roles: \n");
    connection.query(`SELECT * FROM role`, (err, result) => {
      if (err) throw err;
      console.table(result);
      resolve();
    });
  });
};
