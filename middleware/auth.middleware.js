var db = require('../db');

module.exports.requireAuth = function(req, res, next) {
	if (!req.signedCookies.bookId) {
		res.redirect('/auth/login');
		return;
	}

	var book = db.get('books').find({
		id: req.signedCookies.bookId}).value();

	if (!book) {
		res.redirect('/auth/login');
		return;
	}

	res.locals.book = book;
	
	console.log(book);
	next();
};