import moment from 'moment'
export default {
  props: {
    resources: {
      required: true
    },
    selectedIndex: {
      type: Number
    }
  },
  data () {
    return {
      tableSelected: null,
      currentPage: 1,
      perPage: 5
    }
  },
  computed: {
    selected: {
      get () {
        return this.tableSelected ? this.tableSelected : this.resources[this.selectedIndex]
      },
      set (newVal) {
        this.tableSelected = newVal
      }
    }
  },
  methods: {
    parseDate (date) {
      return moment(date).format('DD/MM/YYYY')
    }
  }
}
