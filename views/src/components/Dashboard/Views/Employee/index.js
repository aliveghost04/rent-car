import List from './List'
import Add from './Add'
import Base from './Base'
import Edit from './Edit'

const routes = {
  path: 'employee',
  component: Base,
  children: [{
    path: '',
    name: 'employee-list',
    meta: {
      title: 'Empleados'
    },
    component: List
  }, {
    path: 'add',
    name: 'employee-add',
    meta: {
      title: 'Agregar empleado'
    },
    component: Add
  }, {
    path: ':id/edit',
    name: 'employee-edit',
    meta: {
      title: 'Editar empleado'
    },
    component: Edit
  }]
}

export default routes
