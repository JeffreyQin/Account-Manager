const mysql = require('mysql');
const config = require('./config.json');

function connectSQL() {
    const connection = mysql.createConnection({
        host: config.mysql.host,
        user: config.mysql.user,
        password: config.mysql.password,
        database: config.mysql.database,
    });

    connection.connect((err) => {
        if (err) {
            console.log("Error connecting to MySQL");
            throw err;
        } else {
            console.log("Connected to MySQL");
        }
    })
    
    return connection;
}

module.exports = connectSQL;