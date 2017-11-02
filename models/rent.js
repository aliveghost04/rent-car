'use strict';
const modelName = 'Rent';
const rentError = require('../libs/error')('rent');
const moment = require('moment');

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
			default: Date.now,
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
	}, {
		timestamps: true
	});

	RentSchema.pre('validate', function (next) {
		if (this.isNew) {
			this.rentDate = moment({
				hour: 0, 
				minutes: 0, 
				seconds: 0, 
				millisecond: 0
			}).toDate();
			this.daysQuantity = moment(this.rentDate).diff(this.returnDate, 'days');
		}

		if (moment(this.rentDate).isAfter(this.returnDate)) {
			next(new rentError('invalid_return_date'));
		} else {
			next();
		}
	});

	return models.model(modelName, RentSchema); 
};