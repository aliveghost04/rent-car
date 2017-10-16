// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:3000/api';

axios.interceptors.request.use(function(config) {
	var token = localStorage.getItem('token');
	
	if (token) {
		config.headers['Authorization'] = 'Bearer ' + token;
	}

	return config;
}, function (err) {
	console.error(err);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
