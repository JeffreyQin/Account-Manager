const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }))

const connection = require('../connection.js');
const config = require('../config.json');
const table = config.mysql.table;

const validator = require('../validators/signupValidate.js');
const msg = require('./resMsg.json');

router.post('/email', (req, res, next) => {
    if (req.body.email == "") {
        res.send({ message: msg.err.ERR_FORM_INCOMPLETE, code: 1 });
    } else {
        next();
    }
});

router.post('/email', (req, res, next) => {
    validator.checkEmail(req.body.email, function(result) {
        if (result > 0) {
            res.send({ message: msg.err.ERR_EMAIL_USED, code: 1 });
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
        if (err) {
            throw err;
        } else {
            console.log(results);
            res.send({ message: msg.success.SUCCESS_EMAIL_UPDATE, code: 0 });
        }
    });
});

router.post('/username', (req, res, next) => {
    if (req.body.username == "") {
        res.send({ message: msg.err.ERR_FORM_INCOMPLETE, code: 1 });
    } else {
        next();
    }
});

router.post('/username', (req, res, next) => {
    validator.checkUsername(req.body.username, function(result) {
        if (result > 0) {
            res.send({ message: msg.err.ERR_USERNAME_USED, code: 1 });
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
        if (err) { 
            throw err;
        } else {
            console.log(results);
            res.send({ message: msg.success.SUCCESS_USERNAME_UPDATE, code: 0 });
        }
    });
});

router.post('/password', (req, res, next) => {
    if (req.body.oldPw == "" || req.body.newPw == "" || req.body.confirmPw == "") {
        res.send({ message: msg.err.ERR_FORM_INCOMPLETE, code: 1 });
    } else {
        next();
    }
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
                res.send({ message: msg.err.ERR_INCORRECT_OLD_PASSWORD, code: 1 });
            } else if (!(req.body.newPw == req.body.confirmPw)) {
                res.send({ message: msg.err.ERR_UNMATCHED_NEW_PASSWORD, code: 1 });
            } else if (results[0].password == req.body.newPw ) {
                res.send({ message: msg.err.ERR_USED_NEW_PASSWORD, code: 1 });
            } else if (!validator.validPassword(req.body.newPw)) {
                res.send({ message: msg.err.ERR_INVALID_NEW_PASSWORD, code: 1 });
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
            res.send({ message: msg.success.SUCCESS_PASSWORD_UPDATE, code: 0 });
        }
    });
});

module.exports = router;