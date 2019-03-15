import { header } from '../config/index.js'

const state = {
  clients: []
}

const getters = {
  clients: () => state.clients
}

const mutations = {
  SET_CLIENTS (state, clients) {
    state.clients = clients
  }
}

const actions = {
  getClients ({ commit }, that) {
    that.$http.get(that.$api({ target: 'clients' }), {
      headers: header()
    }).then(response => {
      commit('SET_CLIENTS', response.data)
    })
  },
  changeClients ({ commit }, clients) {
    commit('SET_CLIENTS', clients)
  },
  updateClient ({ commit }, payload) {
    let that = payload[0]
    let data = payload[1]
    that.$http.put(that.$api({ target: 'client' }), data, {
      headers: header()
    }).then(response => {
      commit('SET_CLIENTS', response.data)
    })
  }
}

export default {
  state, getters, mutations, actions
}
