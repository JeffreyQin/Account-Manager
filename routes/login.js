const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const connection = require('../connection.js');
const config = require('../config.json');
const table = config.mysql.table;
const validator = require('../validators/loginValidate.js');

router.post('/username', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    validator.checkCredentials('username', username, password, function(notFound) {
        if (notFound) {
            res.send({ message: "Invalid credentials." })
        } else {
            connection().query(`
                SELECT *
                FROM ${table}
                WHERE username = '${username}';
            `, (err, results) => {
                if (err) {
                    throw err;
                } else {
                    res.send({ 
                        message: "Login success.",
                        username: results[0].username
                    });
                }
            })
        }
    })
});

router.post('/email', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    validator.checkCredentials('email', email, password, function(notFound) {
        if (notFound) {
            res.send({ message: "Invalid credentials." })
        } else {
            connection().query(`
                SELECT *
                FROM ${table}
                WHERE email = '${email}';
            `, (err, results) => {
                if (err) {
                    throw err;
                } else {
                    res.send({
                        message: 'Login success.',
                        username: results[0].username
                    })
                }
            })
        }
    })
});

module.exports = router;