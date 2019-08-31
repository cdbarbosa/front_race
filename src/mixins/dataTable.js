import moment from 'moment'
import { mapGetters } from 'vuex'
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
  watch: {
    // serviceSelected (newVal) {
    //   console.log(newVal.status_id, this.selected.status_id)
    //   if (newVal.status_id !== this.selected.status_id) {
    //     this.selected = newVal
    //   }
    // },
    selectedIndex (newVal) {
      this.currentPage = Math.ceil((newVal + 1) / this.perPage) || 1
    }
  },
  beforeMount () {
    this.currentPage = Math.ceil((this.selectedIndex + 1) / this.perPage) || 1
  },
  computed: {
    ...mapGetters([
      'serviceSelected'
    ]),
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
