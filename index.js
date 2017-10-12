'use strict';

const bodyParser = require('body-parser');
const rest = require('feathers-rest');
let feathers = require('feathers');
let app = feathers();
const errorHandler = require('./libs/error/error-handler');
const fs = require('fs');
let models = require('mongoose');
models.Promise = global.Promise;

app
	.configure(rest())
	.use(bodyParser.json());

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
app.set('config', config);
// End configuration

// Make connection to database
models.connect(config.database.url, {
	useMongoClient: true
}).then(() => {
	// Serve statics just in development
	if (app.get('env') !== 'production') {
		app.use(require('cors')('*'));
		app.use('/', feathers.static('public'));
	}

	// Load models
	fs.readdirSync('./models').forEach(file => {
		let match = /^(?!\.)(.*?)\.js$/.exec(file);
		if (match) {
			require(`./models/${file}`)(models);
		} else {
			if (file.indexOf('.') !== 0) {
				console.warn(`** Please remove "${file}" file from models folder **`);
			}
		}
	});

	// Load controllers
	fs.readdirSync('./controllers').forEach(file => {
		let match = /^(?!\.)(.*?)\.js$/.exec(file);
		if (match) {
			let filename = match[1];
			require(`./controllers/${filename}`)(`${config.defaultRoute}/${filename}`, app, models);
		} else {
			if (file.indexOf('.') !== 0) {
				console.warn(`** Please remove "${file}" file from controllers folder **`);
			}
		}
	});

	errorHandler(app);

	app.listen(config.port, config.hostname, () => {
		console.log(`Feathers listening on ${config.hostname}:${config.port} at ${Date()}`);
	});
}).catch(err => {
	console.error(`Cannot connect to database: ${config.database.url}`, err);
	process.exit();
});