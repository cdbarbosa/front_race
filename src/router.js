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
import ServiceCreate from './views/Dashboard/services/create.vue'
import ShowServices from './views/Dashboard/services/show.vue'

import ShowClients from './views/Dashboard/client/show.vue'
import Create from './views/Dashboard/client/create.vue'
import ShowRhs from './views/Dashboard/rh/show.vue'
import RhCreate from './views/Dashboard/rh/create.vue'

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
          component: Clients,
          children: [
            {
              path: '',
              name: 'clients',
              component: ShowClients
            },
            {
              path: 'create',
              name: 'createClient',
              component: Create
            }
          ]
        },
        {
          path: 'services',
          component: Service,
          children: [
            {
              path: 'show',
              name: 'showServices',
              component: ShowServices
            },
            {
              path: 'create/:code',
              name: 'serviceCreate',
              component: ServiceCreate
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
          component: Rh,
          children: [
            {
              path: 'show',
              name: 'showRhs',
              component: ShowRhs
            },
            {
              path: 'create',
              name: 'rhCreate',
              component: RhCreate
            }
          ]
        }
      ]
    }
  ]
})
