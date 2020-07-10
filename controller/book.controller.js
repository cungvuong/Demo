var db = require('../db');
var shortid = require('shortid');
var Book = require('../models/book.model');

module.exports.index = function(req, res) {
	//var books = db.get('books').value();
	Book.find().then(function(books){
		res.render("books/index", {
			books: books
		});
	});	
}

module.exports.search = function(req, res) {
	var q = {name: req.query.q};
	Book.find(q).then(function(books){
		res.render("books/index", {
			books: books
		});
	});	
}

module.exports.create = function(req, res) {
	//console.log(req.cookies);
	res.render('books/create');
}

module.exports.get = function(req, res) {
	var id = {_id: req.params.id};
	Book.find(id).then(function(books){
		res.render("books/index", {
			books: books
		});
	});	
}


module.exports.postcreate = function(req, res) {
	req.body.avatar = req.file.path.split("\\").slice(1).join("\\");
	var books = new Book({
		name: req.body.name,
		phone: req.body.phone,
		email: req.body.email,
		password: req.body.password
	});
	
	books.save(function(err){
		if(err){
			console.log("Error");
		}else{
			console.log("Ok babe");
			res.redirect('/book');
		}
	});
}