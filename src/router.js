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
          path: 'clients',
          name: 'clients',
          component: Clients
        },
        {
          path: 'services',
          component: Service,
          children: [
            {
              path: '/',
              name: 'services',
              component: Service
            },
            {
              path: 'receipt/:id',
              name: 'receipt',
              component: Receipt
            },
            {
              path: 'details/:id',
              name: 'vueDetails',
              component: Details
            }
          ]
        },
        {
          path: 'rh',
          name: 'rh',
          component: Rh
        }
      ]
    }
  ]
})
