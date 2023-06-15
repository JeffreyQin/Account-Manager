const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser')
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const connection = require('../connection.js');
const config = require('../config.json');
const table = config.mysql.table;

var availability;

router.post('/', (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    console.log(req.body);
    checkEmail(email);
    checkUsername(email);
    
});

module.exports = router;

function checkEmail(email) {
    connection().query(`
        SELECT EXISTS(
            SELECT * FROM ${table} 
            WHERE email = '${email}'
        )
    `, (err, results) => {
        if (err) throw err;
        console.log(results);
        availability = results;
    });

}

function checkUsername(username) {
    connection().query(`
        SELECT * FROM ${table}
        WHERE username = '${username}'
    `, (err, results) => {
        if (err) throw err;
        console.log(results);
    });
}