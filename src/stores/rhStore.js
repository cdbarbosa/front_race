import { header } from '../config/index.js'

const state = {
  rhs: [],
  rhsNotInService: [],
  rhsInService: [],
  rhByService: []
}

const getters = {
  rhs: () => state.rhs,
  rhsNotInService: () => state.rhsNotInService,
  rhsInService: () => state.rhsInService,
  rhByService: () => state.rhByService
}

const mutations = {
  SET_RHS (state, rhs) {
    state.rhs = rhs
  },
  SET_RHS_NOT_IN_SERVICE (state, rhs) {
    state.rhsNotInService = rhs
  },
  SET_RHS_IN_SERVICE (state, rhs) {
    state.rhsInService = rhs
  },
  SET_RH_SERVICE (state, rhByService) {
    state.rhByService = rhByService
  },
  UPDATE_RH (state, payload) {
    const rh = payload[0]
    const index = payload[1]
    state.rhs.splice(index, 1, rh)
  },
  UPDATE_RH_ADDRESS (state, payload) {
    const address = payload[0]
    const index = payload[1]
    state.rhs[index].user.address = address
  },
  UPDATE_RH_ACADEMICS (state, payload) {
    const academic = payload[0]
    const index = payload[1]
    state.rhs[index].academics = academic
  }
}

const actions = {
  getRhs ({ commit }, that) {
    return new Promise((resolve, reject) => {
      that.$http.get(that.$api({ target: 'rhs' }), {
        headers: header()
      }).then(response => {
        resolve(response.data)
      }).catch(err => {
        reject(err)
        console.log(err)
      })
    })
  },
  setRhs ({ commit }, rhs) {
    commit('SET_RHS', rhs)
  },
  setRhsNotInService ({ commit }, rhs) {
    commit('SET_RHS_NOT_IN_SERVICE', rhs)
  },
  setRhsInService ({ commit }, rhs) {
    commit('SET_RHS_IN_SERVICE', rhs)
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
  },
  updateRhAddress ({ commit }, payload) {
    commit('UPDATE_RH_ADDRESS', payload)
  },
  updateRhAcademics ({ commit }, payload) {
    commit('UPDATE_RH_ACADEMICS', payload)
  }
}

export default {
  state, getters, mutations, actions
}
