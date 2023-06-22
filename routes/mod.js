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
        res.send({ data: results });
    })
});

router.post('/remove', (req, res) => {
    if (req.body.id != "" && !isNaN(req.body.id)) {
        connection().query(`
            DELETE FROM ${table}
            WHERE id = ${req.body.id};
        `, (err, results) => {
            if (err) throw err;
            console.log(results);
        });
    }
});

module.exports = router;