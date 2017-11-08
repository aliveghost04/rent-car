import http from './http'

const path = '/vehicle-type'

export default {
  getAll: (params) => {
    return http.get(path, {
      params
    }).then(res => res.data)
  }
}
