import moment from 'moment'
import createRh from '../rhs/create.vue'
import success from './create-messages/success'
import error from './create-messages/error'
import _ from 'lodash'
import { mapActions } from 'vuex'
moment.locale('pt-BR')
export default {
  name: 'rhTable',
  props: {
    rhs: {
      required: true,
      type: Array
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
    selectedIndex: {
      type: Number
    }
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
      isAttachModalOpen: false,
      isModalActive: false,
      tableSelected: undefined,
      rhCreated: undefined,
      isCost: false,
      isCity: false,
      isExperience: false,
      searchRh: null,
      searchDocument: null,
      currentPage: 1,
      perPage: 5,
      isFilterModalActive: false,
      rhServiceFields: {
        cost: null,
        hours: null,
        goal: null
      }
    }
  },
  computed: {
    selected: {
      get () {
        return this.tableSelected ? this.tableSelected : this.rhs[this.selectedIndex]
      },
      set (newVal) {
        this.tableSelected = newVal
      }
    },
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
      return this.$store.getters.rhFilters.academicFilters
    }
  },
  watch: {
    '$store.getters.rhs' () {
      this.tableSelected = this.rhs[this.selectedIndex]
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
        this.tableSelected = this.rhs[this.selectedIndex]
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
<<<<<<< HEAD
    resetFilters () {
      // if (this.isFilterModalActive === false) {
      //   this.searchRh = ''
      // } else {
      //   this.basicFilter.forEach(function (item) {
      //     item.active = false
      //     item.value = null
      //     item.operator = null
      //   })
      //   this.academicFilter.forEach(function (item) {
      //     item.active = false
      //     item.value = null
      //   })
      //   this.isFilterModalActive = false
      // }
      // this.$emit('reset', 'notService')
    },
=======
>>>>>>> 2b5ee90bc63e0395643f0eb0756dfa10141f1149
    filter (name) {
      let data = {
        name: name,
        userFilters: this.userFilters.filter(f => f.active),
        rhFilters: this.rhFilters.filter(f => f.active),
        addressFilters: this.addressFilters.filter(f => f.active),
        academicFilters: this.academicFilters.filter(f => f.active)
      }
      this.$emit('filter', data)
    }
  },
  components: {
    createRh,
    success,
    error
  }
}
