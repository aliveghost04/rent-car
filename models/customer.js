'use strict';
const modelName = 'Customer';

module.exports = models => {
	const Schema = models.Schema;

	let CustomerSchema = new Schema({
		name: {
			type: String,
			required: true
		},
		cedula: {
			type: String,
			required: true
		},
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
		status: {
			type: String,
			enum: ['active', 'inactive'],
			required: true
		}
	});

	return models.model(modelName, CustomerSchema); 
};