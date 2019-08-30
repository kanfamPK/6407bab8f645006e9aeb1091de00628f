var express = require('express');
var router = express.Router();
var userController = require('../controllers/user-controller.js');
var xacthuc = require('../middlewares/validate.js');

router.get('/', userController.index);

router.get('/search', userController.search);

router.get('/create', userController.createRender);

router.post('/create', xacthuc.validate,userController.createPost);

router.get('/:id', userController.getId);

module.exports = router;