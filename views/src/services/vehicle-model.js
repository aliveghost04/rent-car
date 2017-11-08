import http from './http'

const path = '/vehicle-model'

export default {
  getAll: (params) => {
    return http.get(path, {
      params
    }).then(res => res.data)
  }
}
