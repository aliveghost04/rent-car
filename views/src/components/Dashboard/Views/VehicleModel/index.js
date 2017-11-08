import List from './List'
import Add from './Add'
import Base from './Base'
import Edit from './Edit'

const routes = {
  path: 'vehicle-model',
  component: Base,
  children: [{
    path: '',
    name: 'vehicle-model-list',
    meta: {
      title: 'Modelos de vehículos'
    },
    component: List
  }, {
    path: 'add',
    name: 'vehicle-model-add',
    meta: {
      title: 'Agregar modelo de vehículo'
    },
    component: Add
  }, {
    path: ':id/edit',
    name: 'vehicle-model-edit',
    meta: {
      title: 'Editar modelo de vehículo'
    },
    component: Edit
  }]
}

export default routes
