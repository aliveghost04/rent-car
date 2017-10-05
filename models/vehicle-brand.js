'use strict';
const modelName = 'VehicleBrand';

module.exports = models => {
	const Schema = models.Schema;

	let VehicleBrandSchema = new Schema({
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

	return models.model(modelName, VehicleBrandSchema); 
};