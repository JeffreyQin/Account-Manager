const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/info', (req, res) => {
    console.log(req.session.loggedin);
});


module.exports = router;