const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const connection = require('../connection.js');
const config = require('../config.json');
const table = config.mysql.table;
const validator = require('../validators/loginValidate.js');

router.post('/username', (req, res, next) => {
    validator.checkCredentials('username', req.body.username, req.body.password, function(notFound) {
            if (notFound) {
                res.send({ message: "Invalid credentials." })
            } else {
                next();
            }
        }
    )
});

router.post('/username', (req, res) => {
    connection().query(`
        SELECT *
        FROM ${table}
        WHERE username = '${req.body.username}';
    `, (err, results) => {
        if (err) {
            throw err;
        } else {
            res.send({ 
                message: "Login success.",
                username: results[0].username
            });
        }
    });
});

router.post('/email', (req, res, next) => {
    validator.checkCredentials('email', req.body.email, req.body.password, function(notFound) {
        if (notFound) {
            res.send({ message: "Invalid credentials." })
        } else {
            next();
        }
    });
});

router.post('/email', (req, res) => {
    connection().query(`
        SELECT *
        FROM ${table}
        WHERE email = '${req.body.email}';
    `, (err, results) => {
        if (err) {
            throw err;
        } else {
            res.send({
                message: 'Login success.',
                username: results[0].username
            });
        }
    });
});

module.exports = router;