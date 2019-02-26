import { header } from '../config/index.js'

const state = {
  services: []
}

const getters = {
  services: () => state.services
}

const mutations = {
  SET_SERVICES (state, services) {
    state.services = services
  }
}

const actions = {
  getServices ({ commit }, that) {
    that.$http.get(that.$api({ target: 'services' }), {
      headers: header()
    }).then(response => {
      commit('SET_SERVICES', response.data)
    })
  }
}

export default {
  state, getters, mutations, actions
}
