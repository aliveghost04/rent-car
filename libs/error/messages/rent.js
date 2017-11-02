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
	INVALID_RETURN_DATE: {
		message: 'La fecha de retorno es menor a la fecha de renta',
		status: 400
	}
};