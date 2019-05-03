import moment from 'moment'
import createRh from '../rhs/create.vue'
import success from './create-messages/success'
import error from './create-messages/error'
import _ from 'lodash'
import { mapActions } from 'vuex'
// import { header } from '../../../config/index.js'
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
      basicFilter: [
        {
          key: 'cost',
          label: 'Custo',
          value: null,
          active: false,
          operator: null
        },
        {
          key: 'competencies',
          label: 'Competências',
          value: null,
          active: false,
          operator: null
        },
        {
          key: 'activity',
          label: 'Atividades',
          value: null,
          active: false,
          operator: null
        },
        {
          key: 'experience',
          label: 'Experiências',
          value: null,
          active: false,
          operator: null
        },
        {
          key: 'active',
          label: 'Ativo',
          value: null,
          active: false,
          operator: null
        }
      ],
      academicFilter: [
        {
          key: 'area',
          label: 'Área',
          value: null,
          active: false
        },
        {
          key: 'titulation',
          label: 'Titulação',
          value: null,
          active: false
        }
      ],
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
    }
  },
  watch: {
    '$store.getters.rhs' () {
      this.tableSelected = this.rhs[this.selectedIndex]
    },
    searchRh: _.debounce(function (newVal, oldVal) {
      this.rhSelected = undefined
      if (newVal === '' && newVal === oldVal) {
        this.tableSelected = this.rhs[this.selectedIndex]
        this.getRhs(this).then(() => {
          this.resetFilters()
        })
      } else {
        this.filter(newVal)
      }
    }, 500)
  },
  methods: {
    ...mapActions([
      'setRhs',
      'getRhs',
      'changeRh'
    ]),
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
    resetFilters () {
      console.log('Reset Filters')
      if (this.isFilterModalActive === false) {
        this.searchRh = ''
      } else {
        this.basicFilter.forEach(function (item) {
          item.active = false
          item.value = null
          item.operator = null
        })
        this.academicFilter.forEach(function (item) {
          item.active = false
          item.value = null
        })
        this.isFilterModalActive = false
      }
      this.$emit('reset', 'notService')
    },
    filter (title) {
      let data = {
        search: title,
        basicFilter: this.basicFilter.filter(f => f.active),
        academicFilter: this.academicFilter.filter(f => f.active)
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
