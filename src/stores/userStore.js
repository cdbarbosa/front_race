import { client, header } from '../config/index.js'

const state = {
  user: undefined,
  authTokens: {}

}

const getters = {
  user: () => state.user,
  client: () => state.user ? state.user.client : undefined,
  userFilters: () => state.userFilters
}

const mutations = {
  SET_USER (state, obj) {
    state.user = obj
  },
  SET_CLIENT (state, obj) {
    state.user.client = obj
  },
  SET_AUTH_TOKENS (state, tokens) {
    window.localStorage.setItem('authTokens', JSON.stringify(tokens))
    state.authTokens.access_token = tokens.access_token
    state.authTokens.refresh_token = tokens.refresh_token
  },
  SET_USER_DETAILS (state, payload) {
    const label = payload[0]
    const value = payload[1]
    state.user[label] = value
  },
  SET_CLIENT_DETAILS (state, payload) {
    const label = payload[0]
    const value = payload[1]
    state.user.client[label] = value
  },
  DESTROY_USER_STORE (state) {
    state.user = undefined
    state.authTokens = {}
  }
}

const actions = {
  getAuthToken ({ commit }, payload) {
    const that = payload[0]
    const data = payload[1]

    Object.assign(data, client(that.$store.getters.conn), { grant_type: 'password', scope: '' })
    return new Promise((resolve, reject) => {
      that.$http.post(that.$api({
        target: 'oauth/token',
        secure: false,
        conn: that.$store.getters.conn
      }), data).then(response => {
        resolve(response)
      }).catch(err => {
        reject(err)
      })
    })
  },
  setAuthToken ({ commit }, tokens) {
    commit('SET_AUTH_TOKENS', tokens)
  },
  getAuthUser ({ commit }, that) {
    return new Promise((resolve, reject) => {
      that.$http.get(that.$api({
        target: 'user',
        conn: that.$store.getters.conn
      }), {
        headers: header()
      }).then(response => {
        resolve(response)
      }).catch(err => {
        reject(err)
      })
    })
  },
  setAuthUser ({ commit }, user) {
    return new Promise(resolve => {
      commit('SET_USER', user)
      resolve({ status: true })
    })
  },
  setUserDetails ({ commit }, payload) {
    commit('SET_USER_DETAILS', payload)
  },
  setClientDetails ({ commit }, payload) {
    commit('SET_CLIENT_DETAILS', payload)
  },
  updateUser ({ commit }, payload) {
    let that = payload[0]
    let data = payload[1]
    that.$http.put(that.$api({
      target: 'user',
      conn: that.$store.getters.conn
    }), data, {
      headers: header()
    }).then(response => {
      commit('SET_USER', response.data)
    })
  },

  destroyUserStore ({ commit }) {
    commit('DESTROY_USER_STORE')
  }
}

export default {
  state, getters, mutations, actions
}
