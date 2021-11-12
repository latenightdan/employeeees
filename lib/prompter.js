const inquirer = require('inquirer');
const Employee = require('./employee');
const db = require('../connection')

var employee = new Employee;


const fs = require('fs');
//this may not be installed. check when the time is right


class Prompter {
    constructor() {

    }
    start() {

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
                "Update and employee"
            ]
        }])
        .then(({ pick }) => {
            switch(pick){
                case 'View all employees':
                
                employee.showStats();
                break;
            }
        })
    }
}






module.exports = Prompter;