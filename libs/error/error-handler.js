'use strict';
const serverError = require('./')('server')

module.exports = app => {
	app.use((req, res, next) => {
		next(new serverError('not_found'));
	});

	app.use((err, req, res, next) => {

		if (req.app.get('env') === 'development') {
			console.error(err);
		}

		res.status(err.status).json(err);
	});
}