import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Dashboard from './views/Dashboard.vue'
import Clients from './views/Dashboard/Clients.vue'
import Overview from './views/Dashboard/Overview.vue'
import Service from './views/Dashboard/Services.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    {
      path: '/',
      component: Dashboard,
      children: [
        {
          path: '',
          name: 'overview',
          component: Overview
        },
        {
          path: 'clients',
          name: 'clients',
          component: Clients
        },
        {
          path: 'services',
          name: 'service',
          component: Service
        }
      ]
    }
  ]
})
