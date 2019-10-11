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
        link: true,
        getter: 'rhServiceSelected',
        setter: 'setRhServiceSelected'
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
    lastRhServiceSelected: {
      get () {
        return this.$store.getters.lastRhServiceSelected
      },
      set (index) {
        this.setLastRhServiceSelected(index)
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
        return this.$store.getters.rhServiceSelected
      },
      set (service) {
        this.setRhServiceSelected(service)
      }
    }
  },
  watch: {
    '$route.params.rh_id' () {
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
    this.lastRhServiceSelected = this.selectedIndex
  },
  methods: {
    ...mapActions([
      'getServices',
      'setServices',
      'setServiceSelected',
      'setLastRhServiceSelected',
      'setRhServiceSelected'
    ]),
    get () {
      this.getRhServices()
      this.getServices(this).then(services => {
        this.services = services
      })
    },
    getRhServices () {
      this.$http.get(this.$api({
        target: `rh-services/${this.rhSelected.id}`,
        conn: this.$store.getters.conn
      }), {
        headers: header()
      }).then(response => {
        this.rhServices = response.data
        this.serviceSelected = response.data[this.lastClientServiceSelected ? this.lastClientServiceSelected : 0]
      })
    }
  },
  components: {
    serviceTable,
    service
  }
}
