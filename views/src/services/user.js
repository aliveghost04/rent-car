import http from './http'

const path = '/user'
const journeys = {
  morning: 'Mañana',
  evening: 'Tarde',
  nocturnal: 'Noche'
}

export default {
  getAll: (params, formated) => {
    return http
      .get(path, {
        params
      })
      .then(res => {
        if (formated) {
          return res.data.map(el => {
            el.id = el._id
            el.journeyText = journeys[el.journey]
            return el
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
