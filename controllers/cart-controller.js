// var db = require('../db.js');
var Session = require('../models/sessions-model.js');
var Products = require('../models/products-model.js');

module.exports.addToCart = async function(req,res,next){
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;

    // if (!sessionId){
    //     res.redirect('/products');
    //     return;
    // }
    var currentCart = await Session.find({ sessionId: sessionId});
    if ( productId in currentCart[0].cart[0]) {
        (currentCart[0].cart[0])[productId]++;
    } else (currentCart[0].cart[0])[productId] = 1;
    Session.findOneAndUpdate({sessionId: sessionId},{cart : currentCart[0].cart[0]},function (err, user) {
        if (err) throw error
        console.log("update cart complete")
    });
    // var count = db.get('sessions').find({id: sessionId}).get('cart.'+ productId,0).value(); 
    //                 // gán cart là 1 object
    //                 // tìm xem trong card có key productId chưa, nếu chưa có thì cho giá trị của key đó là 0
    // db.get('sessions')
    // .find({id: sessionId})
    // .set('cart.'+ productId, count+1)
    // .write();

    res.redirect('/products');
}

module.exports.goToCartPage = async function(req,res,next){
    var sessionId = req.signedCookies.sessionId;
    var items = await Products.find();
    var currentCart = await Session.find({ sessionId: sessionId});
    var itemsInCart = [];
    for (var i in currentCart[0].cart[0]) { // currentCart[0].cart[0] là 1 object có các key là item id
        var item = (await Products.find({_id: i}) )[0];
        console.log(currentCart[0].cart[0] +" currentCart[0].cart[0]");
        console.log(i +" i");
        console.log(item + " Item");
        itemsInCart.push(item);
    }
    // var cart = db.get('sessions').find({id: sessionId}).get('cart').value();
    var itemCount = 0;
    res.render('../views/cart/cart.pug',{
        cart: itemsInCart,
        itemCount: itemCount
    });
}