'use strict';
const modelName = 'VehicleModel';

module.exports = models => {
	const Schema = models.Schema;

	let VehicleModelSchema = new Schema({
		brand: {
			type: {},
			required: true
		},
		description: {
			type: String,
			required: true
		},
		status: {
			type: String,
			enum: ['active', 'inactive'],
			required: true
		}
	});

	return models.model(modelName, VehicleModelSchema); 
};