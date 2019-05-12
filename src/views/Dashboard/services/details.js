import { header } from '../../../config/index.js'
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import rhTable from '../common/rhTable.vue'
import rhTableDetails from './details/rhTable.vue'
export default {
  name: 'serviceDetails',
  data () {
    return {
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        suffix: ' #',
        precision: 2,
        masked: false /* doesn't work with directive */
      },
      rhServiceFields: {
        cost: 0.00,
        hours: null,
        goal: null
      },
      isAttachModalOpen: false,
      service: undefined,
      rhsService: undefined,
      isSearchModalActive: false,
      data: [],
      rh_id: '',
      isModalActive: false,
      isCreateModalActive: false,
      serviceSelected: undefined,
      rhSelected: undefined,
      rhCreated: undefined,
      isResponseble: true,
      hours: undefined,
      goal: undefined,
      rhNotInService: undefined
    }
  },
  computed: {
    ...mapGetters([
      'rhs',
      'rhsNotInService',
      'rhsInService'
    ]),
    selected: {
      get () {
        return this.rhSelected ? this.rhSelected : (this.rhsService === undefined ? undefined : this.rhsService[0])
      },
      set (newValue) {
        this.rhSelected = newValue
      }
    },
    selectedIndex () {
      return this.rhs.findIndex(rh => rh.id === this.selected.id)
    }
  },
  watch: {
    rhNotInService (newVal) {
      this.rhServiceFields.cost = parseFloat(newVal.cost)
    }
  },
  activated () {
    // if (this.selected) {
    //   if (this.serviceSelected) this.$router.push({ name: 'serviceDetails', params: { service_id: this.serviceSelected.id } })
    //   else this.$router.push({ name: 'serviceDetails', params: { service_id: this.selected.id } })
    // }
  },
  beforeRouteEnter (to, from, next) {
    next($this => {
      if ($this.$route.params.service_id) next()
      else next({ name: 'service' })
    })
  },
  beforeMount () {
    this.getService()
    this.getRhInService()
    this.getRhNotInService()
  },
  methods: {
    ...mapActions([
      'getRhs',
      'updateService',
      'setRhsNotInService',
      'setRhsInService',
      'updateRh'
    ]),
    filterRhNotInService (data) {
      this.$http.post(this.$api({ target: 'rh-not-in-service' }), Object.assign({ 'service_id': this.$route.params.service_id }, data), {
        headers: header()
      }).then(response => {
        console.log(response)
        this.setRhsNotInService(response.data)
      })
    },
    filterRhInService (data) {
      this.$http.post(this.$api({ target: 'rh-in-service' }), Object.assign({ 'service_id': this.$route.params.service_id }, data), {
        headers: header()
      }).then(response => {
        this.setRhsInService(response.data)
      })
    },
    parseDate (date) {
      return moment().format('DD/MM/YYYY')
    },
    parseModal () {
      if (this.rhCreated === undefined) {
        return 'createRh'
      } else if (this.rhCreated === true) {
        return 'success'
      }
      return 'error'
    },
    getService () {
      this.$http.get(this.$api({ target: `service/${this.$route.params.service_id}` }), {
        headers: header()
      }).then(response => {
        this.service = response.data
      })
    },
    getRhInService () {
      this.$http.get(this.$api({ target: `rhs-in-service/${this.$route.params.service_id}` }), {
        headers: header()
      }).then(response => {
        this.setRhsInService(response.data)
        this.rhsService = response.data
      })
    },
    getRhNotInService () {
      this.$http.get(this.$api({ target: `rhs-not-in-service/${this.$route.params.service_id}` }), {
        headers: header()
      }).then(response => {
        this.setRhsNotInService(response.data)
      })
    },
    attachRhService () {
      let data = {
        rh_id: this.rhNotInService.id,
        service_id: this.service.id
      }
      data = Object.assign(this.rhServiceFields, data)
      this.$http.post(this.$api({ target: 'rhs-service' }), data, {
        headers: header()
      }).then(() => {
        this.rhSelected = undefined
        this.getRhInService()
        this.getRhNotInService()
        this.isAttachModalOpen = false
      })
    },
    showDetached (e) {
      this.rhSelected = e[0]
      this.isResponseble = !e[1]
    },
    showAttached (e) {
      this.rhSelected = e[0]
      this.isResponseble = e[1]
    },
    detachRh (id) {
      this.rhSelected = undefined
      let data = {
        rh_id: id,
        service_id: this.service.id
      }
      this.$http.post(this.$api({ target: 'rh-service' }), data, {
        headers: header()
      }).then(() => {
        this.getRhInService()
        this.getRhNotInService()
      })
    },
    reset (e) {
      if (e === 'service') {
        this.getRhInService()
      } else {
        this.getRhNotInService()
      }
    }
  },
  components: {
    rhTable,
    rhTableDetails
  }
}