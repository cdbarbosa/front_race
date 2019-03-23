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
  },
  UPDATE_CLIENT_ADDRESS (state, payload) {
    const address = payload[0]
    const index = payload[1]
    state.clients[index].user.address = address
  }
}

const actions = {
  getClients ({ commit }, that) {
    return new Promise((resolve, reject) => {
      that.$http.get(that.$api({ target: 'clients' }), {
        headers: header()
      }).then(response => {
        resolve(response.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  setClients ({ commit }, clients) {
    commit('SET_CLIENTS', clients)
  },
  changeClients ({ commit }, clients) {
    commit('SET_CLIENTS', clients)
  },
  updateClient ({ commit }, payload) {
    commit('UPDATE_CLIENT', payload)
  },
  updateClientAddress ({ commit }, payload) {
    commit('UPDATE_CLIENT_ADDRESS', payload)
  }
}

export default {
  state, getters, mutations, actions
}
