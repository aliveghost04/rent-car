'use strict';
const modelName = 'VehicleInspection';

module.exports = models => {
	const Schema = models.Schema;

	let VehicleInspectionSchema = new Schema({
		vehicle: {
			type: Schema.Types.ObjectId,
			ref: 'Vehicle',
			required: true
		},
		customer: {
			type: Schema.Types.ObjectId,
			ref: 'Customer',
			required: true
		},
		hasScratchs: {
			type: Boolean,
			required: true
		},
		gasQuantity: {
			type: String,
			enum: ['empty', 'quarter', 'half', 'three_quarter', 'full'],
			required: true
		},
		spareTire: {
			type: Boolean,
			required: true
		},
		hasJack: {
			type: Boolean,
			required: true
		},
		hasBrokenWindows: {
			type: Boolean,
			required: true
		},
		wheelsState: {
			type: {},
			required: true
		},
		inspectedAt: {
			type: Date,
			required: true
		},
		inspectionEmployee: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		}
	}, {
		timestamps: true
	});

	return models.model(modelName, VehicleInspectionSchema); 
};