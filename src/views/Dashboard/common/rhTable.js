import moment from 'moment'
import createRh from '../rhs/create.vue'
import success from './create-messages/success'
import error from './create-messages/error'
import _ from 'lodash'
import { mapActions } from 'vuex'
import dataTable from '../../../mixins/dataTable.js'
moment.locale('pt-BR')
export default {
  name: 'rhTable',
  mixins: [dataTable],
  props: {
    create: {
      default: true
    },
    filters: {
      default: true
    },
    attach: {
      default: false
    },
    service_id: Number
  },
  data () {
    return {
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: true
      },
      operator: [
        '>',
        '<',
        '='
      ],
      searchRh: null,
      searchDocument: null,
      isAttachModalOpen: false,
      isModalActive: false,
      rhCreated: undefined,
      isCost: false,
      isCity: false,
      isExperience: false,
      isFilterModalActive: false,
      rhServiceFields: {
        cost: null,
        hours: null,
        goal: null
      }
    }
  },
  computed: {
    filterActive () {
      let ret = false
      Object.keys(this.$store.getters.rhFilters).forEach(fi => {
        if (this.$store.getters.rhFilters[fi].filter(f => f.active).length) ret = true
      })
      return ret
    },
    userFilters () {
      return this.$store.getters.rhFilters.userFilters
    },
    rhFilters () {
      return this.$store.getters.rhFilters.rhFilters
    },
    academicFilters () {
      return this.$store.getters.rhFilters.academicFilters
    },
    addressFilters () {
      return this.$store.getters.rhFilters.addressFilters
    }
  },
  watch: {
    '$store.getters.rhs' () {
      this.tableSelected = this.resources[this.selectedIndex]
    },
    searchDocument: _.debounce(function (newQuery, oldQuery) {
      this.searchQuery = ''
      if (newQuery === '') this.$emit('restore')
      else {
        this.$emit('searchByDocument', newQuery)
      }
    }, 500),
    searchRh: _.debounce(function (newVal, oldVal) {
      this.rhSelected = undefined
      if (newVal === '' || newVal === oldVal) {
        this.tableSelected = this.resources[this.selectedIndex]
        // this.$emit('restore')
        if (this.filterActive) this.filter()
        else this.$emit('restore')
      } else {
        this.filter(newVal)
      }
    }, 500)
  },
  beforeMount () {
    this.currentPage = Math.ceil(this.selectedIndex / this.perPage) || 1
  },
  methods: {
    ...mapActions([
      'setRhs',
      'getRhs',
      'changeRh',
      'setRhFilters'
    ]),
    parseFilters (payload) {
      this.setRhFilters(payload)
    },
    parseDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    parseModal () {
      if (this.rhCreated === undefined) {
        return 'createRh'
      } else if (this.rhCreated === true) {
        return 'success'
      }
      return 'error'
    },
    filter (name) {
     this.$emit('filter')
    }
  },
  components: {
    createRh,
    success,
    error
  }
}
