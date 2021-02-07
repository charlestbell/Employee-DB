INSERT INTO department (name)
VALUES ("development"),("design"),("finance"),("sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Dev manager", 80000, 1),("developer", 70000, 1),("designer", 60000, 2),("Design manager", 80000, 2),("Intern", 30000, 2),("Controller", 90000, 3),("bookeeper", 60000, 3), ("accountant", 70000, 3), ("Sales Manager", 80000, 4), ("salesperson", 70000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Victor", "Stonecipher", 1),("Jeremy","Alexander", 2),("Marianna", "Andrey", 4), ("Ruslan", "Roman", 5),("Elisa", "Braden", 6), ("Branko", "Faraji", 7),("Adriana", "Emili", 8), ("Sameer", "Gerben", 9),("Yelena", "Robrecht", 10), ("Aracelis", "Shiva", 2),("Marja", "Arif", 3), ("Kepheus", "Iovianus", 7);

USE employee_DB;

SELECT
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
      department.id = role.department_id;