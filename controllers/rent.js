'use strict';
const feathers = require('feathers');
const service = require('feathers-mongoose');
const rentError = require('../libs/error')('rent');
const moment = require('moment');

module.exports = (route, app, models) => {
	const Rent = models.model('Rent');
	const VehicleInspection = models.model('VehicleInspection');

	app.use(route, service({
		Model: Rent,
		pagination: {
			max: 100
		}
	}));

	app.service(route).hooks({
		before: {
			create: function (hook) {
				if (!hook.data.inspection) {
					return Promise.reject(new rentError('no_inspection'));
				}

				hook.data.employee = hook.app.get('user')._id;
				
				hook.data.status = 'active';
				
				return VehicleInspection.findOne({
					_id: hook.data.inspection
				}).exec().then(vehicleInspection => {
					if (!vehicleInspection) {
						return Promise.reject(new rentError('invalid_inspection'));
					}

					hook.data.vehicle = vehicleInspection.vehicle;
					hook.data.customer = vehicleInspection.customer;
					delete hook.data.inspection;

					return hook;
				});
			}
		}
	});
};