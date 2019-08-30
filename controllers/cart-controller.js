var db = require('../db.js');

module.exports.addToCart = function(req,res,next){
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;

    // if (!sessionId){
    //     res.redirect('/products');
    //     return;
    // }

    var count = db.get('sessions').find({id: sessionId}).get('cart.'+ productId,0).value(); 
                    // gán cart là 1 object
                    // tìm xem trong card có key productId chưa, nếu chưa có thì cho giá trị của key đó là 0
    db.get('sessions')
    .find({id: sessionId})
    .set('cart.'+ productId, count+1)
    .write();

    res.redirect('/products');
}

module.exports.goToCartPage = function(req,res,next){
    var sessionId = req.signedCookies.sessionId;
    var cart = db.get('sessions').find({id: sessionId}).get('cart').value();
    var itemCount = 0;
    for (var i in cart) itemCount++;
    res.render('../views/cart/cart.pug',{
        cart:cart,
        itemCount: itemCount
    });
}