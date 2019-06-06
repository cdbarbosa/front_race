import { header } from '../../../config/index.js'
import { mapActions, mapGetters } from 'vuex'
import _ from 'lodash'
import moment from 'moment'
import rhTable from '../common/rhTable.vue'
import rhTableDetails from './details/rhTable.vue'
moment.locale('pt-BR')
export default {
  name: 'serviceDetails',
  data () {
    return {
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false /* doesn't work with directive */
      },
      rhServiceFields: {
        cost: 0.00,
        hours: null,
        goal: null
      },
      serviceTableOptions: {
        filter: false,
        search: false,
        link: true
      },
      isEditModal: false,
      isAttachModalOpen: false,
      rhNotInServiceSelected: null,
      rhInServiceSelected: null,
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
    userFilters () {
      return this.$store.getters.rhNotInServiceFilters.userFilters
    },
    addressFilters () {
      return this.$store.getters.rhNotInServiceFilters.addressFilters
    },
    rhFilters () {
      return this.$store.getters.rhNotInServiceFilters.rhFilters
    },
    academicFilters () {
      return this.$store.getters.rhNotInServiceFilters.academicFilters
    },
    filterActive () {
      let ret = false
      Object.keys(this.$store.getters.rhNotInServiceFilters).forEach(fi => {
        if (fi === 'name') {
          if (this.$store.getters.rhNotInServiceFilters[fi]) ret = true
        } else {
          if (this.$store.getters.rhNotInServiceFilters[fi].filter(f => f.active).length) ret = true
        }
      })
      return ret
    },
    searchQueryNotInService: {
      get () {
        return this.$store.getters.rhNotInServiceFilters.name
      },
      set: _.debounce(function (newQuery) {
        this.setRhNotInServiceQuery(newQuery)
      }, 500)
    },
    selected: {
      get () {
        return this.rhSelected ? this.rhSelected : (this.rhsService === undefined ? undefined : this.rhsService[0])
      },
      set (newValue) {
        this.rhSelected = newValue
      }
    },
    rhInServiceSelectedIndex () {
      return this.rhInServiceSelected ? this.rhsInService.findIndex(rh => rh.id === this.rhInServiceSelected.id) : 0
    },
    rhNotInServiceSelectedIndex () {
      return this.rhNotInServiceSelected ? this.rhsNotInService.findIndex(rh => rh.id === this.rhNotInServiceSelected.id) : 0
    }
  },
  watch: {
    rhNotInService (newVal) {
      this.rhServiceFields.cost = parseFloat(newVal.cost)
    },
    searchQueryNotInService (newQuery) {
      if (newQuery === '') {
        if (this.filterActive) this.filterRhNotInService()
        else this.restoreRhNotInService()
      } else this.filterRhNotInService()
    }
  },
  // activated () {
  //   if (this.selected) {
  //     if (this.serviceSelected) this.$router.push({ name: 'serviceDetails', params: { service_id: this.serviceSelected.id } })
  //     else this.$router.push({ name: 'serviceDetails', params: { service_id: this.selected.id } })
  //   }
  // },
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
      'updateRh',
      'setRhNotInServiceFilters',
      'restoreRhNotInServiceFilters',
      'setRhNotInServiceQuery'
    ]),
    restoreRhNotInService () {
      this.getRhNotInService()
      this.restoreRhNotInServiceFilters()
    },
    filterRhNotInService () {
      let data = {
        service_id: this.$store.getters.serviceSelected.id,
        name: this.searchQueryNotInService,
        userFilters: this.userFilters.filter(f => f.active),
        rhFilters: this.rhFilters.filter(f => f.active),
        addressFilters: this.addressFilters.filter(f => f.active),
        academicFilters: this.academicFilters.filter(f => f.active)
      }
      this.$http.post(this.$api({ target: 'filter-rh-not-in-service' }), data, {
        headers: header()
      }).then(response => {
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
    restoreRhServiceFields () {
      this.rhServiceFields = {
        cost: this.rhNotInServiceSelected.cost,
        hours: null,
        goal: null
      }
    },
    restoreRhInServiceSelected () {
      this.setRhInServiceSelected(this.rhsInService[this.rhNotInServiceSelectedIndex])
    },
    setRhNotInServiceSelected (rh) {
      this.rhNotInServiceSelected = JSON.parse(JSON.stringify(rh))
      this.rhServiceFields.cost = parseFloat(rh.cost)
    },
    setRhInServiceSelected (rh) {
      this.rhInServiceSelected = JSON.parse(JSON.stringify(rh))
    },
    editRhAssociated () {
      let data = {
        rh_id: this.rhInServiceSelected.id,
        service_id: this.service.id,
        cost: this.rhInServiceSelected.pivot.cost,
        hours: this.rhInServiceSelected.pivot.hours,
        goal: this.rhInServiceSelected.pivot.goal
      }
      this.$http.post(this.$api({ target: 'rh-service-update' }), data, {
        headers: header()
      }).then(response => {
        this.isEditModal = false
        this.getRhInService()
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
        this.setRhInServiceSelected(response.data[0])
      })
    },
    getRhNotInService () {
      this.$http.get(this.$api({ target: `rhs-not-in-service/${this.$route.params.service_id}` }), {
        headers: header()
      }).then(response => {
        this.setRhsNotInService(response.data)
        this.setRhNotInServiceSelected(response.data[0])
      })
    },
    attachRhService () {
      let data = {
        rh_id: this.rhNotInServiceSelected.id,
        service_id: this.service.id
      }
      data = Object.assign(this.rhServiceFields, data)
      this.$http.post(this.$api({ target: 'rhs-service' }), data, {
        headers: header()
      }).then(() => {
        this.rhSelected = undefined
        this.getRhInService()
        this.getRhNotInService()
        this.restoreRhServiceFields()
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
