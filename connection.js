const mysql = require("mysql2");

require('dotenv').config();

const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        //YOUR MYSQL USERNAME
        user: process.env.DB_USER,
        //your sql password
        password: process.env.DB_PASS,
        database: 'staff'
    });


module.exports = db;
    