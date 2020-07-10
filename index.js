require('dotenv').config();

//console.log(process.env.APP_SECRET);

var express = require('express');
var bodyParser = require('body-parser');

var port = 3000;
var app = express();
var productsRouter = require('./routes/products.route');
var bookRouter = require('./routes/book.route');
var sessionMiddleware = require('./middleware/session.middleware');
var authRouter = require("./routes/auth.route");
var cartRouter = require("./routes/cart.route");
var authMiddleware = require('./middleware/auth.middleware');
var getCount = require('./middleware/getcount.middleware');
var transferRoute = require('./routes/transfer.route'); 
var api = require('./api/routes/product.route'); 

app.use(express.static('public'));

// pug/
app.set('view engine', 'pug');
app.set('views', './views');

//body-parse
var cookieParser = require('cookie-parser');
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.APP_SECRET));
app.use(sessionMiddleware);
app.use(getCount);

// Mongoose 

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
	if(err) {
		console.log("Error");
	} else {
		console.log("Successful");
	}
});

var book = require('./models/book.model');


app.get('/book2', function(req, res) {
	var book2 = new book({
		email: 'cungvuong99@gmail.com',
		password: '123456',
		name: 'Vuong Cung',
		avatar: 'uploads\\63680fe8d5282ca0bec65b3cc71f8c7c',
		phone: '0123456'
	});

	book2.save(function(err){
		if(err){
			res.send("<h1>Vuong Cung</h1>");
		}else{
			res.send("<h1>Successful</h1>");
		}
	});
});

var product = require('./models/product.model');

app.get('/product2', function(req, res) {

	var product2 = new product({
		name: "Beef - Eye Of Round",
		image: "https://loremflickr.com/320/240",
		description: "in est risus auctor sed tristique in tempus sit amet sem fusce consequat"
	});

	product2.save(function(err) {
		if(err){
			res.send("<h1>Error</h1>");
		}else{
			res.send("<h1>Ok</h1>");
		}
	})
});

// get

app.get('/', function(req, res) {
	res.send("Trang Chu <br><a href='/book'> book </a>");
});

// var db = require('./db');
// app.get('/product', function(req, res) {
// 	var products = db.get('products').value();
// 	res.render('products/index', {
// 		products: products
// 	} );
// })

app.use('/product', productsRouter);
app.use('/book', authMiddleware.requireAuth, bookRouter);
app.use('/auth', authRouter);
app.use('/cart', cartRouter);
app.use('/transfer', authMiddleware.requireAuth, transferRoute);
app.use('/api/product', api);
// listen 

app.listen(port, function() {
	console.log("Hello World <3 I coming" + port);
});

//lets require/import the mongodb native drivers.


