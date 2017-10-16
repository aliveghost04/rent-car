'use strict';
const modelName = 'GasType';

module.exports = models => {
	const Schema = models.Schema;

	let GasTypeSchema = new Schema({
		description: {
			type: String,
			required: true
		},
		mesure: {
			type: String,
			required: true
		},
		status: {
			type: String,
			enum: ['active', 'inactive'],
			required: true
		}
	}, {
		timestamps: true
	});

	return models.model(modelName, GasTypeSchema); 
};