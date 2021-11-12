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
                "Update an employee role"
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
                }
            })
    }
    showEmployeeStats = () => {
        let sql = `SELECT * FROM employee`
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
        let sql = `SELECT * FROM department`
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
        let sql = `SELECT * FROM role`
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

                let sql = `INSERT INTO department(id, name)
            Values(${name.id}, '${name.name}');`
                db.query(sql, (err, rows) => {
                    if (err) {
                        console.log("NOT WORKING!");
                        throw err;
                    }
                    this.showDepartments();
                    this.manageStaff();
                })
            })
    }
}






module.exports = Prompter;