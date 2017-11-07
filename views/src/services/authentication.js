'use strict'

import http from './http'

const getToken = () => localStorage.getItem('token')
const getUser = () => {
  let data
  if (localStorage.getItem('user')) {
    try {
      data = JSON.parse(localStorage.getItem('user'))
    } catch (e) {
      console.error(e)
      data = false
    }
  } else {
    data = false
  }
  return data
}

export default {
  login: data => {
    return http.post('/login', data).then(res => {
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      return res.data
    })
  },
  isAuthenticated: () => getToken() && getUser(),
  getUser,
  getToken
}
