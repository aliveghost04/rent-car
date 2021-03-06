import List from './List'
import Add from './Add'
import Edit from './Edit'
import Base from './Base'

const routes = {
  path: 'vehicle',
  component: Base,
  children: [{
    path: '',
    name: 'vehicle-list',
    meta: {
      title: 'Vehículos'
    },
    component: List
  }, {
    path: 'add',
    name: 'vehicle-add',
    meta: {
      title: 'Agregar vehículo'
    },
    component: Add
  }, {
    path: ':id/edit',
    name: 'vehicle-edit',
    meta: {
      title: 'Editar vehículo'
    },
    component: Edit
  }]
}

export default routes
