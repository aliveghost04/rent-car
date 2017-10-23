// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:3000/api';

var storedData = {
	token: () => localStorage.getItem('token')
};

storedData['user'] = () => {
	let data;
	if (localStorage.getItem('user')) {
		try {
			data = JSON.parse(localStorage.getItem('user')); 
		} catch (e) {
			console.error(e);
			data = false;
		}
	} else {
		data = false;
	}
	return data;
};

axios.interceptors.request.use(function(config) {
	var token = storedData.token();
	
	if (token) {
		config.headers['Authorization'] = 'Bearer ' + token;
	}

	return config;
}, function (err) {
	console.error(err);
});

axios.interceptors.response.use(function (config) {
	return config;
}, error => {
	if (error.response.status === 401) {
		console.log(this);
	}
	console.error(error.response);
	return Promise.reject(error)
});

Vue.prototype.$authorized = () => storedData.token() && storedData.user() ? true : false;
Vue.prototype.$user = () => storedData.user() ? storedData.user() : false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
