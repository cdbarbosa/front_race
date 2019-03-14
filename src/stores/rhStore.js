import { header } from '../config/index.js'

const state = {
  rhs: [],
  rhByIndex: undefined
}

const getters = {
  rhs: () => state.rhs,
  rhByIndex: () => state.rhByIndex
}

const mutations = {
  SET_RHS (state, rhs) {
    state.rhs = rhs
  },
  SET_RH (state, rhByIndex) {
    state.rhByIndex = rhByIndex
  }
}

const actions = {
  getRhs ({ commit }, that) {
    that.$http.get(that.$api({ target: 'rhs' }), {
      headers: header()
    }).then(response => {
      commit('SET_RHS', response.data)
    })
  },
  getRhByIndex ({ commit }, payload) {
    let that = payload[0]
    let value = payload[1]
    that.$http.get(that.$api({ target: `rh/${value}` }), {
      headers: header()
    }).then(response => {
      console.log(response)
      commit('SET_RH', response.data)
    })
  }
}

export default {
  state, getters, mutations, actions
}
