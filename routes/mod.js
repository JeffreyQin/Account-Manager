const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const connection = require('../connection.js');
const config = require('../config.json');
const table = config.mysql.table;

router.get('/show', (req, res) => {
    connection().query(`
        SELECT * FROM ${table}
    `, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send({ data: results });
    })
});

module.exports = router;