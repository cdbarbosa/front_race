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
  },
  UPDATE_CLIENT (state, payload) {
    const client = payload[0] // the new object
    const index = payload[1] // the index where i shoud but it
    state.clients.splice(index, 1, client)
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
    commit('UPDATE_CLIENT', payload)
  }
}

export default {
  state, getters, mutations, actions
}
