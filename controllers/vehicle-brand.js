'use strict';
const feathers = require('feathers');
const service = require('feathers-mongoose');
const parseSearch = require('../libs/parse-search');

module.exports = (route, app, models) => {
	const VehicleBrand = models.model('VehicleBrand');

	app.use(route, service({
		Model: VehicleBrand,
		paginate: {
			max: 100
		}
	}));

  app.service(route).hooks({
    before: {
      find: function (hook) {
        parseSearch(hook);
      }
    }
  });
};