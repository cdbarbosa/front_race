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
  },
  UPDATE_SERVICE (state, payload) {
    const service = payload[0]
    const index = payload[1]
    state.services.splice(index, 1, service)
  }
}

const actions = {
  getServices ({ commit }, that) {
    that.$http.get(that.$api({ target: 'services' }), {
      headers: header()
    }).then(response => {
      commit('SET_SERVICES', response.data)
    })
  },
  changeServices ({ commit }, services) {
    commit('SET_SERVICES', services)
  },
  updateService ({ commit }, payload) {
    commit('UPDATE_SERVICE', payload)
  }
}

export default {
  state, getters, mutations, actions
}
