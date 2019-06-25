import { header } from '../config/index.js'

const getFilters = () => {
  return {
    name: null,
    clientFilters: [
      {
        key: 'name',
        label: 'Cliente',
        value: null,
        active: false
      }
    ],
    serviceFilters: [
      {
        key: 'created_at',
        label: 'Data registro',
        value: null,
        operator: null,
        active: false
      },
      {
        key: 'forecast',
        label: 'Previsão',
        value: null,
        operator: null,
        active: false
      },
      {
        key: 'delivered',
        label: 'Entrega',
        value: null,
        operator: null,
        active: false
      },
      {
        key: 'profit',
        label: 'Margem',
        value: null,
        operator: null,
        active: false
      },
      {
        key: 'description',
        label: 'Observações',
        value: null,
        active: false
      }
    ],
    statusFilters: [
      {
        key: 'abbreviation',
        label: 'Situação',
        value: null,
        active: false
      }
    ]
  }
}
const state = {
  services: [],
  serviceSelected: undefined,
  lastServiceSelected: undefined,
  serviceFilters: getFilters()
}

const getters = {
  services: () => state.services,
  serviceSelected: () => state.serviceSelected,
  lastServiceSelected: () => state.lastServiceSelected,
  serviceFilters: () => state.serviceFilters
}

const mutations = {
  SET_SERVICE_FILTERS (state, payload) {
    const index = payload[0]
    const filter = payload[1]
    const key = payload[2]
    const value = payload[3]
    state.serviceFilters[filter][index][key] = value
  },
  SET_SERVICE_QUERY (state, query) {
    state.serviceFilters.name = query
  },
  SET_LAST_SERVICE_SELECTED (state, index) {
    state.lastServiceSelected = index
  },
  SET_SERVICES (state, services) {
    state.services = services
  },
  SET_SERVICE_SELECTED (state, service) {
    state.serviceSelected = JSON.parse(JSON.stringify(service))
    if (!state.serviceSelected.tj) {
      state.serviceSelected.tj = {
        type_id: 1,
        cost: null
      }
    }
  },
  UPDATE_SERVICE_SELECTED (state, payload) {
    const label = payload[0]
    const value = payload[1]
    state.serviceSelected[label] = value
  },
  UPDATE_SERVICE_SELECTED_TJ (state, payload) {
    const label = payload[0]
    const value = payload[1]
    state.serviceSelected.tj[label] = value
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
  setServiceFilters ({ commit }, payload) {
    commit('SET_SERVICE_FILTERS', payload)
  },
  setServiceQuery ({ commit }, query) {
    commit('SET_SERVICE_QUERY', query)
  },
  getServices ({ commit }, that) {
    return new Promise((resolve, reject) => {
      that.$http.get(that.$api({ target: 'services' }), {
        headers: header()
      }).then(response => {
        console.log(response)
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
  updateServiceSelectedTj ({ commit }, payload) {
    commit('UPDATE_SERVICE_SELECTED_TJ', payload)
  },
  postServiceSelected ({ commit }, payload) {
    const that = payload[0]
    const service = payload[1]
    return new Promise((resolve, reject) => {
      that.$http.post(that.$api({ target: 'service', clerance: that.$store.getters.user.role.name }), service, {
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
    commit('SET_SERVICE_SELECTED', payload[0])
  }
}

export default {
  state, getters, mutations, actions
}
