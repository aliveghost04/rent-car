import http from './http'
import moment from 'moment'

const path = '/rent'

export default {
  getAll: (params, formated) => {
    return http.get(path, {
      params
    }).then(res => {
      if (formated) {
        return res
          .data
          .map(rent => {
            return {
              _id: rent._id,
              customer: rent.customer.name,
              vehicle: `${rent.vehicle.brand.description} ${rent.vehicle.model.description}`,
              rentDate: moment(rent.rentDate).format('LL'),
              returnDate: moment(rent.returnDate).format('LL')
            }
          })
      } else {
        return res.data
      }
    })
  },
  get: id => {
    return http
      .get(`${path}/${id}`)
      .then(res => res.data)
  },
  getDaysDelayAmount: id => {
    return http
      .get(`${path}/${id}/calculate-days-delay`)
      .then(res => res.data)
  },
  save: data => {
    return http
      .post(path, data)
      .then(res => res.data)
  },
  update: data => {
    return http
      .put(`${path}/${data._id}`, data)
      .then(res => res.data)
  },
  delete: id => {
    return http
      .delete(`${path}/${id}`)
      .then(res => res.data)
  }
}
