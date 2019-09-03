var express = require('express');
var router = express.Router();
var signoutController = require('../controllers/signout-controller.js');
router.get('/', signoutController.signout);

module.exports = router;