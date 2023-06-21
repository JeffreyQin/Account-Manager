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

router.post('/password', (req, res, next) => {
    connection().query(`
        SELECT password FROM ${table}
        WHERE id = '${req.body.id}'
    `, (err, results) => {
        if (err) {
            throw err;
        } else {
            if (!(results[0].password == req.body.oldPw)) {
                res.send({ message: 'Incorrect old password entered.' });
            } else if (!(req.body.newPw == req.body.confirmPw)) {
                res.send({ message: 'New passwords don\'t match.' });
            } else if (results[0].password == req.body.newPw ) {
                res.send({ message: 'Please use a new password.' });
            } else if (!validator.validPassword(req.body.newPw)) {
                res.send({ message: 'New password invalid.' });
            } else {
                next();
            }
        }
        console.log(results[0].password);
    });
});

router.post('/password', (req, res) => {
    connection().query(`
        UPDATE ${table}
        SET password = '${req.body.newPw}'
        WHERE id = '${req.body.id}';
    `, (err, results) => {
        if (err) {
            throw err;
        } else {
            console.log(results);
            res.send({ message: 'Password changed!' });
        }
    });
});

module.exports = router;