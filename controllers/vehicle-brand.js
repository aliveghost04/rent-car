'use strict';
const feathers = require('feathers');
const service = require('feathers-mongoose');

module.exports = (route, app, models) => {
	const VehicleBrand = models.model('VehicleBrand');

	app.use(route, service({
		Model: VehicleBrand,
		pagination: {
			max: 100
		}
	}));
};