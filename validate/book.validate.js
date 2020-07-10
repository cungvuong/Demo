module.exports.postCreate = function(req, res, next) {
	var errors = [];
	if (!req.body.name) {
		errors.push('Name is required.');
	}

	if (!req.body.phone) {
		errors.push('Phone is require');
	}

	if(errors.length) {
		res.render('books/create', {
			errors: errors,
			values: req.body
		});
		return;
	}
	next();
}