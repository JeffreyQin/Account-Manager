const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const connection = require('../connection.js');
const config = require('../config.json');
const table = config.mysql.table;
const validator = require('../validators/signupValidate.js');
const msg = require('./resMsg.json');

router.post('/', (req, res, next) => {
    if (req.body.email == "" || req.body.username == "" || req.body.password == "") {
        res.send({ message: msg.err.ERR_FORM_INCOMPLETE, code: 1 });
    } else {
        next();
    }
});

router.post('/', (req, res, next) => {
    validator.checkEmail(req.body.email, function(emailResult) {
        if (emailResult > 0) {
            res.send({ message: msg.err.ERR_EMAIL_USED, code: 1 });
        } else {
            next();
        }
    });
});

router.post('/', (req, res, next) => {
    validator.checkUsername(req.body.username, function(usernameResult) {
        if (usernameResult > 0) {
            res.send({ message: msg.err.ERR_USERNAME_USED, code: 1 });
        } else {
            next();
        }
    });
});

router.post('/', (req, res, next) => {
    if (!validator.validPassword(req.body.password)) {
        res.send({ message: msg.err.ERR_PASSWORD_INVALID, code: 1 });
    } else {
        next();
    }
});

router.post('/', (req, res) => {
    connection().query(`
        INSERT INTO ${table}
        VALUES (NULL, '${req.body.email}', '${req.body.username}', '${req.body.password}');
    `, (err, results) => {
        if (err) {
            throw err;
        } else {
            console.log(results);
            res.send({ message: msg.success.SUCCESS_SIGNUP, code: 0 });
        }
    });
});

module.exports = router;

