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

    if (err.errors) {
      let error = new serverError('validation');
      error.message = [];
      Object.keys(err.errors).forEach(key => {
        error.message.push(err.errors[key].message);
      });

      err = error;
    }

		res.status(err.status).json(err);
	});
}