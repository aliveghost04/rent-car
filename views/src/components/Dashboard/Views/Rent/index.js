import List from './List'
import Add from './Add'
import Base from './Base'
import Return from './Return'

const routes = {
  path: 'rent',
  component: Base,
  children: [{
    path: '',
    name: 'rent-list',
    meta: {
      title: 'Rentas'
    },
    component: List
  }, {
    path: ':id/add',
    name: 'rent-add',
    meta: {
      title: 'Rentar vehículo'
    },
    component: Add
  }, {
    path: ':id/return',
    name: 'rent-return',
    meta: {
      title: 'Devolución de vehículo'
    },
    component: Return
  }]
}

export default routes
