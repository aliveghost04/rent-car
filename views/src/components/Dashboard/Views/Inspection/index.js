import List from './List'
import Add from './Add'
import Base from './Base'
import Return from './Return'

const routes = {
  path: 'inspection',
  component: Base,
  children: [{
    path: '',
    name: 'inspection-list',
    meta: {
      title: 'Listado de inspecciones'
    },
    component: List
  }, {
    path: ':id/add',
    name: 'inspection-add',
    meta: {
      title: 'Realizar inspección (Previa renta)'
    },
    component: Add
  }, {
    path: ':id/return',
    name: 'inspection-return',
    meta: {
      title: 'Realizar inspección (Post renta)'
    },
    component: Return
  }]
}

export default routes
