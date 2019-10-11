import { mapGetters, mapActions } from 'vuex'
import { header } from '../../../config/index'
import serviceTable from '../common/service/serviceTable.vue'
import service from '../services/service.vue'
export default {
  name: 'clientServices',
  data () {
    return {
      clientServices: null,
      selected: null,
      serviceTableOptions: {
        filter: false,
        search: false,
        link: true,
        getter: 'clientServiceSelected',
        setter: 'setClientServiceSelected'
      }
    }
  },
  computed: {
    ...mapGetters([
      'clientSelected'
    ]),
    selectedIndex () {
      return this.selected ? this.clientServices.findIndex(service => service.id === this.selected.id) : 0
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
        return this.$store.getters.clientServiceSelected
      },
      set (service) {
        this.setClientServiceSelected(service)
      }
    }
  },
  watch: {
    '$route.params.client_id' () {
      this.get()
    },
    serviceQuery (newQuery, oldQuery) {
      if (newQuery === '' || newQuery === oldQuery) this.restoreServices()
      else this.searchServices()
    }
  },
  beforeMount () {
  },
  beforeDestroy () {
    this.lastClientServiceSelected = this.selectedIndex
  },
  methods: {
    ...mapActions([
      'getServices',
      'setServices',
      'setServiceSelected',
      'setClientServiceSelected',
      'setLastClientServiceSelected'
    ]),
    get () {
      this.getClientServices()
      this.getServices(this).then(services => {
        this.services = services
      })
    },
    getClientServices () {
      this.$http.get(this.$api({
        target: `client-services/${this.clientSelected.id}`,
        conn: this.$store.getters.conn
      }), {
        headers: header()
      }).then(response => {
        this.clientServices = response.data
        this.serviceSelected = response.data[this.lastClientServiceSelected ? this.lastClientServiceSelected : 0]
      })
    }
  },
  components: {
    serviceTable,
    service
  }
}
