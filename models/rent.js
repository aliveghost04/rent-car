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
		inspection: {
			type: Schema.Types.ObjectId,
			ref: 'VehicleInspection'/*,
			required: true*/
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
		gasAmount: {
			type: Number,
			required: function () {
				return this.status === 'completed';
			}
		},
		damageAmount: {
			type: Number,
			required: function () {
				return this.status === 'completed';
			}
		},
		surcharge: {
			type: Number,
			required: function () {
				return this.status === 'completed';
			}
		},
		total: {
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
		const Vehicle = this.model('Vehicle');
		const VehicleInspection = this.model('VehicleInspection');
		const User = this.model('User');
		const Customer = this.model('Customer');

		if (this.isNew) {
			this.rentDate = moment({
				hour: 0, 
				minutes: 0, 
				seconds: 0, 
				millisecond: 0
			}).toDate();
			this.daysQuantity = Math
				.ceil(
					moment(this.returnDate)
						.diff(this.rentDate, 'days', true)
				);

			// Populate fields
			promise = Vehicle
				.findById(this.vehicle)
				.exec()
				.then(vehicle => {
					if (vehicle) {
						this.vehicle = vehicle.toObject();
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
						this.user = user.toObject();
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
						this.customer = customer.toObject();
					} else {
						return Promise
							.reject(new rentError('invalid_customer'));
					}
				}).then(() => {
					VehicleInspection
						.findOne({
							rent: this._id,
							type: 'rent'
						}, {
							_id: 1
						})
						.exec()
						.then(inspection => {
							if (inspection) {
								this.inspection = inspection._id;
							} else {
								return Promise
									.reject(new rentError('invalid_inspection'));
							}
						});
				});
		} else {
			this.daysQuantityTaken = Math
				.ceil(
					moment(this.returnedDate)
						.diff(this.rentDate, 'd', true)
				);

			this.total = (this.daysQuantityTaken * this.costPerDay) +
				this.surcharge +
				this.gasAmount +
				this.damageAmount;

			this.status = 'completed';
			this.returnedDate = Date.now();
			
			promise = VehicleInspection
				.findOne({
					rent: this._id,
					type: 'return'
				}, {
					_id: 1
				})
				.exec()
				.then(inspection => {
					if (inspection) {
						this.inspection = inspection._id;
					} else {
						return Promise
							.reject(new rentError('invalid_inspection'));
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
		let promise = Promise.resolve();
		const Vehicle = this.model('Vehicle');
		const VehicleInspection = this.model('VehicleInspection');
		
		if (doc.status === 'active') {
			promise = Vehicle
				.markAsRented(doc.vehicle._id)
				.then(() => {
					return VehicleInspection
						.setRent(doc.inspection, doc._id);
				});
		} else if (doc.status === 'completed') {
			promise = Vehicle
				.markAsActive(doc.vehicle._id);
		}
			
		promise
			.then(() => {
				next();
			})
			.catch(next)
	});

	return models.model(modelName, RentSchema); 
};