var express = require('express');
var multer  = require('multer');

var router = express.Router();

var controller = require('../controller/book.controller');

var validate = require('../validate/book.validate');

var authmiddleware = require('../middleware/auth.middleware');

var upload = multer({ dest: './public/uploads/' });

router.get('/', authmiddleware.requireAuth, controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create',
 upload.single('avatar'),
 validate.postCreate,
 controller.postcreate
);

module.exports = router;