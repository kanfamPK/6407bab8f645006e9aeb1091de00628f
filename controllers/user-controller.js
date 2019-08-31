// var db = require('../db.js');
var shortid = require('shortid');
var userList = require('../models/user-model.js');

module.exports.index = async function(req,res){
	var users = await userList.find();
	res.render('./users/index.pug',{
		usersList: users
	});
};

module.exports.search = async function(req,res){
	var q = req.query.q;
	var users = await userList.find();
	var matchedUsers = users.filter(function(x){
		return x.name.toLowerCase().includes(q.toLowerCase()) !== false;
	});
	res.render('users/index.pug',{
		usersList: matchedUsers,
		inputValue: q
	});	
};

module.exports.createRender = function(req,res){
	res.render('users/create.pug');
};

module.exports.getId = async function(req,res){
	var user = await userList.find({ _id: req.params.id});
	res.render('users/view.pug',{
		user: user[0]
	});
}

module.exports.createPost = function(req,res){
	if (res.locals.passedValidate === true){
		var user = new userList({name: req.body.name ,phone: req.body.phone, email: 'asdasd@', password: '123123'});
		user.save();
	 	// db.get('usersList').push(req.body).write();
	}
	res.redirect('/users');
};

// module.exports.deleteRender = function(req,res){
// 	res.render('users/delete.pug',{
// 		usersList: db.get('usersList').value()
// 	});
// }

// module.exports.deletePost = function(req,res){
// 	db.get('usersList').remove(req.body).write();
// 	res.redirect('/users');
// }
