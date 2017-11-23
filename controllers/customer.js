'use strict';
const feathers = require('feathers');
const service = require('feathers-mongoose');
const parseSearch = require('../libs/parse-search')

module.exports = (route, app, models) => {
	const Customer = models.model('Customer');

	app.use(route, service({
		Model: Customer,
		paginate: {
			max: 100
		}
	}));

  app.service(route).hooks({
    before: {
      find: parseSearch
    }
  });
};