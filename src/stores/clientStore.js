import { header } from '../config/index.js'

const getFilters = () => {
  return {
    name: null,
    userFilters: [
      {
        key: 'active',
        label: 'Ativo',
        value: 1,
        active: false
      }
    ],
    clientFilters: [
      {
        key: 'observations',
        label: 'Observações',
        value: null,
        active: false
      },
      {
        key: 'activity',
        label: 'Atividades',
        value: null,
        active: false
      },
      {
        key: 'completed',
        label: 'Situação dos dados',
        value: 1,
        active: true
      }
    ],
    addressFilters: [
      {
        key: 'state',
        label: 'Estado',
        value: null,
        active: false
      },
      {
        key: 'city',
        label: 'Cidade',
        value: null,
        active: false
      }
    ]
  }
}

const state = {
  clients: [],
  clientSelected: undefined,
  lastClientSelected: undefined,
  lastClientServiceSelected: undefined,
  clientFilters: getFilters()
}

const getters = {
  clients: () => state.clients,
  clientSelected: () => state.clientSelected,
  lastClientSelected: () => state.lastClientSelected,
  lastClientServiceSelected: () => state.lastClientServiceSelected,
  clientFilters: () => state.clientFilters
}

const mutations = {
  SET_CLIENT_FILTERS (state, payload) {
    const index = payload[0]
    const filter = payload[1]
    const key = payload[2]
    const value = payload[3]

    state.clientFilters[filter][index][key] = value
  },
  SET_CLIENT_QUERY (state, query) {
    state.clientFilters.name = query
  },
  RESTORE_CLIENT_FILTERS (state) {
    state.clientFilters = getFilters()
  },
  SET_LAST_CLIENT_SERVICE_SELECTED (state, index) {
    state.lastClientServiceSelected = index
  },
  SET_LAST_CLIENT_SELECTED (state, index) {
    state.lastClientSelected = index
  },
  SET_CLIENTS (state, clients) {
    state.clients = clients
  },
  SET_CLIENT_SELECTED (state, client) {
    state.clientSelected = client
    // state.clientSelected = JSON.parse(JSON.stringify(client))
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
  },
  DESTROY_CLIENT_STORE (state) {
    state.clients = []
    state.clientSelected = undefined
    state.lastClientSelected = undefined
    state.lastClientServiceSelected = undefined
    state.clientFilters = getFilters()
  }
}

const actions = {
  setClientFilters ({ commit }, payload) {
    commit('SET_CLIENT_FILTERS', payload)
  },
  restoreClientFilters ({ commit }) {
    commit('RESTORE_CLIENT_FILTERS')
  },
  setClientQuery ({ commit }, query) {
    commit('SET_CLIENT_QUERY', query)
  },
  setLastClientServiceSelected ({ commit }, index) {
    commit('SET_LAST_CLIENT_SERVICE_SELECTED', index)
  },
  setLastClientSelected ({ commit }, index) {
    commit('SET_LAST_CLIENT_SELECTED', index)
  },
  getClients ({ commit }, that) {
    return new Promise((resolve, reject) => {
      that.$http.get(that.$api({
        target: 'clients',
        conn: that.$store.getters.conn
      }), {
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
      that.$http.post(that.$api({
        target: 'user',
        conn: that.$store.getters.conn
      }), cleanUser, {
        headers: header()
      }).then((response) => {
        that.$http.post(that.$api({
          target: 'address',
          conn: that.$store.getters.conn
        }), cleanAddress, {
          headers: header()
        }).then((response) => {
          that.$http.post(that.$api({
            target: 'client',
            conn: that.$store.getters.conn
          }), cleanClient, {
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
    commit('SET_CLIENT_SELECTED', payload[0])
  },
  updateClientAddress ({ commit }, payload) {
    commit('UPDATE_CLIENT_ADDRESS', payload)
  },
  destroyClientStore ({ commit }) {
    commit('DESTROY_CLIENT_STORE')
  }
}

export default {
  state, getters, mutations, actions
}
