import { mapActions } from 'vuex'
import service from './service'
import moment from 'moment'
import serviceEdit from './edit.vue'
import success from '../common/create-messages/success'
import error from '../common/create-messages/error'
import createService from './create.vue'
import _ from 'lodash'
import { header } from '../../../config/index.js'
export default {
  name: 'showServices',
  data () {
    return {
      isEditActive: false,
      checkboxGroup: [],
      radio: '',
      searchQuery: undefined,
      serviceCreated: undefined,
      tableSelected: undefined,
      isServiceModalActive: false,
      currentPage: 1,
      perPage: 5
    }
  },
  computed: {
    serviceSelected: {
      get () {
        return this.$store.getters.serviceSelected
      },
      set (service) {
        console.log(service)
        // this.setServiceSelected(service)
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
    services: {
      get () {
        return this.$store.getters.services
      },
      set (newVal) {
        this.setServices(newVal)
      }
    },
    selectedIndex () {
      return this.services.findIndex(service => service.id === this.serviceSelected.id)
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
    searchQuery: _.debounce(function (newQuery, oldQuery) {
      this.serviceSelected = undefined
      if (newQuery === '' && newQuery === oldQuery) {
        this.tableSelected = this.services[this.selectedIndex]
        this.getServices(this)
      } else {
        this.searchServices(newQuery)
      }
    }, 500),
    selected (newVal) {
      if (this.services.length > 0) {
        this.$router.push({ name: 'service', params: { service_id: newVal.id } })
      }
    }
  },
  beforeMount () {
    if (!this.services.length) {
      this.getServices(this).then(services => {
        this.services = services
        this.selected = services[0]
      })
    } else {
      let index = this.services.findIndex(service => service.id === this.$route.params.service_id)
      this.currentPage = Math.ceil(index / this.perPage) || 1
      this.selected = this.services[index]
    }
  },
  methods: {
    ...mapActions([
      'getServices',
      'setServices',
      'setServiceSelected'
    ]),
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
    searchServices (title) {
      this.$http.get(this.$api({ target: 'service' }), {
        headers: header(),
        params: {
          search: title
        }
      }).then(response => {
        this.setServices(response.data)
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
    error
  }
}
