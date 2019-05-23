import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'
import Overview from './views/Dashboard/Overview.vue'
import Clients from './views/Dashboard/Clients.vue'
import Rhs from './views/Dashboard/Rhs.vue'
import Services from './views/Dashboard/Services.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      component: Dashboard,
      children: [
        {
          path: '',
          name: 'overview',
          component: Overview
        },
        {
          path: 'rh/:rh_id?',
          name: 'rh',
          component: Rhs
        },
        {
          path: 'client/:client_id?',
          name: 'client',
          component: Clients
        },
        {
          path: 'service/:service_id?/',
          name: 'service',
          component: Services,
          children: [
            // {
            //   path: '',
            //   name: 'service',
            //   component: ShowServices
            // },
            // {
            //   path: 'receipt',
            //   name: 'serviceReceipts',
            //   component: receipt
            // },
            // {
            //   path: 'details',
            //   name: 'serviceDetails',
            //   component: Details
            // }
          ]
        }
      ]
    }
  ]
})
