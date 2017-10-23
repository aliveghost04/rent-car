import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Brand from '@/components/Brand'
import Model from '@/components/Model'
import Vehicle from '@/components/Vehicle'
import GasType from '@/components/GasType'
import Type from '@/components/Type'

Vue.use(Router)

let routes = {
  routes: [{
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/',
    name: 'home',
    component: Home
  }, 
    Brand, 
    Vehicle, 
    Model,
    GasType,
    Type
  ]
};
console.log(routes);
let router = new Router(routes);


router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    if (router.app.$authorized()) {
      next({
        name: 'home'
      });
    } else {
      next();
    }
  } else {
    if (router.app.$authorized()) {
      next();
    } else {
      next({
        name: 'login'
      });
    }
  }
});

export default router;