'use strict';
const feathers = require('feathers');
const service = require('feathers-mongoose');
const parseSearch = require('../libs/parse-search');

module.exports = (route, app, models) => {
	const GasType = models.model('GasType');

	app.use(route, service({
		Model: GasType,
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