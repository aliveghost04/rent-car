import Vue from 'vue'
import vClickOutside from 'v-click-outside'

// Plugins
import GlobalComponents from './gloablComponents'
import Notifications from './components/UIComponents/NotificationPlugin'
import SideBar from './components/UIComponents/SidebarPlugin'
import App from './App'
import jspdf from 'jspdf'

// router setup
import routes from './routes/routes'

// library imports
import Chartist from 'chartist'
import swal from 'sweetalert/dist/sweetalert.min'
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/sass/paper-dashboard.scss'
import 'es6-promise/auto'

// plugin setup
Vue.use(GlobalComponents)
Vue.use(vClickOutside)
Vue.use(Notifications)
Vue.use(SideBar)

// global library setup
Object.defineProperty(Vue.prototype, '$notify', {
  get () {
    return function (message, type = 'danger', extraConfig) {
      this.$notifications.notify(Object.assign({
        message,
        type,
        verticalAlign: 'bottom',
        horizontalAlign: 'right'
      }, extraConfig))
    }
  }
})

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

Object.defineProperty(Vue.prototype, '$moment', {
  get () {
    return moment
  }
})

Object.defineProperty(Vue.prototype, '$jspdf', {
  get () {
    return jspdf
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
