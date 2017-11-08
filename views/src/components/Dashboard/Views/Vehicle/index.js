import List from './List'
import Add from './Add'
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
  }]
}

export default routes
