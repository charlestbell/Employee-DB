INSERT INTO department (name)
VALUES ("development"),("design"),("finance"),("sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Dev manager", 80000, 1),("developer", 70000, 1),("designer", 60000, 2),("Design manager", 80000, 2),("Intern", 30000, 2),("Controller", 90000, 3),("bookeeper", 60000, 3), ("accountant", 70000, 3), ("Sales Manager", 80000, 4), ("salesperson", 70000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Victor", "Stonecipher", 1, null),("Jeremy","Alexander", 2, 2),("Marianna", "Andrey", 4, null), ("Ruslan", "Roman", 5, 3),("Elisa", "Braden", 6, null), ("Branko", "Faraji", 7, 5),("Adriana", "Emili", 8, 5), ("Sameer", "Gerben", 9, null),("Yelena", "Robrecht", 10, 9), ("Aracelis", "Shiva", 2, 2),("Marja", "Arif", 3, 3), ("Kepheus", "Iovianus", 7, null);

USE employee_DB;

SELECT
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
	ORDER BY "Full Name"