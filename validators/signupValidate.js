const connection = require('../connection.js');
const config = require('../config.json');
const table = config.mysql.table;

exports.checkEmail = (email, callback) => {
    connection().query(`
        SELECT * FROM ${table} 
        WHERE email = '${email}';
    `, (err, results) => {
        if (err) throw err;
        return callback(results.length);
    });
}

exports.checkUsername = (username, callback) => {
    connection().query(`
        SELECT * FROM ${table}
        WHERE username = '${username}';
    `, (err, results) => {
        if (err) throw err;
        return callback(results.length);
    });
}

exports.validPassword = (password) => {
    return true;
}
