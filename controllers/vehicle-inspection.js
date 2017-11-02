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

	app.service(route).hooks({
		before: {
			create: function(hook) {
				const user = hook.app.get('user')
				hook.data.inspectionEmployee = user._id;
			}
		}
	});
};