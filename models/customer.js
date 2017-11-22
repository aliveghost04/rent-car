'use strict';
const modelName = 'Customer';
const cedulaValidator = require('../libs/cedula-validator');

module.exports = models => {
	const Schema = models.Schema;

	let CustomerSchema = new Schema({
		name: {
			type: String,
			required: true
		},
		cedula: {
			type: String,
			required: true,
			validate: {
				validator: function (v) {
					return cedulaValidator.validate(v);
				},
				message: 'Invalid cedula'
			}
		},
		email: String,
		creditCard: {
			number: {
				type: String,
				required: true
			},
			cvv: {
				type: Number,
				required: true
			},
			expirationDate: {
				month: {
					type: Number,
					required: true
				},
				year: {
					type: Number,
					requied: true
				}
			}
		},
		creditLimit: {
			type: Number,
			required: true
		},
		personType: {
			type: String,
			required: true,
			enum: ['person', 'entity']
		},
		active: {
			type: Boolean,
			required: true
		}
	}, {
		timestamps: true
	});

	return models.model(modelName, CustomerSchema); 
};