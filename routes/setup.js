const express = require('express');
const router = express.Router();

const connection = require('../connection.js');
const config = require('../config.json');
const table = config.mysql.table;

router.use((req, res) => {
    connection().query(`
        CREATE TABLE IF NOT EXISTS ${table} (
            id INT AUTO_INCREMENT,
            email varchar(45),
            username varchar(45),
            password varchar(45),
            PRIMARY KEY (id)
        );
    `, (err, results) => {
        if (err) throw err;
        console.log(results);
    });
});

module.exports = router;