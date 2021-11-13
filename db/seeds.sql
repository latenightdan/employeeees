
INSERT INTO departments(name, description)
VALUES("THE SLIMERS", "Guys who manage all the slime");

INSERT INTO roles(title, salary, departments_id)
VALUES("slimer", 90000, 1);

INSERT INTO employees(first_name, last_name, departments_id)
VALUES("slime", "guy", 1);
