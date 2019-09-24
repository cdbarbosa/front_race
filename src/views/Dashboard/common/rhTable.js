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
    mode: {
      default: 'neutral'
    },
    setFunction: {
      type: Function
    },
    getStore: {
      default: 'rhFilters'
    },
    document: {
      default: true
    },
    create: {
      default: true
    },
    filters: {
      default: true
    },
    attach: {
      default: false
    },
    service_id: Number,
    filterActive: Boolean
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
    completedFilter () {
      return this.$store.getters[this.getStore].rhFilters[0]
    },
    userFilters () {
      return this.$store.getters[this.getStore].userFilters
    },
    rhFilters () {
      return this.$store.getters[this.getStore].rhFilters.slice(1)
      // return b.slice(0, 2)
    },
    academicFilters () {
      return this.$store.getters[this.getStore].academicFilters
    },
    addressFilters () {
      return this.$store.getters[this.getStore].addressFilters
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
        this.$emit('filter')
      } else {
        this.$emit('filter')
      }
    }, 500)
  },
  methods: {
    ...mapActions([
      'setRhs',
      'getRhs',
      'changeRh',
      'setRhFilters'
    ]),
    parseFilters (payload) {
      this.setFunction(payload)
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
    }
  },
  components: {
    createRh,
    success,
    error
  }
}
