import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'
import Clients from './views/Dashboard/Clients.vue'
import Overview from './views/Dashboard/Overview.vue'
import Rh from './views/Dashboard/Rh.vue'
import Service from './views/Dashboard/Services.vue'
import Details from './views/Dashboard/services/Details.vue'
import Receive from './views/Dashboard/services/Receive.vue'
import Show from './views/Dashboard/client/show.vue'
import Create from './views/Dashboard/client/create.vue'
import RhShow from './views/Dashboard/rh/show.vue'
import RhCreate from './views/Dashboard/rh/create.vue'
import ServiceShow from './views/Dashboard/services/show.vue'
import ServiceCreate from './views/Dashboard/services/create.vue'

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
              path: 'show',
              name: 'show',
              component: Show
            },
            {
              path: 'create',
              name: 'create',
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
              name: 'serviceShow',
              component: ServiceShow
            },
            {
              path: 'create/:code',
              name: 'serviceCreate',
              component: ServiceCreate
            },
            {
              path: 'details',
              name: 'details',
              component: Details
            },
            {
              path: 'receive',
              name: 'receive',
              component: Receive
            }
          ]
        },
        {
          path: 'rh',
          component: Rh,
          children: [
            {
              path: 'show',
              name: 'rhShow',
              component: RhShow
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
