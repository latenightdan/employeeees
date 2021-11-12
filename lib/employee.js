const Staff = require('./staff');
const db = require('../connection');
const Prompter = require ('./prompter');



class Employee extends Staff {
    constructor(name, email, id, role) {
        super(name);
        this.email = email;
        this.id = id;
        this.role = role;
    }
    // showStats(){
    //     const sql = `SELECT * FROM employees`
    //     db.query(sql, (err, rows) =>{
    //         if(err) {
    //             console.log("NOT WORKING!");
    //             throw err;
               
    //         }
    //         let table = console.table(rows);
    //         console.log(table);
    //         prompter.manageStaff();
    //     })
    // }

}

module.exports = Employee;