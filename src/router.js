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
          name: 'service',
          component: Service
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
