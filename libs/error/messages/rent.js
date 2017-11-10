'use strict';

module.exports = {
	NO_INSPECTION: {
		message: 'El parámetro \'Inspección\' no fue enviado',
		status: 400
	},
	INVALID_INSPECTION: {
		message: 'La \'Inspección\' enviada no es válida',
		status: 400
	},
	INVALID_USER: {
		message: 'El usuario especificado es inválido',
		status: 400
	},
	INVALID_VEHICLE: {
		message: 'El vehículo especificado no es válido',
		status: 400
	},
	INVALID_CUSTOMER: {
		message: 'El cliente especificado no es válido',
		status: 400
	},
	INVALID_RETURN_DATE: {
		message: 'La fecha de retorno es menor a la fecha de renta',
		status: 400
	},
	METHOD_NOT_ALLOWED: {
		message: 'Las rentas no pueden actualizarse ni eliminarse',
		status: 405
	}
};