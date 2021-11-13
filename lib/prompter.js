const inquirer = require('inquirer');
const Employee = require('./employee');
const db = require('../connection')
// const tablee = require('console.table');
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
                "Update an employee role",

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
                        this.addDepartment();
                        break;
                    case 'Show it all':
                        this.showAll();
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
            console.log('==========================================');
            console.table(rows);
            console.log("==========================================");
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
            console.log('==========================================');
            console.table(rows);
            console.log("==========================================");
            this.manageStaff();
            // console.log(table);

        })
    }
    showRoles = () => {
        let sql = `SELECT * FROM roles`
        db.query(sql, (err, rows) => {
            if (err) {
                console.log("NOT WORKING!");
                throw err;

            }
            console.log('==========================================');
            console.table(rows);
            console.log("==========================================");
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
            {
                type: 'text',
                name: 'id',
                message: 'What the id number?'
            }]).then(name => {

                let sql = `INSERT INTO departments(id, name)
            Values(${name.id}, '${name.name}');`
                db.query(sql, (err, rows) => {
                    if (err) {
                        console.log("NOT WORKING!");
                        throw err;
                    }
                    this.showDepartments();
                    this.manageStaff();
                });
            });
    };
    addDepartment = () => {
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
                console.log(answers);
                let sql = `SELECT * FROM roles`
                let arrayyyy = [];
                db.query(sql, (err, rows) => {
                    if (err) { throw err; }
                    console.log('==========================================');
                    for (let i = 0; i < rows.length; i++) {
                       
                        arrayyyy.push(rows[i].id)
                        arrayyyy.push(rows[i].title)
                    }
                    console.table(arrayyyy);
                    let justNums = arrayyyy.filter((element, index) => {
                        return index % 2 === 0;
                    })
                    
                    inquirer
                    .prompt([{
                        type: 'list',
                        name: 'department',
                        message: 'What is the role id, based on this shit?',
                        choices: justNums
                    }]).then(({ department }) => {

                        console.log(department)
                        console.log(answers)
                        
                    })

                })


                //     let sql = `INSERT INTO roles(title, salary, departments_id)
                // Values('${answers.title}', '${answers.salary}', '${answers.department}');`
                //     db.query(sql, (err, rows) => {
                //         if (err) {
                //             console.log("NOT WORKING!");
                //             throw err;
                //         }
                //         this.showEmployeesWRoles();

                //     });
            });
    };


    showEmployeesWRoles = () => {

        let sql = `SELECT employees.*, departments.name, departments.description
        FROM employees
        LEFT JOIN departments ON employees.departments_id = departments.id;`
        db.query(sql, (err, rows) => {
            if (err) {
                console.log("NOT WORKING!");
                throw err;

            }
            console.log('==========================================');
            console.table(rows);
            console.log("==========================================");
            this.manageStaff();
            // console.log(table);

        })
    }

}






module.exports = Prompter;