import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Buefy from 'buefy'
import VueTheMask from 'vue-the-mask'

import { api } from './config'

Vue.prototype.$api = api
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Buefy)
Vue.use(VueTheMask)

new Vue({
  router,
  store,
  beforeMount () {
  },
  render: h => h(App)
}).$mount('#app')
