import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'
import Clients from './views/Dashboard/Clients.vue'
import Overview from './views/Dashboard/Overview.vue'
import Rh from './views/Dashboard/Rh.vue'

import Service from './views/Dashboard/Services.vue'
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
          path: 'rh/:rh_id',
          name: 'rh',
          component: Rh
        },
        {
          path: 'client/:client_id',
          name: 'client',
          component: Clients
        },
        {
          path: 'service/:service_id',
          name: 'service',
          component: Service
        },
        {
          path: 'service/:service_id/receipt/:receipt_id?',
          name: 'receipt',
          component: Receipt
        },
        {
          path: 'service/:service_id/details/:rh_id?',
          name: 'vueDetails',
          component: Details
        }
      ]
    }
  ]
})
