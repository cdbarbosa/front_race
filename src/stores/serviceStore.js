import { header } from '../config/index.js'

const state = {
  services: [],
  serviceSelected: undefined,
  lastServiceSelected: undefined
}

const getters = {
  services: () => state.services,
  serviceSelected: () => state.serviceSelected,
  lastServiceSelected: () => state.lastServiceSelected
}

const mutations = {
  SET_LAST_SERVICE_SELECTED (state, index) {
    state.lastServiceSelected = index
  },
  SET_SERVICES (state, services) {
    state.services = services
  },
  SET_SERVICE_SELECTED (state, service) {
    state.serviceSelected = JSON.parse(JSON.stringify(service))
  },
  UPDATE_SERVICE_SELECTED (state, payload) {
    const label = payload[0]
    const value = payload[1]
    state.serviceSelected[label] = value
  },
  UPDATE_SERVICE (state, payload) {
    const service = payload[0]
    const index = payload[1]
    state.services.splice(index, 1, service)
  }
}

const actions = {
  setLastServiceSelected ({ commit }, index) {
    commit('SET_LAST_SERVICE_SELECTED', index)
  },
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
  setServiceSelected ({ commit }, service) {
    commit('SET_SERVICE_SELECTED', service)
  },
  updateServiceSelected ({ commit }, payload) {
    commit('UPDATE_SERVICE_SELECTED', payload)
  },
  postServiceSelected ({ commit }, payload) {
    const that = payload[0]
    const service = payload[1]
    return new Promise((resolve, reject) => {
      that.$http.post(that.$api({ target: 'service' }), service, {
        headers: header()
      }).then(response => {
        resolve(response)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    })
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
