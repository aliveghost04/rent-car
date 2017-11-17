'use strict'

import http from './http'
const path = '/vehicle'

const vehicleStatus = {
  active: 'Activo',
  rented: 'Rentado',
  inactive: 'Inhabilitado',
  checking: 'En revisión'
}

export default {
  getAll: (params, formated) => {
    return http
      .get(path, {
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
              statusText: vehicleStatus[vehicle.status] || '',
              status: vehicle.status
            }
          })
        } else {
          return res.data
        }
      })
  },
  get: (id, params) => {
    return http
      .get(`${path}/${id}`, {
        params: params
      })
      .then(res => res.data)
  },
  update: data => {
    let savedStatus = data.status

    if (data.active) {
      data.status = 'active'
      delete data.active
    } else if (data.active === false) {
      data.status = 'inactive'
      delete data.active
    }
    return http
      .put(`${path}/${data._id}`, data)
      .then(res => res.data)
      .catch(err => {
        if (data.status === 'active') {
          data.active = true
          data.status = savedStatus
        } else if (data.status === 'inactive') {
          data.active = false
          data.status = savedStatus
        }

        return Promise.reject(err)
      })
  },
  delete: id => {
    return http
      .delete(`${path}/${id}`)
      .then(res => res.data)
  },
  save: data => {
    if (data.active) {
      data.status = 'active'
    } else {
      data.status = 'inactive'
    }
    delete data.active

    return http
      .post(path, data)
      .then(res => res.data)
      .catch(err => {
        if (data.status === 'active') {
          data.active = true
        } else {
          data.active = false
        }
        delete data.status

        return Promise.reject(err)
      })
  }
}
