'use strict';
const feathers = require('feathers');
const service = require('feathers-mongoose');
const vehicleError = require('../libs/error')('vehicle');
const parseSearch = require('../libs/parse-search');

module.exports = (route, app, models) => {
	const Vehicle = models.model('Vehicle');
	const VehicleBrand = models.model('VehicleBrand');
	const VehicleModel = models.model('VehicleModel');
	const VehicleType = models.model('VehicleType');
	const GasType = models.model('GasType');

	app.use(route, service({
		Model: Vehicle,
		paginate: {
			max: 100
		}
	}));

	const populateFields = hook => {
		return VehicleBrand.findOne({
			_id: hook.data.brand
		}).exec().then(brand => {
			if (brand) {
				hook.data.brand = brand.toObject();
				return VehicleModel.findOne({
					_id: hook.data.model,
					'brand._id': brand._id
				}).exec();
			} else {
				return Promise.reject(vehicleError('invalid_brand'));
			}
		}).then(model => {
			if (model) {
				hook.data.model = model.toObject();
				return VehicleType.findOne({
					_id: hook.data.vehicleType
				}).exec();
			} else {
				return Promise.reject(vehicleError('invalid_model'));
			}
		}).then(type => {
			if (type) {
				hook.data.vehicleType = type.toObject();
				return GasType.findOne({
					_id: hook.data.gasType
				}).exec();
			} else {
				return Promise.reject(vehicleError('invalid_vehicle_type'));
			}
		}).then(gasType => {
			if (gasType) {
				hook.data.gasType = gasType.toObject();
				return hook;
			} else {
				return Promise.reject(vehicleError('invalid_gas_type'));
			}
		});
	};

	app.service(route).hooks({
		before: {
			create(hook) {
				return populateFields(hook);
			},
			find: function (hook) {
				parseSearch(hook);
			}
		}
	});
};