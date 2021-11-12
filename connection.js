const mysql = require("mysql2");

const db = mysql.createConnection(
    {
        host: 'localhost',
        //YOUR MYSQL USERNAME
        user: 'root',
        //your sql password
        password: 'Tw@tson100',
        database: 'election'
    });


module.exports = db;
    