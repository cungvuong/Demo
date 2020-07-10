var express = require('express');

var router = express.Router();

var controller = require('../controller/auth.controller');

var validate = require('../validate/book.validate');

router.get('/login', controller.login);

router.post('/login', controller.postLogin);

module.exports = router;