const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const connection = require('../connection.js');
const config = require('../config.json');
const table = config.mysql.table;

const update = require('./updateAcc.js');

router.get('/info', (req, res) => {
    connection().query(`
        SELECT * FROM ${table}
        WHERE id = '${req.query['id']}';    
    `, (err, results) => {
        if (err) throw err;
        res.send({
            email: results[0].email,
            username: results[0].username
        });
    });
});

router.use('/update', update);

module.exports = router;