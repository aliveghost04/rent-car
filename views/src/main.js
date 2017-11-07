import Vue from 'vue'
import vClickOutside from 'v-click-outside'

// Plugins
import GlobalComponents from './gloablComponents'
import Notifications from './components/UIComponents/NotificationPlugin'
import SideBar from './components/UIComponents/SidebarPlugin'
import App from './App'

// router setup
import routes from './routes/routes'

// library imports
import Chartist from 'chartist'
import swal from 'sweetalert/dist/sweetalert.min'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/sass/paper-dashboard.scss'
import 'es6-promise/auto'

// plugin setup
Vue.use(GlobalComponents)
Vue.use(vClickOutside)
Vue.use(Notifications)
Vue.use(SideBar)

// global library setup
Object.defineProperty(Vue.prototype, '$Chartist', {
  get () {
    return this.$root.Chartist
  }
})

Object.defineProperty(Vue.prototype, '$swal', {
  get () {
    return swal
  }
})

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  render: h => h(App),
  router: routes,
  data: {
    Chartist: Chartist
  }
})