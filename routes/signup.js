const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const connection = require('../connection.js');
const config = require('../config.json');
const table = config.mysql.table;

router.post('/', (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    checkEmail(email, function(emailResult) {
        if (emailResult > 0) {
            res.send({ message: "Email already exists." });
        } else {
            checkUsername(username, function(usernameResult) {
                if (usernameResult > 0) {
                    res.send({ message: "Username unavailable." });
                } else {
                    if (checkPassword(password)) {
                        res.send({ message: "Password invalid." });
                    } else {
                        connection().query(`
                            INSERT INTO ${table}
                            VALUES (NULL, '${email}', '${username}', '${password}');
                        `, (err, results) => {
                            if (err) throw err;
                            console.log(results);
                            res.send({ message: "Account registered!" });
                        })
                    }
                }
            });
        }
    });
});

module.exports = router;

function checkEmail(email, callback) {
    connection().query(`
        SELECT * FROM ${table} 
        WHERE email = '${email}';
    `, (err, results) => {
        if (err) throw err;
        return callback(results.length);
    });
}

function checkUsername(username, callback) {
    connection().query(`
        SELECT * FROM ${table}
        WHERE username = '${username}';
    `, (err, results) => {
        if (err) throw err;
        return callback(results.length);
    });
}

function checkPassword(password) {
    return false;
}