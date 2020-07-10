var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
	email: String,
	password: String,
	name: String,
	avatar: String,
	phone: String
});

module.exports = mongoose.model("Book", bookSchema);