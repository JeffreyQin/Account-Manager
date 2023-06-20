const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const connection = require('../connection.js');
const config = require('../config.json');
const table = config.mysql.table;
const validator = require('../validators/signupValidate.js');

router.post('/', (req, res, next) => {
    validator.checkEmail(req.body.email, function(emailResult) {
        if (emailResult > 0) {
            res.send({ message: "Email already exists." });
        } else {
            next();
        }
    });
});

router.post('/', (req, res, next) => {
    validator.checkUsername(req.body.username, function(usernameResult) {
        if (usernameResult > 0) {
            res.send({ message: "Username unavailable." });
        } else {
            next();
        }
    });
});

router.post('/', (req, res, next) => {
    if (validator.checkPassword(req.body.password)) {
        res.send({ message: "Password invalid." });
    } else {
        next();
    }
});

router.post('/', (req, res) => {
    connection().query(`
        INSERT INTO ${table}
        VALUES (NULL, '${req.body.email}', '${req.body.username}', '${req.body.password}');
    `, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send({ message: "Account registered!" });
    });
});

module.exports = router;

