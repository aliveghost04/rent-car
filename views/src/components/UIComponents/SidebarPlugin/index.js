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
      name: 'Vehículos',
      icon: 'ti-car',
      path: '/vehicle'
    },
    {
      name: 'Clientes',
      icon: 'ti-user',
      path: '/customer'
    },
    {
      name: 'Typography',
      icon: 'ti-text',
      path: '/typography'
    },
    {
      name: 'Icons',
      icon: 'ti-pencil-alt2',
      path: '/icons'
    },
    {
      name: 'Maps',
      icon: 'ti-map',
      path: '/maps'
    },
    {
      name: 'Notifications',
      icon: 'ti-bell',
      path: '/notifications'
    }
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
