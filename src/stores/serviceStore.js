import { header } from '../config/index.js'

const state = {
  services: [],
  serviceSelected: undefined
}

const getters = {
  services: () => state.services,
  serviceSelected: () => state.serviceSelected
}

const mutations = {
  SET_SERVICES (state, services) {
    state.services = services
  },
  SET_SERVICE_SELECTED (state, service) {
    state.serviceSelected = JSON.parse(JSON.stringify(service))
  },
  UPDATE_SERVICE_SELECTED (state, payload) {
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
      case '':
        state.clientSelected[label] = value
        break
    }
  },
  UPDATE_SERVICE (state, payload) {
    const service = payload[0]
    const index = payload[1]
    state.services.splice(index, 1, service)
  }
}

const actions = {
  getServices ({ commit }, that) {
    return new Promise((resolve, reject) => {
      that.$http.get(that.$api({ target: 'services' }), {
        headers: header()
      }).then(response => {
        resolve(response.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  setServices ({ commit }, services) {
    commit('SET_SERVICES', services)
  },
  changeServices ({ commit }, services) {
    commit('SET_SERVICES', services)
  },
  updateService ({ commit }, payload) {
    commit('UPDATE_SERVICE', payload)
  }
}

export default {
  state, getters, mutations, actions
}
