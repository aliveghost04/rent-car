import http from 'axios/dist/axios.min'
import authenticationService from './authentication'
import vm from 'main'

http.defaults.baseURL = 'http://localhost:3000/api'

http.interceptors.request.use(function (config) {
  var token = authenticationService.getToken()

  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }

  return config
}, function (err) {
  console.error(err)
})

http.interceptors.response.use(function (config) {
  return config
}, function (error) {
  let message = error.response
    ? error.response.data['message']
    : undefined

  if (!message) {
    message = 'Ha ocurrido un error, por favor intente más tarde'
  }

  vm.$notifications.notify({
    message,
    type: 'danger',
    timeout: 5000,
    verticalAlign: 'bottom',
    horizontalAlign: 'right'
  })

  return Promise.reject(error)
})

export default http
