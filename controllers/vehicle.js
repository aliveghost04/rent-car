'use strict';
const feathers = require('feathers');
const service = require('feathers-mongoose');

module.exports = (route, app, models) => {
	const Vehicle = models.model('Vehicle');

	app.use(route, service({
		Model: Vehicle,
		pagination: {
			max: 100
		}
	}));
};