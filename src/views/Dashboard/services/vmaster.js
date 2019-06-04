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
moment.locale('pt-BR')
export default {
  name: 'showServices',
  props: ['clientServices'],
  data () {
    return {
      isEditActive: false,
      isFilterModal: false,
      checkboxGroup: [],
      radio: '',
      serviceCreated: undefined,
      tableSelected: undefined,
      isServiceModalActive: false,
      currentPage: 1,
      perPage: 5
    }
  },
  computed: {
    selectedIndex () {
      return this.services.findIndex(service => service.id === this.serviceSelected.id)
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
        console.log(newQuery)
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
    if (this.filterActive) {
      this.searchServices()
    } else {
      this.getServices(this).then(services => {
        this.services = services
        this.serviceSelected = services[this.lastServiceSelected !== undefined ? this.lastServiceSelected : 0]
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
      'setServiceQuery'
    ]),
    restoreServices () {
      this.getServices(this).then(services => {
        this.services = services
        this.serviceSelected = services[this.lastServiceSelected !== undefined ? this.lastServiceSelected : 0]
      })
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
      this.$http.post(this.$api({ target: 'filter-service' }), data, {
        headers: header()
      }).then(response => {
        this.services = response.data
        this.serviceSelected = response.data[0]
        this.isFilterModal = false
      })
    },
    parseDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    log () {
      this.isServiceModalActive = true
      console.log('here')
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
