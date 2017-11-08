import http from './http'

const path = '/customer'
const customerTypes = {
  person: 'Persona',
  entity: 'Empresa'
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
            el.type = customerTypes[el.personType]
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
