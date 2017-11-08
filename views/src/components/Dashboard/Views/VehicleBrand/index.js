import List from './List'
import Add from './Add'
import Base from './Base'
import Edit from './Edit'

const routes = {
  path: 'vehicle-brand',
  component: Base,
  children: [{
    path: '',
    name: 'vehicle-brand-list',
    meta: {
      title: 'Marcas de vehículos'
    },
    component: List
  }, {
    path: 'add',
    name: 'vehicle-brand-add',
    meta: {
      title: 'Agregar marca de vehículo'
    },
    component: Add
  }, {
    path: ':id/edit',
    name: 'vehicle-brand-edit',
    meta: {
      title: 'Editar marca de vehículo'
    },
    component: Edit
  }]
}

export default routes
