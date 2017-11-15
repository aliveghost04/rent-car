'use strict';

module.exports = {
	NOT_FOUND: {
		message: 'Inspección no encontrada',
		status: 404
	},
  INVALID_VEHICLE: {
    message: 'El vehículo enviado es inválido',
    status: 400
  },
  ERROR: {
    message: 'Ha ocurrido un error, por favor intente más tarde',
    status: 500
  }
};