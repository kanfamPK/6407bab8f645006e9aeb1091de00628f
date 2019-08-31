// var db = require('../db.js');
var shortid = require('shortid');
var Users = require('../models/user-model.js');

module.exports.login = function(req,res){
	res.render('./auth/login.pug');
}
module.exports.loginPost = async function(req,res){
	var email = req.body.email;
	var	password = req.body.password;
	// var user = db.get('usersList').find({email: email}).value();
	var user = await Users.find({email: email}); // trả về user là 1 array có 1 phần tử
	if (!user){
		res.render('./auth/login.pug',{
			emailErr: 'User not exist',
			inputValues: req.body
		})
		return;
	}

	if (password !== user[0].password){
		res.render('./auth/login.pug',{
			passwordErr: 'Wrong password',
			inputValues: req.body
		})
		return;
	}
	res.cookie('userId', user[0].id, {signed: true});
	res.locals.currentId = user[0].id;
	res.redirect('/');
}