import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'
import Overview from './views/Dashboard/Overview.vue'

import Clients from './views/Dashboard/Clients.vue'
import Rh from './views/Dashboard/Rh.vue'
import Services from './views/Dashboard/Services.vue'
import ShowServices from './views/Dashboard/services/showServices.vue'

import Details from './views/Dashboard/services/details.vue'
import Receipt from './views/Dashboard/services/Receipt.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
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
          component: Rh
        },
        {
          path: 'client/:client_id?',
          name: 'client',
          component: Clients
        },
        {
          path: 'service/:service_id?',
          component: Services,
          children: [
            {
              path: '',
              name: 'service',
              component: ShowServices
            },
            {
              path: 'receipt',
              name: 'serviceReceipts',
              component: Receipt
            },
            {
              path: 'details',
              name: 'serviceDetails',
              component: Details
            }
          ]
        }
      ]
    }
  ]
})
