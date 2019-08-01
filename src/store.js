import Vue from 'vue'
import Vuex from 'vuex'
import userStore from './stores/userStore'
import clientStore from './stores/clientStore'
import rhStore from './stores/rhStore'
import serviceStore from './stores/serviceStore'
import appStore from './stores/appStore'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    userStore,
    clientStore,
    rhStore,
    serviceStore,
    appStore
  },
  strict: debug
})
