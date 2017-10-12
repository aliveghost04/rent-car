'use strict';
const feathers = require('feathers');
const service = require('feathers-mongoose');

module.exports = (route, app, models) => {
	const VehicleModel = models.model('VehicleModel');

	app.use(route, service({
		Model: VehicleModel,
		pagination: {
			max: 100
		}
	}));
};