'use strict';
const modelName = 'VehicleInspection';
const vehicleInspectionError = require('../libs/error')('vehicleinspection');

module.exports = models => {
	const Schema = models.Schema;

	let VehicleInspectionSchema = new Schema({
		vehicle: {
			type: {},
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
			default: Date.now,
			required: true
		},
		type: {
			type: 'String',
			enum: ['return', 'rent'],
			required: true
		},
		inspectionEmployee: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		rent: {
			type: Schema.Types.ObjectId,
			ref: 'Rent'
		}
	}, {
		timestamps: true
	});

	VehicleInspectionSchema.statics.setRent = function (_id, rent) {
		return this.update({
			_id
		}, {
			rent
		}).then(res => {
			if (res.ok) {
				return Promise.resolve(true);
			} else {
				return Promise.reject(new vehicleInspectionError('error'));
			}
		})
	};

	VehicleInspectionSchema.pre('validate', function (next) {
		let promise = Promise.resolve();
		const Rent = this.model('Rent');

		if (!this.vehicle && this.rent) {
			promise = Rent
				.findById(this.rent)
				.exec()
				.then(rent => {
					if (rent) {
						this.vehicle = rent.vehicle;
					} else {
						return Promise
							.reject(new vehicleInspectionError('invalid_vehicle'));
					}
				})
		}

		promise.then(() => {
			next();
		}).catch(next);
	});

	VehicleInspectionSchema.pre('save', function (next) {
		let promise = Promise.resolve();
		const Vehicle = this.model('Vehicle');
		
		if (this.isNew) {
			Vehicle
				.findById(this.vehicle)
				.exec()
				.then(vehicle => {
					if (vehicle) {
						this.vehicle = vehicle.toObject()
					} else {
						return Promise
							.reject(
								new vehicleInspectionError('invalid_vehicle')
							);
					}
				})
		}

		promise.then(() => {
			next();
		}).catch(next)
	});

	return models.model(modelName, VehicleInspectionSchema); 
};