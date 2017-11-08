import http from './http'

const path = '/gas-type'

export default {
  getAll: (params) => {
    return http.get(path, {
      params
    }).then(res => res.data)
  }
}
