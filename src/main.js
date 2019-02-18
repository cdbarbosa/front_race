import Vue from 'vue'
// import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Buefy from 'buefy'

// Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Buefy, {
  defaultIconPack: 'fa'
})

new Vue({
  router,
  store,
  beforeMount () {
  },
  render: h => h(App)
}).$mount('#app')
