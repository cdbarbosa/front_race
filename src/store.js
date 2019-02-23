import Vue from 'vue'
import Vuex from 'vuex'
import userStore from './stores/userStore'
import clientStore from './stores/clientStore'
import rhsStore from './stores/rhsStore'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    userStore,
    clientStore,
    rhsStore
  },
  strict: debug
})
