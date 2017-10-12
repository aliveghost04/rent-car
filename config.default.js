'use strict';

let config = {
	port: process.env.PORT || 3000,
	hostname: process.env.HOSTNAME || 'localhost',
	defaultRoute: '/api',
	database: {
		name: process.env.DB_NAME || 'rent-car',
		port: process.env.DB_PORT || 27017,
		hostname: process.env.DB_HOST || 'localhost'
	},
	hash: 'RANDOM-HASH'
};

config.database['url'] = `mongodb://${config.database.hostname}:${config.database.port}/${config.database.name}`;

module.exports = config;