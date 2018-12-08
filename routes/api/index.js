var express = require('express');
var router = express.Router();


router.use('/auth', require('./auth'));

router.get('/', function(req, res, next) {
    res.send("<h1>Express APIs</h1>");
});

module.exports = router;