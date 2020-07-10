// var db = require('../db');
// var shortid = require('shortid');
var Products = require('../../models/product.model');

module.exports.index = function(req, res) {
	// var size = db.get('products').size().value();
	// var page = parseInt(req.query.name_cat) || 1;
	// if (page >= (parseInt(size/8))) {
	// 	page = parseInt(size/8)+1;
	// }
	// if (page <= 1) {
	// 	page = 1;
	// }
	// var perPage = 8;
	// var start = (page-1) * perPage;
	// var end = page*perPage;
	// var products = db.get('products').value().slice(start, end);
	// res.render('products/index', {
	// 	products: products,
	// 	startOne: page-1,
	// 	endOne: page+2
	// });
	Products.find().then(function(products) {
		res.json(products);
	});
};


// module.exports.index = function(req, res) {
// 	var books = db.get('books').value();
// 	res.render("books/index", {
// 		books: books
// 	});
// }
