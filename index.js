'use strict';

let express = require('express');
let app = express();
const errorHandler = require('./libs/error/error-handler');
const fs = require('fs');

// Load configuration
let config;
try {
	config = require('./config');
} catch (e) {
	console.error('** CONFIGURATION NOT FOUND **');
	if (app.get('env') === 'development') {
		console.warn('** USING DEFAULT CONFIGURATION **');
		config = require('./config.default.js');
	} else {
		console.log('Please create a configuration file');
		process.exit();
	}
}
// End configuration

// Load controllers
fs.readdirSync('./controllers').forEach(file => {
	let match = /(.*?)\.js$/.exec(file);
	if (match) {
		let filename = match[1];
		let router = require(`./controllers/${filename}`)(`/${filename}`, app);
		app.use(config.defaultRoute, router);
	} else {
		console.warn(`** Please remove "${file}" file from controllers folder **`);
	}
});

// Serve statics just in development
if (app.get('env') !== 'production') {
	app.use('/', express.static('public'));
}

errorHandler(app);

app.listen(config.port, config.hostname, () => {
	console.log(`Express listening on ${config.hostname}:${config.port} at ${Date()}`);
});