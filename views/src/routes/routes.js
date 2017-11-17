import Vue from 'vue'
import VueRouter from 'vue-router'
import authenticationService from 'src/services/authentication'
import vm from 'main'

import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'
import Login from '../components/GeneralViews/Login'

// Admin pages
import Overview from 'src/components/Dashboard/Views/Overview.vue'
import UserProfile from 'src/components/Dashboard/Views/UserProfile.vue'
import Notifications from 'src/components/Dashboard/Views/Notifications.vue'
import Icons from 'src/components/Dashboard/Views/Icons.vue'
import Maps from 'src/components/Dashboard/Views/Maps.vue'
import Typography from 'src/components/Dashboard/Views/Typography.vue'
import TableList from 'src/components/Dashboard/Views/TableList.vue'

// Administratives pages
import Vehicle from 'src/components/Dashboard/Views/Vehicle'
import Customer from 'src/components/Dashboard/Views/Customer'
import Employee from 'src/components/Dashboard/Views/Employee'
import GasType from 'src/components/Dashboard/Views/GasType'
import VehicleBrand from 'src/components/Dashboard/Views/VehicleBrand'
import VehicleModel from 'src/components/Dashboard/Views/VehicleModel'
import Rent from 'src/components/Dashboard/Views/Rent'
import Inspection from 'src/components/Dashboard/Views/Inspection'
import VehicleType from 'src/components/Dashboard/Views/VehicleType'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: Overview
      },
      {
        path: 'stats',
        name: 'stats',
        component: UserProfile
      },
      {
        path: 'notifications',
        name: 'notifications',
        component: Notifications
      },
      {
        path: 'icons',
        name: 'icons',
        component: Icons
      },
      {
        path: 'maps',
        name: 'maps',
        component: Maps
      },
      {
        path: 'typography',
        name: 'typography',
        component: Typography
      },
      {
        path: 'table-list',
        name: 'table-list',
        component: TableList
      },
      Vehicle,
      Customer,
      Employee,
      GasType,
      VehicleBrand,
      VehicleModel,
      Rent,
      Inspection,
      VehicleType
    ]
  },
  {
    path: '*',
    component: NotFound
  }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

// Loading library
Vue.use(VueRouter)

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    if (authenticationService.isAuthenticated()) {
      vm.$notifications.notify({
        message: 'Usted ya se encuentra identificado',
        verticalAlign: 'bottom',
        horizontalAlign: 'right'
      })

      next({
        name: 'home'
      })
    } else {
      next()
    }
  } else {
    if (authenticationService.isAuthenticated()) {
      next()
    } else {
      next({
        name: 'login'
      })
    }
  }
})
export default router
