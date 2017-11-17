import List from './List'
import Add from './Add'
import Base from './Base'
import Edit from './Edit'

const routes = {
  path: 'vehicle-type',
  component: Base,
  children: [{
    path: '',
    name: 'vehicle-type-list',
    meta: {
      title: 'Tipos de vehículos'
    },
    component: List
  }, {
    path: 'add',
    name: 'vehicle-type-add',
    meta: {
      title: 'Agregar tipo de vehículo'
    },
    component: Add
  }, {
    path: ':id/edit',
    name: 'vehicle-type-edit',
    meta: {
      title: 'Editar tipo de vehículo'
    },
    component: Edit
  }]
}

export default routes
