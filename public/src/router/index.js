import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Vehicle from '@/components/Vehicle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next({
            name: 'home'
          });
        } else {
          next();
        }
      }
    },
    {
    	path: '/',
    	name: 'home',
    	component: Home
    },
    {
    	path: '/vehicle',
    	name: 'vehicle-list',
    	component: Vehicle
    },
    {
    	path: '/vehicle/add',
    	name: 'vehicle-add',
    	component: Vehicle
    }
  ]
})
