import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Buefy from 'buefy'
import VueTheMask from 'vue-the-mask'
import VeeValidate from 'vee-validate'
import money from 'v-money'
import Toasted from 'vue-toasted'
import Datepicker from 'vuejs-datepicker'
import VueProgressBar from 'vue-progressbar'
import VueParticles from 'vue-particles'
import moment from 'moment'

import { api } from './config'

Vue.prototype.$api = api
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Buefy, {
  defaultIconPack: 'fas',
  defaultDateFormatter: date => date.toLocaleDateString('pt-BR'),
  // defaultDateCreator: moment(),
  defaultDateParser: date => {
    const m = moment(date, 'DD/MM/YYYY')
    return m.isValid() ? m.toDate() : null
  },
  defaultDayNames: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
  defaultMonthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  defaultDatepickerYearsRange: [-100, 100]
})
Vue.use(Datepicker)
Vue.use(VueTheMask)
Vue.use(VeeValidate)
Vue.use(money, {
  precision: 2,
  prefix: 'R$ '
})
Vue.use(Toasted)
Vue.use(VueParticles)
Vue.use(VueProgressBar, {
  color: '#009688',
  failedColor: '#f44366',
  thickness: '4px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
