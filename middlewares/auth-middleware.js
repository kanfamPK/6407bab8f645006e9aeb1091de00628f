// var db = require('../db.js');
var User = require('../models/user-model.js');
module.exports.requireAuth = async function(req, res, next){
	var user = await User.find({_id.($oid): req.signedCookies.userId});
	if (!req.signedCookies.userId){
		res.redirect('/auth/login');
		return;
	}
	
	if(!user){
		res.redirect('/auth/login');
		return;
	}
	// User.find()
	// .then(function(x){
	// 	if (!req.signedCookies.userId){
	// 		res.redirect('/auth/login');
	// 		return;
	// 	}
		
	// 	if(!x){
	// 		res.redirect('/auth/login');
	// 		return;
	// 	}
	// 	res.locals.currentId = x[0].id;
	// 	res.locals.user = x[0];
	// 	next();
	// })
	// .catch(function(err){
	// 	console.log(err);
	// })
	res.locals.currentId = user[0]._id;
	res.locals.user = user[0];
	next();
}