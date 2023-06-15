const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const connection = require('../connection.js');
const config = require('../config.json');
const table = config.mysql.table;

router.post('/username', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    connection().query(`
        SELECT * 
        FROM ${table} 
        WHERE username = '${username}' AND password = '${password}'
    `, (err, results) => {
        if (err) throw err;
        console.log(results);
    })
});


module.exports = router;