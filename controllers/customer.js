'use strict';
const feathers = require('feathers');
const service = require('feathers-mongoose');

module.exports = (route, app, models) => {
	const Customer = models.model('Customer');

	app.use(route, service({
		Model: Customer,
		paginate: {
			max: 100
		}
	}));
};