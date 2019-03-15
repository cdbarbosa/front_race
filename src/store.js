import Vue from 'vue'
import Vuex from 'vuex'
import userStore from './stores/userStore'
import clientStore from './stores/clientStore'
import rhStore from './stores/rhStore'
import serviceStore from './stores/serviceStore'
import addressStore from './stores/addressStore'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    userStore,
    clientStore,
    rhStore,
    serviceStore,
    addressStore
  },
  strict: debug
})
