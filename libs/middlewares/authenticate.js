'use strict';
const jwt = require('jsonwebtoken');

module.exports = {
	requireAuthentication: (req, res, next) => {
		// if (req.get('headers'))
	},
	parseAuthentication() {
		this.use((req, res, next) => {
			if (req.headers['authorization']) {
				let token = req.headers['authorization'].split(' ').pop();
				
				jwt.verify(
					token, 
					req.app.get('config').hash, 
					function (err, data) {
						if (err) {
							next(err);
						} else {
							req.app.set('user', data);
							next();
						}
					}
				);
			} else {
				next();
			}
		});
	}
};