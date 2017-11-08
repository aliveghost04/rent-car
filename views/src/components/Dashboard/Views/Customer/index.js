import List from './List'
import Add from './Add'
import Base from './Base'
import Edit from './Edit'

const routes = {
  path: 'customer',
  component: Base,
  children: [{
    path: '',
    name: 'customer-list',
    meta: {
      title: 'Clientes'
    },
    component: List
  }, {
    path: 'add',
    name: 'customer-add',
    meta: {
      title: 'Agregar cliente'
    },
    component: Add
  }, {
    path: ':id/edit',
    name: 'customer-edit',
    meta: {
      title: 'Editar cliente'
    },
    component: Edit
  }]
}

export default routes
