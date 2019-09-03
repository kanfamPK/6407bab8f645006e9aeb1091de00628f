require('dotenv').config()

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true });

var userRoute = require('./routes/user-route.js');
var authRoute = require('./routes/auth-route.js');
var productRoute = require('./routes/product-route.js');
var cartRoute = require('./routes/cart-route.js');

var authMiddleware = require('./middlewares/auth-middleware.js');
var sessionMiddleware = require('./middlewares/session-middleware.js');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static('public')); // khai báo các file static nằm ở public
app.use(sessionMiddleware); // các middleware ảnh hưởng đến tất cả đường dẫn sử dụng

app.get('/', authMiddleware.requireAuth,function(req, res) {
 	res.render('./index.pug',{
 		name: res.locals.user.name
 	});
});

app.use('/users', authMiddleware.requireAuth,userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);

app.listen(port, () => console.log(`Example app listening on port `+ port))