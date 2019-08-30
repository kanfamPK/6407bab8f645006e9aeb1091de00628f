var db = require('../db.js');
var shortid = require('shortid');
var	Products = require('../models/products-model.js');
var User = require('../models/user-model.js');

module.exports.index = async function(req,res){
	var items = await Products.find();
	var currentUser = await User.find({id: req.signedCookies.userId});
	var page = parseInt(req.query.page) || 1; // nếu query chưa tồn tại thì mặc định cho là 1
	var perPage = 12;                        // ví dụ chuyển từ trang users qua trang product thì localhost:3000/products => chưa có query
	var start = (page-1)*perPage;            // bấm vào các ô 1 2 3 localhost:3000/products?page=1 => đã có query
	var end = (page-1)*perPage + perPage;
	if ( (items.length)%perPage >0 ) {
		var limitPage = Math.floor( (items.length)/perPage ) + 1;
	} else {
		var limitPage = Math.floor(items.length)/perPage;
	}

	// var user = db.get('usersList').find({id: req.signedCookies.userId}).value();
	res.render('../views/products/index.pug',{
			page:page,
			limitPage: limitPage,
			user: currentUser,
			productsList: items.slice(start,end)
		})
};