export const state = () => ({
  drawerImage: false,
  mini: false,
  name: '',
  breadcrumbItems: [{}],

  menuItems: [],
  dark: false,
  drawer: {
    image: 0,
    gradient: 0,
    mini: false,
  },
  gradients: [
    'rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)',
    'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)',
    'rgba(244, 67, 54, .8), rgba(244, 67, 54, .8)',
  ],
  images: [
    'https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg',
    'https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-2.jpg',
    'https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-3.jpg',
    'https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-4.jpg',
  ],
  notifications: Array,
  rtl: false,
})

export const mutations = {
  toggleMini(state) {
    state.mini = !state.mini
  },
  pushBreadcrumbItem(state, item) {
    if (item.id >= state.breadcrumbItems.length)
      state.breadcrumbItems.push(item)
  },
  setMenuItems(state, items) {
    state.menuItems = items
  },
  setName(state, name) {
    state.name = name
  },
}
