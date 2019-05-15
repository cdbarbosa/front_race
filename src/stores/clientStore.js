import { header } from '../config/index.js'

const state = {
  clients: [],
  clientSelected: undefined
}

const getters = {
  clients: () => state.clients,
  clientSelected: () => state.clientSelected
}

const mutations = {
  SET_CLIENTS (state, clients) {
    state.clients = clients
  },
  SET_CLIENT_SELECTED (state, client) {
    state.clientSelected = JSON.parse(JSON.stringify(client))
  },
  UPDATE_CLIENT_SELECTED (state, payload) {
    const label = payload[0]
    const target = payload[1]
    const value = payload[2]
    switch (target) {
      case 'user':
        state.clientSelected.user[label] = value
        break
      case 'address':
        state.clientSelected.user.address[label] = value
        break
      case 'type':
        state.clientSelected.user.type[label] = value
        break
      case '':
        state.clientSelected[label] = value
        break
    }
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
    commit('SET_CLIENT_SELECTED', clients[0])
  },
  setClientSelected ({ commit }, client) {
    commit('SET_CLIENT_SELECTED', client)
  },
  updateClientSelected ({ commit }, payload) {
    commit('UPDATE_CLIENT_SELECTED', payload)
  },
  postClientSelected ({ commit }, payload) {
    const that = payload[0]
    const rawClient = payload[1]
    const { user: rawUser, ...cleanClient } = rawClient
    const { address: cleanAddress, ...cleanUser } = rawUser
    return new Promise((resolve, reject) => {
      that.$http.post(that.$api({ target: 'user' }), cleanUser, {
        headers: header()
      }).then((response) => {
        that.$http.post(that.$api({ target: 'address' }), cleanAddress, {
          headers: header()
        }).then((response) => {
          that.$http.post(that.$api({ target: 'client' }), cleanClient, {
            headers: header()
          }).then(response => {
            resolve(response)
          }).catch(err => {
            reject(err)
            console.log(err)
          })
        }).catch(err => {
          reject(err)
          console.log(err)
        })
      }).catch(err => {
        reject(err)
        console.log(err)
      })
    })
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
