import { header } from '../config/index.js'

const state = {
  rhs: [],
  rhSelected: undefined,
  rhsNotInService: [],
  rhsInService: [],
  rhByService: [],
  lastRhSelected: undefined
}

const getters = {
  rhs: () => state.rhs,
  rhSelected: () => state.rhSelected,
  rhsNotInService: () => state.rhsNotInService,
  rhsInService: () => state.rhsInService,
  rhByService: () => state.rhByService,
  lastRhSelected: () => state.lastRhSelected
}

const mutations = {
  SET_RHS (state, rhs) {
    state.rhs = rhs
  },
  SET_LAST_RH_SELECTED (state, index) {
    state.lastRhSelected = index
  },
  SET_RH_SELECTED (state, rh) {
    state.rhSelected = JSON.parse(JSON.stringify(rh))
  },
  UPDATE_RH_SELECTED (state, payload) {
    const label = payload[0]
    const target = payload[1]
    const value = payload[2]
    switch (target) {
      case 'user':
        state.rhSelected.user[label] = value
        break
      case 'address':
        state.rhSelected.user.address[label] = value
        break
      case 'type':
        state.rhSelected.user.type[label] = value
        break
      case 'academics':
        if (state.rhSelected.academics[0]) {
          state.rhSelected.academics[0][label] = value
        } else {
          let academic = {
            area: null,
            titulation: null
          }
          academic[label] = value
          state.rhSelected.academics.push(academic)
        }

        break
      case '':
        state.rhSelected[label] = value
        break
    }
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
  setLastRhSelected ({ commit }, index) {
    commit('SET_LAST_RH_SELECTED', index)
  },
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
  setRhSelected ({ commit }, rh) {
    commit('SET_RH_SELECTED', rh)
  },
  updateRhSelected ({ commit }, payload) {
    commit('UPDATE_RH_SELECTED', payload)
  },
  postRhSelected ({ commit }, payload) {
    const that = payload[0]
    const rawRh = payload[1]
    const { user: rawUser, ...rhUpdate } = rawRh
    const { address: addressClean, ...userClean } = rawUser
    const { academics: academicsClean, ...rhClean } = rhUpdate
    return new Promise((resolve, reject) => {
      that.$http.post(that.$api({ target: 'user' }), userClean, {
        headers: header()
      }).then(() => {
        that.$http.post(that.$api({ target: 'address' }), addressClean, {
          headers: header()
        }).then(() => {
          that.$http.post(that.$api({ target: 'rh-academic' }), Object.assign({ rh_id: rhClean.id }, academicsClean[0]), {
            headers: header()
          }).then(() => {
            that.$http.post(that.$api({ target: 'rh' }), rhClean, {
              headers: header()
            }).then(response => {
              resolve(response)
            }).catch(err => {
              reject(err)
            })
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
    commit('SET_RH_SELECTED', payload[0])
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
