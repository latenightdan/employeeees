const inquirer = require('inquirer');
const Employee = require('./employee');
const db = require('../connection')
const tablee = require('console.table');
var employee = new Employee;


const fs = require('fs');
//this may not be installed. check when the time is right


class Prompter {
    constructor() {

    }
    manageStaff() {

        inquirer.prompt([{
            type: 'list',
            message: "what would you like to do?",
            name: 'pick',
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Show it all",
                "Update an employee manager",

            ]
        }])
            .then(({ pick }) => {
                switch (pick) {
                    case 'View all departments':
                        this.showDepartments();
                        break;
                    case 'View all roles':
                        this.showRoles();
                        break;
                    case 'View all employees':
                        this.showEmployeeStats();
                        break;
                    case 'Add a department':
                        this.addDepartment();
                        break;
                    case 'Add a role':
                        this.addRole();
                        break;
                    case 'Add an employee':
                        this.addEmployee();
                        break;
                    case 'Show it all':
                        this.showItAll();
                        break;
                    case 'Update an employee manager':
                        this.updateRole();
                        break;
                }
            })
    }
    showEmployeeStats = () => {
        let sql = `SELECT * FROM employees`
        db.query(sql, (err, rows) => {
            if (err) {
                console.log("NOT WORKING!");
                throw err;

            }
            console.log('===============================================================================================');
            console.table(rows);
            console.log("===============================================================================================");
            this.manageStaff();

        })
    }
    showDepartments = () => {
        let sql = `SELECT * FROM departments`
        db.query(sql, (err, rows) => {
            if (err) {
                console.log("NOT WORKING!");
                throw err;

            }
            console.log('===============================================================================================');
            console.table(rows);
            console.log("===============================================================================================");
            this.manageStaff();
           

        })
    }
    showRoles = () => {
        let sql = `SELECT roles.*, departments.department_name, departments.description AS department 
        FROM roles
        LEFT JOIN departments ON roles.departments_id = departments.id;`
        db.query(sql, (err, rows) => {
            if (err) {
                console.log("NOT WORKING!");
                throw err;

            }
            console.log('===============================================================================================');
            console.table(rows);
            console.log("===============================================================================================");
            this.manageStaff();
        })
    }

    addDepartment = () => {
        inquirer
            .prompt([{
                type: 'text',
                name: "name",
                message: "What would you call this department?"
            },
            // {
            //     type: 'text',
            //     name: 'id',
            //     message: 'What the id number?'
            // },
            {
                type: 'text',
                name: 'description',
                message: 'Describe it'
            }]).then(name => {

                let sql = `INSERT INTO departments(department_name, description)
            Values('${name.name}', '${name.description}');`
                db.query(sql, (err, rows) => {
                    if (err) {
                        console.log("NOT WORKING!");
                        throw err;
                    }
                    this.showDepartments();

                });
            });
    };

    addRole = () => {
        inquirer
            .prompt([{
                type: 'text',
                name: "title",
                message: "What role will you add?"
            },
            {
                type: 'text',
                name: 'salary',
                message: 'How much will this pay per year?'
            }

            ]).then(answers => {

                
                let sql = `SELECT * FROM departments`
                let arrayyyy = [];
                db.query(sql, (err, rows) => {
                    if (err) { throw err; }
                    
                    for (let i = 0; i < rows.length; i++) {
                        arrayyyy.push(rows[i].id)
                    }
                    console.table(rows);

                    inquirer
                        .prompt([{
                            type: 'list',
                            name: 'department',
                            message: 'What is the department id, based on this stuff?',
                            choices: arrayyyy
                        }]).then(({ department }) => {



                            let stuff = `INSERT INTO roles(title, salary, departments_id)
                        Values('${answers.title}', '${answers.salary}', '${department}');`
                            db.query(stuff, (err, rows) => {
                                if (err) {
                                    console.log("NOT WORKING!");
                                    throw err;
                                }
                                this.showRoles();

                            });
                        })

                })

            });
    };


    showEmployeesWRoles = () => {

        let sql = `SELECT employees.*, departments.department_name, departments.description
        FROM employees
        LEFT JOIN departments ON employees.departments_id = departments.id;`
        db.query(sql, (err, rows) => {
            if (err) {
                console.log("NOT WORKING!");
                throw err;

            }
            console.log('===============================================================================================');
            console.table(rows);
            console.log("===============================================================================================");
            this.manageStaff();
            // console.log(table);

        })

    }

    addEmployee = () => {
        inquirer
            .prompt([{
                type: 'text',
                name: "first",
                message: "What is your employee's first name?"
            },
            {
                type: 'text',
                name: "last",
                message: "What is your employee's last name?"
            },
            {
                type: 'text',
                name: 'manager',
                message: "What is the name of their manager???"
            }
            ]).then(answers => {
                //this array holds all of the answers for the final smackdown
                let answersArray = [];
                answersArray.push(answers.first, answers.last, answers.manager);

                let sql = `SELECT * FROM departments`
                let arrayyyy = [];
                db.query(sql, (err, rows) => {
                    if (err) { throw err; }
                    console.log('==========================================');
                    for (let i = 0; i < rows.length; i++) {
                        arrayyyy.push(rows[i].id)
                    }
                    //this shows the user the info for them to pick from
                    console.table(rows);

                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'department',
                                message: 'What is the department id, based on the table?',
                                choices: arrayyyy
                            }
                        ]).then(answers => {
                            answersArray.push(answers.department);
                            console.log(answersArray);
                            let sql = `SELECT * FROM roles`
                            let arrayyyyy = [];
                            db.query(sql, (err, rows) => {
                                if (err) { throw err; }
                                console.log('==========================================');
                                for (let i = 0; i < rows.length; i++) {
                                    arrayyyyy.push(rows[i].id)
                                }
                                console.table(rows);
                                inquirer
                                    .prompt([
                                        {
                                            type: 'list',
                                            name: 'role',
                                            message: 'What is the role id, based on the table above?',
                                            choices: arrayyyyy
                                        }
                                    ]).then(({ role }) => {
                                        let stuff = `INSERT INTO employees(first_name, last_name, manager, departments_id, role_id)
                        Values('${answersArray[0]}', '${answersArray[1]}','${answersArray[2]}', ${answersArray[3]}, ${role});`
                                        db.query(stuff, (err, rows) => {
                                            if (err) {
                                                console.log("NOT WORKING!");
                                                throw err;
                                            }
                                            console.log('BEHOLD YOUR NEW EMPLOYEE')
                                            this.showItAll();
                                        })
                                    });
                            })
                        })
                })
            })
    }

    updateRole = () => {
       
                

                let sql = `SELECT * FROM employees`
                let arrayyyy = [];
                let managers = [];
                db.query(sql, (err, rows) => {
                    if (err) { throw err; }
                    for (let i = 0; i < rows.length; i++) {
                        arrayyyy.push(rows[i].id)
                        managers.push(rows[i].manager);
                    }
                    console.table(rows);
                    inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'id',
                            message: 'Which worker id has a new keeper?',
                            choices: arrayyyy
                        },
                        {
                            type: 'list',
                            name: 'manager',
                            message: 'Who is their keeper?',
                            choices: managers
                        }
                    ]).then(answers =>{
                        let stuff = `UPDATE employees 
                                    SET manager ='${answers.manager}'
                                    WHERE id = ${answers.id};`
                                        db.query(stuff, (err, rows) => {
                                            if (err) {
                                                console.log("NOT WORKING!");
                                                throw err;
                                            }
                                            this.showItAll();
                                        })
                    })
                })
      
    }

    showItAll = () => {

        let sql = `SELECT employees.*, roles.title, roles.salary, departments.department_name, departments.description 
        FROM employees
        LEFT JOIN departments ON employees.departments_id = departments.id
        LEFT JOIN roles ON employees.role_id = roles.id;`
        db.query(sql, (err, rows) => {
            if (err) {
                console.log("NOT WORKING!");
                throw err;

            }
            console.log('===============================================================================================');
            console.table(rows);
            console.log("===============================================================================================");
            this.manageStaff();


        })
    }


}




module.exports = Prompter;