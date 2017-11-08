import List from './List'
import Add from './Add'
import Base from './Base'
import Edit from './Edit'

const routes = {
  path: 'gas-type',
  component: Base,
  children: [{
    path: '',
    name: 'gas-type-list',
    meta: {
      title: 'Tipos de combustible'
    },
    component: List
  }, {
    path: 'add',
    name: 'gas-type-add',
    meta: {
      title: 'Agregar combustible'
    },
    component: Add
  }, {
    path: ':id/edit',
    name: 'gas-type-edit',
    meta: {
      title: 'Editar combustible'
    },
    component: Edit
  }]
}

export default routes
