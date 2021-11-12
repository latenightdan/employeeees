const Staff = require('./staff');
const db = require('../connection');

class Employee extends Staff {
    constructor(name, email, id, role) {
        super(name);
        this.email = email;
        this.id = id;
        this.role = role;
    }
    showStats(){
        const sql = `SELECT * FROM employees`
        db.query(sql, (err, rows) =>{
            if(err) {
                console.log("NOT WORKING!");
            }
            console.log(rows);

        })
        console.log("object working");
        return sql;
    }
}

module.exports = Employee;