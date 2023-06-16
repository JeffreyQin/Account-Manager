const express = require('express');
const session = require('express-session');
const router = express.Router();

router.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET_KEY,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false
}));

router.get('/load', (req, res) => {
    console.log('ffdssdfsf')
    res.send({ data: req.session.profile });
})
module.exports = router;