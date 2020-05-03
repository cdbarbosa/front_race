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
  clientServiceSelected: undefined,
  rhServiceSelected: undefined,
  lastServiceSelected: undefined,
  serviceFilters: getFilters(),
  serviceUpdateJustification: ''
}

const getters = {
  services: () => state.services,
  serviceSelected: () => state.serviceSelected,
  clientServiceSelected: () => state.clientServiceSelected,
  rhServiceSelected: () => state.rhServiceSelected,
  lastServiceSelected: () => state.lastServiceSelected,
  serviceFilters: () => state.serviceFilters,
  serviceUpdateJustification: () => state.serviceUpdateJustification
}

const mutations = {
  SET_SERVICES (state, services) {
    state.services = services
  },
  SET_SERVICE_SELECTED (state, payload) {
    if (Array.isArray(payload)) {
      const target = payload[0]
      const service = payload[1]
      state[target] = service

      if (target === 'serviceSelected') {
        if (!state.serviceSelected.tj) {
          state.serviceSelected.tj = {
            type_id: 1,
            cost: null
          }
        }
      }
    } else {
      state.serviceSelected = payload
      if (payload && !state.serviceSelected.tj) {
        state.serviceSelected.tj = {
          type_id: 1,
          cost: null
        }
      }
    }
  },
  SET_LAST_SERVICE_SELECTED (state, index) {
    state.lastServiceSelected = index
  },
  SET_CLIENT_SERVICE_SELECTED (state, service) {
    state.clientServiceSelected = service
  },
  SET_RH_SERVICE_SELECTED (state, service) {
    state.rhServiceSelected = service
  },
  SET_SERVICE (state, payload) {
    const index = payload[0]
    const service = payload[1]
    state.services.splice(index, 1, service)
  },
  UPDATE_SERVICE_SELECTED_KEY (state, payload) {
    const key = payload[0]
    const value = payload[0]
    state.serviceSelected[key] = value
  },
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
  // SET_SERVICE_SELECTED (state, payload) {
  //   if (Array.isArray(payload)) {
  //     const target = payload[0]
  //     const service = payload[1]
  //     state[target] = service
  //
  //     if (target === 'serviceSelected') {
  //       if (!state.serviceSelected.tj) {
  //         state.serviceSelected.tj = {
  //           type_id: 1,
  //           cost: null
  //         }
  //       }
  //     }
  //   } else {
  //   }
  // },
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
  DESTROY_SERVICE_STORE (state) {
    state.services = []
    state.serviceSelected = undefined
    state.lastServiceSelected = undefined
    state.serviceFilters = getFilters()
  },
  SET_SERVICE_UPDATE_JUSTIFICATION (state, justification) {
    state.serviceUpdateJustification = justification
  }
}

const actions = {
  setServices ({ commit }, services) {
    commit('SET_SERVICES', services)
  },
  setService ({ commit }, payload) {
    commit('SET_SERVICE', payload)
  },
  setServiceSelected ({ commit }, service) {
    commit('SET_SERVICE_SELECTED', service)
  },
  setClientServiceSelected ({ commit }, service) {
    commit('SET_CLIENT_SERVICE_SELECTED', service)
  },
  setRhServiceSelected ({ commit }, service) {
    commit('SET_RH_SERVICE_SELECTED', service)
  },
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
      that.$http.get(that.$api({
        target: 'services',
        conn: that.$store.getters.conn
      }), {
        headers: header()
      }).then(response => {
        resolve(response.data)
      }).catch(err => {
        reject(err)
      })
    })
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
    const justification = payload[2]

    return new Promise((resolve, reject) => {
      that.$http.post(that.$api({
        target: 'service',
        // clerance: that.$store.getters.user.role.name,
        conn: that.$store.getters.conn
      }), Object.assign(service, { justification: justification }), {
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
    // commit('UPDATE_SERVICE', payload)
    commit('SET_SERVICE_SELECTED', payload[0])
  },
  destroyServiceStore ({ commit }) {
    commit('DESTROY_SERVICE_STORE')
  },
  setServiceUpdateJustification ({ commit }, justification) {
    commit('SET_SERVICE_UPDATE_JUSTIFICATION', justification)
  }
}

export default {
  state, getters, mutations, actions
}
