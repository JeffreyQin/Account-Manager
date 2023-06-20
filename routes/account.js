const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const connection = require('../connection.js');
const config = require('../config.json');
const table = config.mysql.table;

router.get('/info', (req, res) => {
    connection().query(`
        SELECT * FROM ${table}
        WHERE username = '${req.query['user']}';    
    `, (err, results) => {
        if (err) throw err;
        res.send({
            email: results[0].email,
            username: results[0].username
        });
    });
});

module.exports = router;