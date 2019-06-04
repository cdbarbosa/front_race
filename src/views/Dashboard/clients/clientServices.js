import { mapGetters, mapActions } from 'vuex'
import { header } from '../../../config/index'
import serviceTable from '../common/service/serviceTable.vue'
export default {
  name: 'clientServices',
  data () {
    return {
      clientServices: null,
      selectedIndex: 0
    }
  },
  computed: {
    ...mapGetters([
      'clientSelected'
    ]),
    serviceQuery () {
      return this.$store.getters.serviceFilters.name
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
      this.serviceSelected = services[this.lastServiceSelected !== undefined ? this.lastServiceSelected : 0]
      // this.currentPage = Math.ceil(this.selectedIndex / this.perPage) || 1
    })
  },
  methods: {
    ...mapActions([
      'getServices',
      'setServices',
      'setServiceSelected'
    ]),
    getClientServices () {
      this.$http.get(this.$api({ target: `client-services/${this.clientSelected.id}` }), {
        headers: header()
      }).then(response => {
        this.clientServices = response.data
      })
    }
  },
  components: {
    serviceTable
  }
}
