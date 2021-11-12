const Staff = require('./staff');

class Employee extends Staff {
    constructor(name, email, id, role) {
        super(name);
        this.email = email;
        this.id = id;
        this.role = role;
    }
    showStats(){
        const sql = `SELECT * FROM employees`
        console.log("object working");
        return sql;
    }
}

module.exports = Employee;