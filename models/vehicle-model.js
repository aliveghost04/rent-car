'use strict';
const modelName = 'VehicleModel';
const vehicleModelError = require('../libs/error')('vehiclemodel');

module.exports = models => {
	const Schema = models.Schema;

	let VehicleModelSchema = new Schema({
		brand: {
			type: {},
			required: true
		},
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

	VehicleModelSchema.pre('validate', function(next) {
		const VehicleBrand = this.model('VehicleBrand');
		let id = false;
		
		if (typeof this.brand === 'string') {
			id = models.Types.ObjectId.isValid(this.brand) ? this.brand : false;
		} else if (this.brand && this.brand['_id']) {
			id = this.brand._id;
		}

		if (!id) {
			console.log('here');
			next(new vehicleModelError('invalid_brand'));
		} else {
			VehicleBrand.findOne({
				_id: models.Types.ObjectId(id),
				active: true 
			}).exec().then(brand => {
				if (brand) {
					this.brand = brand.toObject();
					next();
				} else {
					console.log('inactive');
					next(new vehicleModelError('invalid_brand'));
				}
			}).catch(next);
		}
	});

	return models.model(modelName, VehicleModelSchema); 
};