'use strict';
const feathers = require('feathers');
const service = require('feathers-mongoose');

module.exports = (route, app, models) => {
	const VehicleInspection = models.model('VehicleInspection');

	app.use(route, service({
		Model: VehicleInspection,
		pagination: {
			max: 100
		}
	}));
};