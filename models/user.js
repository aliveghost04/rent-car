'use strict';
const modelName = 'User';
const userError = require('../libs/error')('user');

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
		email: {
			type: String,
			required: true
		},
		password: {
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
	}, {
		timestamps: true
	});

	UserSchema.statics.login = function(cedula, password) {
		return this.findOne({
			$or: [{
				cedula,
			}, {
				email: cedula
			}]
		}).exec().then(user => {
			if (user) {
				if (user.hashPassword(password) === user.password) {
					return user;
				} else {
					return Promise.reject(new userError('NOT_FOUND'));
				}
			} else {
				return Promise.reject(new userError('NOT_FOUND'));
			}
		});
	};

	UserSchema.methods.hashPassword = function (password) {
		return require('crypto')
			.createHash('sha512')
			.update(this._id.toString())
			.update(password)
			.digest('hex');
	};

	UserSchema.pre('findOneAndUpdate', function () {
		console.log('update', this);
		process.exit();
	})

	UserSchema.pre('save', function (next) {
		if (this.isNew) {
			console.log(this.isNew, 'is new');
			process.exit();
			this.password = this.hashPassword(this.password);
		} else if (this.isModified('password')) {
			console.log('here', this.hashPassword);
			process.exit();
		}
	});

	return models.model(modelName, UserSchema);
};