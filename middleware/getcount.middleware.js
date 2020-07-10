var db = require('../db');

module.exports = function(req, res, next) {
	if(req.signedCookies.sessionId) {
		var sessionId = req.signedCookies.sessionId;
		var countTotal = 0;
		var number = db.get('sessions').find({id: sessionId}).get('cart').value();
		for (key in number) {
			countTotal += db.get('sessions').find({id: sessionId}).get('cart.' + key).value();
		}

		res.locals.countTotal = countTotal;
	}

	next();
}