'use strict';
const jwt = require('jsonwebtoken');

module.exports = (route, app, models) => {
	const User = models.model('User');
	const config = app.get('config');

	app.post(route, function (req, res, next) {
		User.login(req.body.cedula, req.body.password).then(user => {

			if (user) {
				jwt.sign({
					_id: user._id,
					name: user.name,
					level: user.level,
					status: user.status
				}, config.hash, function(err, token) {
					if (err) return Promise.reject(err);
					
					res.json({
						token,
						user
					});
				});
			}
		}).catch(next);
	});
};