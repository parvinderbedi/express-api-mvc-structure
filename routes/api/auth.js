var express = require('express');
var router = express.Router();
var UserController = require('../../controllers/UserController');

router.post('/', UserController.login);
router.post('/register', UserController.register);

module.exports = router;