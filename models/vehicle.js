'use strict';
const modelName = 'Vehicle';

module.exports = models => {
	const Schema = models.Schema;

	let VehicleSchema = new Schema({
		description: {
			type: String,
			required: true
		},
		chasisNumber: {
			type: String,
			required: true
		},
		engineNumber: {
			type: String,
			required: true
		},
		plateNumber: {
			type: String,
			required: true
		},
		vehicleType: {
			type: {},
			required: true
		},
		brand: {
			type: {},
			required: true
		},
		manufactureYear: {
			type: Number,
			required: true
		},
		model: {
			type: {},
			required: true
		},
		gasType: {
			type: {},
			required: true
		},
		costPerDay: {
			type: Number,
			required: true
		},
		wheels: {
			type: Number,
			required: true
		},
		images: [{
			path: {
				type: String,
				required: true
			},
			remote: {
				type: Boolean,
				required: true,
				default: false
			}
		}],
		status: {
			type: String,
			enum: ['rented', 'active', 'inactive', 'checking'],
			required: true
		}
	}, {
		timestamps: true
	});

	return models.model(modelName, VehicleSchema); 
};