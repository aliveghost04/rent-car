'use strict';

const fs = require('fs');
const path = require('path');
let modules = {};
const messagePath = path.resolve(__dirname, 'messages');

fs.readdirSync(`${messagePath}`).forEach(file => {
	let match = /(.*?)\.js$/.exec(file)
	let filename;

	if (match) {
		filename = match[1]; 
		modules[filename.toUpperCase()] = require(path.resolve(messagePath, filename));
	}
});

module.exports = moduleName => {
	
	// Convert module name to upper case	
	if (typeof moduleName !== 'string') {
		throw new Error(`Invalid module "${moduleName}"`);
	} else {
		moduleName = moduleName.toUpperCase();
	}

	let module = modules[moduleName];
	if (!module) {
		throw new Error(`Module "${module}" not found`);
	}

	function CustomError(message) {

		if (typeof message !== 'string') {
			throw new Error(`Invalid message "${message}"`);
		} else {
			message = message.toUpperCase();
		}

		if (!(this instanceof CustomError)) {
			return new CustomError(message);
		}
		Error.captureStackTrace(this, CustomError);
		
		let error = modules[moduleName][message];
		if (error) {
			Object.assign(this, error);
			this.name = `E_${moduleName}_${message}`;
		} else {
			throw new Error(`Message "${message}" not found`);
		}
	};
	
	CustomError.prototype = Error.prototype;
	CustomError.prototype.constructor = 'CustomError';

	return CustomError;
};