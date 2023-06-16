const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const router = express.Router();
require('dotenv').config();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET_KEY,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false
}));

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
                    const profile = {
                        email: results[0].email,
                        username: results[0].username,
                        password: results[0].password
                    };
                    req.session.profile = profile;
                    res.redirect('127.0.0.1:5500/index.html');
                    //res.send({ message: "Login success."})
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
                    const profile = {
                        email: results[0].email,
                        username: results[0].username,
                        password: results[0].password
                    };
                    req.session.profile = profile;
                    res.send({ message: "Login success."})
                }
            })
        }
    })
});

module.exports = router;