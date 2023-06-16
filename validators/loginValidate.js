const connection = require('../connection.js');
const config = require('../config.json');
const table = config.mysql.table;

exports.checkCredentials = (option, user, pw, callback) => {
    connection().query(`
        SELECT * FROM ${table}
        WHERE ${option} = '${user}' AND password = '${pw}';
    `, (err, results) => {
        if (err) throw err;
        return callback(results.length == 0);
    });
}