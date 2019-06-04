import { mapGetters, mapActions } from 'vuex'
import { header } from '../../../config/index'
import serviceTable from '../common/service/serviceTable.vue'
import service from '../services/service.vue'
export default {
  name: 'clientServices',
  data () {
    return {
      clientServices: null,
      selected: null
    }
  },
  computed: {
    ...mapGetters([
      'clientSelected'
    ]),
    selectedIndex () {
      return this.selected ? this.clientServices.findIndex(service => service.id === this.selected.id) : 0
    },
    serviceQuery () {
      return this.$store.getters.serviceFilters.name
    },
    lastClientServiceSelected: {
      get () {
        return this.$store.getters.lastClientServiceSelected
      },
      set (index) {
        this.setLastClientServiceSelected(index)
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
    serviceSelected: {
      get () {
        return this.$store.getters.serviceSelected
      },
      set (service) {
        this.setServiceSelected(service)
      }
    }
  },
  watch: {
    serviceQuery (newQuery, oldQuery) {
      if (newQuery === '' || newQuery === oldQuery) this.restoreServices()
      else this.searchServices()
    }
  },
  beforeMount () {
    this.getClientServices()
    // this.getServices(this).then(services => {
    //   this.services = services
    //   this.serviceSelected = services[this.lastServiceSelected !== undefined ? this.lastServiceSelected : 0]
    //   // this.currentPage = Math.ceil(this.selectedIndex / this.perPage) || 1
    // })
  },
  beforeDestroy () {
    this.lastClientServiceSelected = this.selectedIndex
  },
  methods: {
    ...mapActions([
      'getServices',
      'setServices',
      'setServiceSelected',
      'setLastClientServiceSelected'
    ]),
    getClientServices () {
      this.$http.get(this.$api({ target: `client-services/${this.clientSelected.id}` }), {
        headers: header()
      }).then(response => {
        this.clientServices = response.data
        this.selected = response.data[this.lastClientServiceSelected ? this.lastClientServiceSelected : 0]
      })
    }
  },
  components: {
    serviceTable,
    service
  }
}
