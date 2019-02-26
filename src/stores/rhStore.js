import { header } from '../config/index.js'

const state = {
  rhs: []
}

const getters = {
  rhs: () => state.rhs
}

const mutations = {
  SET_RHS (state, rhs) {
    state.rhs = rhs
  }
}

const actions = {
  getRhs ({ commit }, that) {
    that.$http.get(that.$api({ target: 'rhs' }), {
      headers: header()
    }).then(response => {
      commit('SET_RHS', response.data)
    })
  }
}

export default {
  state, getters, mutations, actions
}
