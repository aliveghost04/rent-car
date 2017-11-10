'use strict';
const modelName = 'Rent';
const rentError = require('../libs/error')('rent');
const moment = require('moment');

module.exports = models => {
	const Schema = models.Schema;

	let RentSchema = new Schema({
		employee: {
			type: {},
			required: true
		},
		vehicle: {
			type: {},
			required: true
		},
		customer: {
			type: {},
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
				return this.status === 'completed';
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
		daysQuantityTaken: {
			type: Number,
			required: function () {
				return this.status === 'completed';
			}
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
		let promise = Promise.resolve();

		if (this.isNew) {
			this.rentDate = moment({
				hour: 0, 
				minutes: 0, 
				seconds: 0, 
				millisecond: 0
			}).toDate();
			this.daysQuantity = moment(this.rentDate).diff(this.returnDate, 'days');

			// Populate fields
			promise = Vehicle
				.findById(this.vehicle)
				.exec()
				.then(vehicle => {
					if (vehicle) {
						this.vehicle = vehicle;
						return User
							.findById(this.employee)
							.exec();
					} else {
						return Promise
							.reject(new rentError('invalid_vehicle'));
					}
				})
				.then(user => {
					if (user) {
						this.user = user;
						return Customer
							.findById(this.customer)
							.exec()
					} else {
						return Promise
							.reject(new rentError('invalid_user'));
					}
				})
				.then(customer => {
					if (customer) {
						this.customer = customer;
					} else {
						return Promise
							.reject(new rentError('invalid_customer'));
					}
				})
		}

		promise
			.then(() => {
				if (moment(this.rentDate).isAfter(this.returnDate)) {
					return Promise
						.reject(new rentError('invalid_return_date'));
				} else {
					next();
				}
			})
			.catch(next)
	});

	RentSchema.post('save', function (doc, next) {
		const Vehicle = this.model('Vehicle');
		const Customer = this.model('Customer');
		const User = this.model('User');

		Vehicle
			.markAsRented(doc.vehicle)
			.then(() => {
				next();
			})
			.catch(next)
	});

	return models.model(modelName, RentSchema); 
};