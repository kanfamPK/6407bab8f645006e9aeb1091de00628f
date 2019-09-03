var shortid = require('shortid');
var Users = require('../models/user-model.js');

module.exports.signout = function(req,res){
    res.clearCookie('userId');
    res.redirect('/');
}