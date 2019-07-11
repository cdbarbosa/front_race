import { mapActions } from 'vuex'
import service from './service'
import moment from 'moment'
import serviceEdit from './edit.vue'
import success from '../common/create-messages/success'
import error from '../common/create-messages/error'
import createService from './create.vue'
import _ from 'lodash'
import filterService from './Filters.vue'
import { header } from '../../../config/index.js'
import serviceTable from '../common/service/serviceTable.vue'
import { saveAs } from 'file-saver'
moment.locale('pt-BR')
export default {
  name: 'showServices',
  props: ['clientServices'],
  data () {
    return {
      isEditActive: false,
      isFilterModal: false,
      checkboxGroup: [],
      serviceStatuses: [],
      radio: '',
      serviceCreated: undefined,
      tableSelected: undefined,
      isServiceModalActive: false,
      serviceTableOptions: {
        filter: true,
        search: true,
        link: false
      }
    }
  },
  computed: {
    selectedIndex () {
      return this.serviceSelected ? this.services.findIndex(service => service.id === this.serviceSelected.id) : 0
    },
    serviceFilters () {
      return this.$store.getters.serviceFilters.serviceFilters
    },
    statusFilters () {
      return this.$store.getters.serviceFilters.statusFilters
    },
    clientFilters () {
      return this.$store.getters.serviceFilters.clientFilters
    },
    filterActive () {
      let ret = false
      Object.keys(this.$store.getters.serviceFilters).forEach(fi => {
        if (fi === 'name') {
          if (this.$store.getters.serviceFilters[fi]) ret = true
        } else {
          if (this.$store.getters.serviceFilters[fi].filter(f => f.active).length) ret = true
        }
      })
      return ret
    },
    searchQuery: {
      get () {
        return this.$store.getters.serviceFilters.name
      },
      set: _.debounce(function (newQuery) {
        this.setServiceQuery(newQuery)
      }, 500)
    },
    lastServiceSelected: {
      get () {
        return this.$store.getters.lastServiceSelected
      },
      set (index) {
        this.setLastServiceSelected(index)
      }
    },
    selected: {
      get () {
        return this.tableSelected ? this.tableSelected : this.services[this.$route.params.service_id]
      },
      set (newValue) {
        this.tableSelected = newValue
      }
    },
    serviceSelected: {
      get () {
        return this.$store.getters.serviceSelected
      },
      set (service) {
        this.setServiceSelected(service)
      }
    },
    services: {
      get () {
        return this.$store.getters.services
      },
      set (newVal) {
        this.setServices(newVal)
      }
    }
  },
  watch: {
    services () {
      this.tableSelected = this.services[this.selectedIndex]
    },
    selectedIndex () {
      this.$router.push({ name: 'service', params: { service_id: this.serviceSelected.id } })
    },
    isServiceModalActive (newVal) {
      if (!newVal) {
        this.serviceCreated = undefined
      }
    },
    isModalActive (newVal) {
      if (!newVal) this.serviceCreated = undefined
    },
    searchQuery (newQuery, oldQuery) {
      if (newQuery === '' || newQuery === oldQuery) this.restoreServices()
      else this.searchServices()
    },
    selected (newVal) {
      if (this.services.length > 0) {
        this.$router.push({ name: 'service', params: { service_id: newVal.id } })
      }
    }
  },
  beforeMount () {
    this.getServiceStatuses()
    if (this.filterActive) {
      this.searchServices()
    } else {
      this.getServices(this).then(services => {
        this.services = services
        if (this.$route.params.service_id) {
          this.serviceSelected = services[this.findIndex(this.$route.params.service_id)]
        } else {
          this.serviceSelected = services[this.lastServiceSelected !== undefined ? this.lastServiceSelected : 0]
        }
        this.currentPage = Math.ceil(this.selectedIndex / this.perPage) || 1
      })
    }
  },
  beforeDestroy () {
    this.lastServiceSelected = this.selectedIndex
  },
  methods: {
    ...mapActions([
      'getServices',
      'setServices',
      'setServiceSelected',
      'setLastServiceSelected',
      'setServiceQuery',
      'setServiceFilters'
    ]),
    getServiceStatuses () {
      this.$http.get(this.$api({ target: 'service-status', clerance: this.$store.getters.user.role.name }), {
        headers: header()
      }).then(response => {
        this.serviceStatuses = response.data
      })
    },
    restoreServices () {
      this.getServices(this).then(services => {
        this.services = services
        this.serviceSelected = services[this.lastServiceSelected !== undefined ? this.lastServiceSelected : 0]
      })
      this.searchQuery = ''
    },
    restoreServiceSelected () {
      this.setServiceSelected(this.services[this.selectedIndex])
    },
    parseModal () {
      if (this.serviceCreated === undefined) {
        return 'createService'
      } else if (this.serviceCreated === true) {
        return 'success'
      }
      return 'error'
    },
    resetFilters () {
      this.getServices(this).then(services => {
        this.services = services
      })
      this.tableSelected = this.services[0]
    },
    searchServices () {
      let data = {
        name: this.searchQuery,
        clientFilters: this.clientFilters.filter(f => f.active),
        serviceFilters: this.serviceFilters.filter(f => f.active),
        statusFilter: this.statusFilters.filter(f => f.active)
      }
      let url = this.$store.getters.user.role_id === 1 ? 'filter-service' : (this.$store.getters.user.role_id === 3 ? 'rh/filter-service' : 'tj/filter-service')
      this.$http.post(this.$api({ target: url }), data, {
        headers: header()
      }).then(response => {
        this.services = response.data
        this.serviceSelected = response.data[0]
        this.isFilterModal = false
      })
    },
    findIndex (id) {
      return this.services.findIndex(service => service.id === id)
    },
    parseDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    watchStatusFilters (e) {
      if (e) {
        this.setServiceFilters([0, 'statusFilters', 'active', true])
        this.searchServices()
      } else {
        this.setServiceFilters([0, 'statusFilters', 'active', false])
        this.restoreServices()
      }
    },
    log () {
      this.isServiceModalActive = true
    },
    saveFile () {
      const header = `
##===============================================================================
## Serviço: ${this.serviceSelected.name} 

## Descrição: ${this.stripHtml(this.serviceSelected.description)}

## Custo: R$ ${parseFloat(this.serviceSelected.total_cost).toFixed(2)}
##===============================================================================
      `
      // const serviceInfo = ''
      // const clientInfo = ''
      const rhsInfo = this.serviceSelected.rhs.map(r => this.getRhInfo(r))
      // const footer = ''
      // const div = ''
      const body = `${header}\n${rhsInfo}`
      let blob = new Blob([body], { type: 'text/plain;charset=utf-8' })
      saveAs(blob, `${new Date().valueOf()}.txt`)
    },
    getRhInfo (rh) {
      return `
##===============================================================================
## Nome: ${rh.name} 
## Telefone: ${rh.phone}
## Email: ${rh.user.email}

## Atividades: ${rh.pivot.goal}
## Numero de Horas: ${rh.pivot.hours}
## Custo por hora: R$ ${rh.pivot.cost}
##===============================================================================
      `
    },
    stripHtml (html) {
      let tmp = document.createElement('div')
      tmp.innerHTML = html
      return tmp.textContent || tmp.innerText || ''
    }
  },
  components: {
    service,
    createService,
    serviceEdit,
    success,
    error,
    filterService,
    serviceTable
  }
}
