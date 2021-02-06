const mysql = require("mysql");
const cTable = require("console.table");

module.exports = listDepartments = () => {
  connection.query(`SELECT * FROM department`, (err, result) => {
    if (err) throw err;
    console.table(result);
  });
};
