import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import BrandView from '@/components/BrandView'
import BrandList from '@/components/BrandList'
import BrandEdit from '@/components/BrandEdit'
import BrandCreate from '@/components/BrandCreate'

Vue.use(Router)

export default new Router({
  routes: [{
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
  }, {
  	path: '/',
  	name: 'home',
  	component: Home
  }, {
    path: '/brand/create',
    name: 'brand-create',
    component: BrandCreate
  }, {
    path: '/brand',
    name: 'brand-list',
    component: BrandList
  }, {
    path: '/brand/:id',
    name: 'brand-view',
    component: BrandView,
    children: [
    ]
  }, {
    path: '/brand/:id/edit',
    name: 'brand-edit',
    component: BrandEdit
  }, {
  	path: '/vehicle/:id?',
  	name: 'vehicle',
  	component: BrandView/*,
    children: [
      {
        path: '/vehicle/add',
        name: 'vehicle-add',
        component: Vehicle
      }
    ]*/
  }]
})
