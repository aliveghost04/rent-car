'use strict';
const modelName = 'VehicleBrand';

module.exports = models => {
	const Schema = models.Schema;

	let VehicleBrandSchema = new Schema({
		description: {
			type: String,
			required: true
		},
		active: {
			type: Boolean,
			required: true
		}
	}, {
		timestamps: true
	});

	return models.model(modelName, VehicleBrandSchema); 
};