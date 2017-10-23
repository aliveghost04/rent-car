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
			enum: ['gls', 'm3s'],
			required: true
		},
		active: {
			type: Boolean,
			required: true
		}
	}, {
		timestamps: true
	});

	return models.model(modelName, GasTypeSchema); 
};