'use strict';
const path = require('path');

module.exports = {
	entry: [
		'./node_modules/vue/dist/vue.js',
		'./views/index.js'
	],
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'public', 'scripts')
	}	
};