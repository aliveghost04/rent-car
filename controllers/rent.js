'use strict';
const feathers = require('feathers');
const service = require('feathers-mongoose');

module.exports = (route, app, models) => {
	const Rent = models.model('Rent');

	app.use(route, service({
		Model: Rent,
		pagination: {
			max: 100
		}
	}));
};