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
  },
  changeServices ({ commit }, services) {
    commit('SET_SERVICES', services)
  },
  updateService ({ commit }, payload) {
    let that = payload[0]
    let data = payload[1]
    that.$http.put(that.$api({ target: 'service' }), data, {
      headers: header()
    }).then(response => {
      commit('SET_SERVICES', response.data)
    })
  }
}

export default {
  state, getters, mutations, actions
}
