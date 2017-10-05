'use strict';
const modelName = 'User';

module.exports = models => {

	const Schema = models.Schema;

	let UserSchema = new Schema({
		name: {
			type: String,
			required: true
		},
		cedula: {
			type: String,
			required: true
		},
		journey: {
			type: String,
			enum: ['morning', 'evening', 'nocturnal'],
			required: true
		},
		comission: {
			type: Number,
			required: true
		},
		admissionDate: {
			type: Date,
			require: true
		},
		level: {
			type: String,
			enum: ['admin', 'employee'],
			required: true,
			default: 'employee'
		},
		status: {
			type: String,
			enum: ['active', 'inactive', 'blocked'],
			required: true,
			default: 'inactive'
		},
		blocked: {
			reason: {
				type: String,
				required: function () {
					return this.status === 'blocked';
				}
			},
			date: {
				type: Date,
				required: function () {
					return this.status === 'blocked';
				}
			}
		}
	});

	return models.model(modelName, UserSchema);
};