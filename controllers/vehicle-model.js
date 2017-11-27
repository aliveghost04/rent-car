'use strict';
const feathers = require('feathers');
const service = require('feathers-mongoose');
const parseSearch = require('../libs/parse-search');

module.exports = (route, app, models) => {
	const VehicleModel = models.model('VehicleModel');

	app.use(route, service({
		Model: VehicleModel,
		paginate: {
			max: 100
		}
	}));
	
	app.service(route).hooks({
		before: {
			find(hook) {
				parseSearch(hook);

				if (hook.params.query['brand']) {
					hook.params.query['brand._id'] = models.Types.ObjectId(hook.params.query.brand);
					delete hook.params.query.brand;
				}
				return Promise.resolve(hook);
			}
		}
	});
};