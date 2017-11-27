'use strict';
const feathers = require('feathers');
const service = require('feathers-mongoose');
const parseSearch = require('../libs/parse-search');

module.exports = (route, app, models) => {
	const VehicleType = models.model('VehicleType');

	app.use(route, service({
		Model: VehicleType,
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