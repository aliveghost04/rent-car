import http from './http'

const path = '/vehicle-brand'

export default {
  getAll: (params) => {
    return http.get(path, {
      params
    }).then(res => res.data)
  }
}
