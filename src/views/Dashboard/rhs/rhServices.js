import { mapGetters, mapActions } from 'vuex'
import { header } from '../../../config/index'
import serviceTable from '../common/service/serviceTable.vue'
import service from '../services/service.vue'
export default {
  name: 'rhServices',
  data () {
    return {
      rhServices: null,
      selected: null,
      serviceTableOptions: {
        filter: false,
        search: false,
        link: true
      }
    }
  },
  computed: {
    ...mapGetters([
      'rhSelected'
    ]),
    selectedIndex () {
      return this.selected ? this.rhServices.findIndex(service => service.id === this.selected.id) : 0
    },
    linkIndex () {
      return this.services.findIndex(service => service.id === this.selected.id)
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
    this.getServices(this).then(services => {
      this.services = services
    })
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
    getRhServices () {
      this.$http.get(this.$api({ target: `rh-services/${this.rhSelected.id}` }), {
        headers: header()
      }).then(response => {
        console.log(response)
        // this.rhServices = response.data
        // this.selected = response.data[this.lastClientServiceSelected ? this.lastClientServiceSelected : 0]
      })
    }
  },
  components: {
    serviceTable,
    service
  }
}
