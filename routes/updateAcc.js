const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }))

const connection = require('../connection.js');
const config = require('../config.json');
const table = config.mysql.table;

const validator = require('../validators/signupValidate.js');

router.post('/email', (req, res, next) => {
    validator.checkEmail(req.body.email, function(result) {
        if (result > 0) {
            res.send({ message: 'Email already exists.' });
        } else {
            next();
        }
    })
});

router.post('/email', (req, res) => {
    connection().query(`
        UPDATE ${table}
        SET email = '${req.body.email}'
        WHERE id = '${req.body.id}';
    `, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send({ message: 'Email updated!'})
    });
});

router.post('/username', (req, res, next) => {
    validator.checkUsername(req.body.username, function(result) {
        if (result > 0) {
            res.send({ message: 'Username unavailable.' });
        } else {
            next();
        }
    });
});

router.post('/username', (req, res) => {
    connection().query(`
        UPDATE ${table}
        SET username = '${req.body.username}'
        WHERE id = '${req.body.id}';
    `, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send({ message: 'Username updated!' });
    });
});


module.exports = router;