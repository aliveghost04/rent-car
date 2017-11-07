'use strict'

import http from './http'

const vehicleStatus = {
  active: 'Activo',
  rented: 'Rentado',
  inactive: 'Inhabilitado',
  checking: 'En revisión'
}

export default {
  getAll: (params, formated) => {
    return http
      .get('/vehicle', {
        params
      })
      .then(res => {
        if (formated) {
          return res.data.map(vehicle => {
            return {
              id: vehicle._id,
              brand: vehicle.brand.description || '',
              model: vehicle.model.description || '',
              gasType: vehicle.gasType.description || '',
              type: vehicle.vehicleType.description || '',
              image: vehicle.images.unshift(),
              status: vehicleStatus[vehicle.status] || ''
            }
          })
        } else {
          return res.data
        }
      })
  },
  delete: id => {
    return http
      .delete(`/vehicle/${id}`)
      .then(res => res.data)
  }
}
