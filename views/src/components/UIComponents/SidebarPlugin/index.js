import Sidebar from './SideBar.vue'

const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [
    {
      name: 'Dashboard',
      icon: 'ti-panel',
      path: '/'
    },
    {
      name: 'Clientes',
      icon: 'ti-user',
      path: '/customer'
    },
    {
      name: 'Empleados',
      icon: 'ti-archive',
      path: '/employee'
    },
    {
      name: 'Vehículos',
      icon: 'ti-car',
      path: '/vehicle'
    },
    {
      name: 'Tipos de vehículos',
      icon: 'ti-image',
      path: '/vehicle-type'
    },
    {
      name: 'Marca de vehículos',
      icon: 'ti-direction',
      path: '/vehicle-brand'
    },
    {
      name: 'Modelo de vehículos',
      icon: 'ti-direction-alt',
      path: '/vehicle-model'
    },
    {
      name: 'Tipos de combustible',
      icon: 'ti-paint-bucket',
      path: '/gas-type'
    },
    {
      name: 'Rentas',
      icon: 'ti-money',
      path: '/rent'
    },
    {
      name: 'Inspección',
      icon: 'ti-eye',
      path: '/inspection'
    }
    // {
    //   name: 'Typography',
    //   icon: 'ti-text',
    //   path: '/typography'
    // },
    // ,
    // {
    //   name: 'Icons',
    //   icon: 'ti-pencil-alt2',
    //   path: '/icons'
    // },
    // {
    //   name: 'Maps',
    //   icon: 'ti-map',
    //   path: '/maps'
    // },
    // {
    //   name: 'Notifications',
    //   icon: 'ti-bell',
    //   path: '/notifications'
    // }
  ],
  displaySidebar (value) {
    this.showSidebar = value
  }
}

const SidebarPlugin = {

  install (Vue) {
    Vue.mixin({
      data () {
        return {
          sidebarStore: SidebarStore
        }
      }
    })

    Object.defineProperty(Vue.prototype, '$sidebar', {
      get () {
        return this.$root.sidebarStore
      }
    })
    Vue.component('side-bar', Sidebar)
  }
}

export default SidebarPlugin
