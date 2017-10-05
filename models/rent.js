'use strict';
const modelName = 'Rent';

module.exports = models => {
	const Schema = models.Schema;

	let RentSchema = new Schema({
		employee: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
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
		rentDate: {
			type: Date,
			required: true
		},
		returnDate: {
			type: Date,
			required: true
		},
		returnedDate: {
			type: Date,
			required: function() {
				return this.status !== 'active';
			}
		},
		costPerDay: {
			type: Number,
			required: true
		},
		daysQuantity: {
			type: Number,
			required: true
		},
		comment: String,
		status: {
			type: String,
			enum: ['active', 'completed', 'checking'],
			required: true
		}
	});

	return models.model(modelName, RentSchema); 
};