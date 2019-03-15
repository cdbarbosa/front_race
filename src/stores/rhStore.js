import { header } from '../config/index.js'

const state = {
  rhs: [],
  rhByService: []
}

const getters = {
  rhs: () => state.rhs,
  rhByService: () => state.rhByService
}

const mutations = {
  SET_RHS (state, rhs) {
    state.rhs = rhs
  },
  SET_RH_SERVICE (state, rhByService) {
    state.rhByService = rhByService
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
  getRhByService ({ commit }, payload) {
    let that = payload[0]
    let value = payload[1]
    that.$http.get(that.$api({ target: `rh/${value}` }), {
      headers: header()
    }).then(response => {
      console.log(response)
      commit('SET_RH_SERVICE', response.data)
    })
  },
  changeRh ({ commit }, rhs) {
    commit('SET_RHS', rhs)
  },
  updateRh ({ commit }, payload) {
    let that = payload[0]
    let data = payload[1]
    that.$http.put(that.$api({ target: 'rh' }), data, {
      headers: header()
    }).then(response => {
      commit('SET_RHS', response.data)
    })
  }
}

export default {
  state, getters, mutations, actions
}
