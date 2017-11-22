'use strict';

module.exports = {
	NOT_FOUND: {
		message: 'El recurso solicitado no fue encuentrado',
		status: 404
	},
	ERROR: {
		message: 'Ha ocurrido un error en el sistema, por favor intenta más tarde o contacte con el administrador',
		status: 500
	},
  VALIDATION: {
    status: 409
  }
};