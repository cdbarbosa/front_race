import { mapActions } from 'vuex'
import createRh from './create.vue'
import editRh from './edit.vue'
import rhTable from '../common/rhTable.vue'
import genericUser from '../common/genericUser.vue'
import success from '../common/create-messages/success'
import error from '../common/create-messages/error'
import moment from 'moment'
import { header } from '../../../config/index.js'
import _ from 'lodash'
export default {
  name: 'masterRh',
  data () {
    return {
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: true
      },
      isEditActive: false,
      rhCreated: undefined,
      isModalActive: false,
      searchQuery: undefined,
      tableSelected: undefined
    }
  },
  computed: {
    selected: {
      get () {
        return this.rhSelected ? this.rhSelected : this.rhs[0]
      },
      set (newVal) {
        this.rhSelected = newVal
      }
    },
    rhSelected: {
      get () {
        return this.$store.getters.rhSelected
      },
      set (newVal) {
        this.setRhSelected(newVal)
      }
    },
    rhs: {
      get () {
        return this.$store.getters.rhs
      },
      set (rhs) {
        this.setRhs(rhs)
      }
    },
    selectedIndex () {
      return this.rhs.findIndex(rh => rh.id === this.rhSelected.id)
    },
    area: {
      get () {
        return this.selected.academics.length > 0 ? this.selected.academics[0].area : undefined
      }
    },
    degree: {
      get () {
        return this.selected.academics.length > 0 ? this.selected.academics[0].degree : undefined
      }
    }
  },
  watch: {
    isModalActive () {
      this.rhCreated = undefined
    },
    searchQuery: _.debounce(function (newQuery, oldQuery) {
      console.log(newQuery)
      this.rhSelected = undefined
      if (newQuery === '' && newQuery === oldQuery) {
        this.getRhs(this)
      } else {
        this.searchRh(newQuery)
      }
    }, 500),
    selected (newVal) {
      if (this.rhs.length > 0) {
        this.$router.push({ name: 'rh', params: { rh_id: newVal.id } })
      }
    }
  },
  activated () {
    if (this.selected) {
      if (this.rhSelected) this.$router.push({ name: 'rh', params: { rh_id: this.rhSelected.id } })
      else this.$router.push({ name: 'rh', params: { rh_id: this.selected.id } })
    }
  },
  beforeMount () {
    this.getRhs(this).then(rhs => {
      this.rhs = rhs
    })
    // console.log(this.rhs[0].academics)
  },
  methods: {
    ...mapActions([
      'getRhs',
      'setRhs',
      'updateRh',
      'setRhSelected'
    ]),
    restoreRhSelected () {
      this.setRhSelected(this.rhs[this.selectedIndex])
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
    filter (e) {
      this.$http.post(this.$api({ target: 'rh-filter' }), e, {
        headers: header()
      }).then(response => {
        this.rhs = response.data
        this.isFilterModalActive = false
      })
    },
    reset (e) {
      this.getRhs(this).then(rhs => {
        this.rhs = rhs
      })
      this.rhSelected = this.rhs[0]
    }
  },
  components: {
    rhTable,
    createRh,
    genericUser,
    editRh,
    success,
    error
  }
}
