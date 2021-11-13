-- DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;



CREATE TABLE departments (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT
);

CREATE TABLE employees (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  departments_id INTEGER,
--   industry_connected BOOLEAN NOT NULL,
  CONSTRAINT fk_department FOREIGN KEY (departments_id) REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE roles (
 id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  salary DECIMAL(9,2),
  departments_id INTEGER,
  CONSTRAINT fk_departmentsid FOREIGN KEY (departments_id) REFERENCES departments(id) ON DELETE SET NULL
);

-- CREATE TABLE votes (
--   id INTEGER AUTO_INCREMENT PRIMARY KEY,
--   voter_id INTEGER NOT NULL,
--   candidate_id INTEGER NOT NULL,
--   created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--   CONSTRAINT uc_voter UNIQUE (voter_id),
--   CONSTRAINT fk_voter FOREIGN KEY (voter_id) REFERENCES voters(id) ON DELETE CASCADE,
--   CONSTRAINT fk_candidate FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
-- );









-- CREATE TABLE departments(
-- id INTEGER AUTO_INCREMENT PRIMARY KEY,
-- name VARCHAR(50) NOT NULL,
-- );

-- CREATE TABLE roles (
--   id INTEGER PRIMARY KEY,
--   title VARCHAR(50) NOT NULL,
--   salary DECIMAL(9,2),

-- );

-- CREATE TABLE employees(
--    id INTEGER AUTO_INCREMENT PRIMARY KEY,
--    first_name VARCHAR(30) NOT NULL,
--    last_name VARCHAR(30) NOT NULL,
--    role_id INTEGER,
--    CONSTRAINT fk_roleId FOREIGN KEY (role_id) REFERENCES roles(id) 
-- );