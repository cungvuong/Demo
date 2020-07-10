var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

module.exports = mongoose.model("product", productSchema);