'use strict';
const feathers = require('feathers');
const service = require('feathers-mongoose');
const rentError = require('../libs/error')('rent');
const moment = require('moment');

module.exports = (route, app, models) => {
	const Rent = models.model('Rent');
	const VehicleInspection = models.model('VehicleInspection');

	app.get(`${route}/:id/calculate-days-delay`, (req, res, next) => {
		Rent
			.findById(req.params.id)
			.exec()
			.then(rent => {
				if (rent) {
					const daysDelay = moment().diff(rent.returnDate, 'd');

					res.json({
						costPerDay: rent.costPerDay,
						daysDelay,
						daysDelayAmount: daysDelay > 0 ? daysDelay * rent.costPerDay : 0
					});
				} else {
					return Promise.reject(new rentError('not_found'));
				}
			})
			.catch(next)
	});

	app.use(route, service({
		Model: Rent,
		paginate: {
			max: 100
		}
	}));

	app.service(route).hooks({
		before: {
			find: function (hook) {
				hook.params.query.$sort = {
					returnDate: 1
				};

				hook.params.query['status'] = 'active';
			},
			create: function (hook) {
				if (!hook.data.inspection) {
					return Promise.reject(new rentError('no_inspection'));
				}

				hook.data.employee = hook.app.get('user')._id;
				
				hook.data.status = 'active';
				
				return VehicleInspection.findOne({
					_id: hook.data.inspection
				}, {
					vehicle: 1
				}).exec().then(vehicleInspection => {
					if (!vehicleInspection) {
						return Promise.reject(new rentError('invalid_inspection'));
					}

					hook.data.vehicle = vehicleInspection.vehicle;
					delete hook.data.inspection;

					return hook;
				});
			},
			remove: function (hook) {
				return Promise.reject(new rentError('method_not_allowed'));
			},
			patch: function (hook) {
				const data = {
					gasAmount: hook.data.gasAmount,
					damageAmount: hook.data.damageAmount,
					surcharge: hook.data.surcharge
				};

				const query = {
					_id: models.Types.ObjectId(hook.id),
					'$or': [{
						status: 'active'
					}, {
						status: 'checking'
					}]
				};

				return Rent
					.findOne(query)
					.exec()
					.then(rent => {
						if (rent) {
							Object.assign(rent, data);
							return rent.save();
						} else {
							return Promise
								.reject(new rentError('not_found_or_validated'))
						}
					})
					.then(rent => {
						hook.result = rent.toObject();
					});
			},
			update: function (hook) {
				return Promise.reject(new rentError('method_not_allowed'));
			}
		}
	});
};