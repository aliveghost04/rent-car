import http from './http'

const path = '/vehicle-model'

export default {
  getAll: (params) => {
    return http.get(path, {
      params
    }).then(res => res.data)
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
