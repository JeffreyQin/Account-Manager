const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const router = express.Router();
require('dotenv').config();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET_KEY
}))

const connection = require('../connection.js');
const config = require('../config.json');
const table = config.mysql.table;

router.post('/username', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    checkCredentials('username', username, password, function(results) {
        if (results == 0) {
            res.send({ message: "Invalid credentials." })
        } else {

        }
    })
});

module.exports = router;

function checkCredentials(option, user, pw, callback) {
    connection().query(`
        SELECT * FROM ${table}
        WHERE ${option} = '${user}' AND password = '${pw}';
    `, (err, results) => {
        if (err) throw err;
        return callback(results.length);
    });
}