'use strict';
const feathers = require('feathers');
const service = require('feathers-mongoose');

module.exports = (route, app, models) => {
	const User = models.model('User');

	app.use(route, service({
		Model: User,
		pagination: {
			max: 100
		}
	}));
};