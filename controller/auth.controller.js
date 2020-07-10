var db = require('../db'); 
var md5 = require('md5');
module.exports.login = function(req, res) {
	res.render('auth/login')
}

module.exports.postLogin = function(req, res) {
	var email = req.body.email;
	var password = req.body.password;
	//console.log(email);
	var book = db.get('books').find({email: email}).value();
	//console.log(book);
	if (!book) {
		res.render('auth/login', {
			errors: [
				'book does not exist.'
			],
			values: req.body
		});
		return;
	}

	var md5password = md5(password);
	
	if (book.password !== md5password) {
		res.render('auth/login', {
			errors: [
				'Wrong password'
			],
			values: req.body
		});
		return;
	}
	res.cookie('bookId', book.id, {
		signed: true
	});
	res.redirect('/book');
}