import { mapActions, mapGetters } from 'vuex'
import dataTable from '../../../../mixins/dataTable.js'
import genericUser from '../genericUser.vue'
export default {
  name: 'serviceTable',
  mixins: [dataTable],
  props: ['options', 'selectedIndex', 'filterActive'],
  data () {
    return {
      target: 0
    }
  },
  computed: {
    ...mapGetters([
      'services'
    ]),
    serviceSelected: {
      get () {
        return this.$store.getters[this.options.getter ? this.options.getter : 'serviceSelected']
      },
      set (service) {
        this[this.options.setter ? this.options.setter : 'setServiceSelected'](service)
      }
    }
  },
  watch: {
  },
  beforeMount () {
    if (this.$store.getters.user.role_id !== 1) {
      this.target = 0
    } else {
      this.target = this.$store.getters.user.role_id
    }
  },
  methods: {
    ...mapActions([
      'setServiceSelected',
      'setClientServiceSelected',
      'setRhServiceSelected'
    ]),
    findIndex (id) {
      return this.services.findIndex(service => service.id === id)
    }
  },
  components: {
    genericUser
  }
}
