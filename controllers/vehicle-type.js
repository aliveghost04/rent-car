'use strict';
const feathers = require('feathers');
const service = require('feathers-mongoose');

module.exports = (route, app, models) => {
	const VehicleType = models.model('VehicleType');

	app.use(route, service({
		Model: VehicleType,
		paginate: {
			max: 100
		}
	}));
};