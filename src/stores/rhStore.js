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
  },
  UPDATE_RH (state, payload) {
    console.log(payload)
    const rh = payload[0]
    const index = payload[1]
    state.rhs.splice(index, 1, rh)
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
    commit('UPDATE_RH', payload)
  }
}

export default {
  state, getters, mutations, actions
}
