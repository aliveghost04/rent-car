'use strict';
const modelName = 'VehicleType';

module.exports = models => {
	const Schema = models.Schema;

	let VehicleTypeSchema = new Schema({
		description: {
			type: String,
			required: true,
			unique: true
		},
		status: {
			type: String,
			enum: ['active', 'inactive'],
			required: true
		}
	}, {
		timestamps: true
	});

	return models.model(modelName, VehicleTypeSchema); 
};