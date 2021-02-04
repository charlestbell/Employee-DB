INSERT INTO department (name)
VALUES ("development"),("design"),("finance"),("sales");

INSERT INTO role (title, salary, department_id)
VALUES ("manager", 80000, 1),("developer", 70000, 1),("designer", 60000, 2),("manager", 80000, 2),("Intern", 30000, 2),("manager", 90000, 3),("bookeeper", 60000, 3), ("accountant", 70000, 3), ("manager", 80000, 4), ("salesperson", 70000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Victor", "Stonecipher", 1),("Jeremy","Alexander", 2),("Marianna", "Andrey", 4), ("Ruslan", "Roman", 5),("Elisa", "Braden", 6), ("Branko", "Faraji", 7),("Adriana", "Emili", 8), ("Sameer", "Gerben", 9),("Yelena", "Robrecht", 10), ("Aracelis", "Shiva", 2),("Marja", "Arif", 3), ("Kepheus", "Iovianus", 7);

SELECT *
FROM department, role, employee