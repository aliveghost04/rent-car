'use strict';
const feathers = require('feathers');
const service = require('feathers-mongoose');

module.exports = (route, app, models) => {
	const GasType = models.model('GasType');

	app.use(route, service({
		Model: GasType,
		pagination: {
			max: 100
		}
	}));
};