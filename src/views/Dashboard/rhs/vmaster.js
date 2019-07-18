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
moment.locale('pt-BR')
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
      isRhModalActive: false,
      tableSelected: undefined
    }
  },
  computed: {
    userFilters () {
      return this.$store.getters.rhFilters.userFilters
    },
    addressFilters () {
      return this.$store.getters.rhFilters.addressFilters
    },
    rhFilters () {
      return this.$store.getters.rhFilters.rhFilters
    },
    academicFilters () {
      return this.$store.getters.rhFilters.academicFilters
    },
    filterActive () {
      let ret = false
      Object.keys(this.$store.getters.rhFilters).forEach(fi => {
        if (fi === 'name') {
          if (this.$store.getters.rhFilters[fi]) ret = true
        } else {
          if (this.$store.getters.rhFilters[fi].filter(f => f.active).length) ret = true
        }
      })
      return ret
    },
    searchQuery: {
      get () {
        return this.$store.getters.rhFilters.name
      },
      set: _.debounce(function (newQuery) {
        this.setRhQuery(newQuery)
      }, 500)
    },
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
        return this.selected.academics.length > 0 ? this.selected.academics[0].titulation : undefined
      }
    },
    lastRhSelected: {
      get () {
        return this.$store.getters.lastRhSelected
      },
      set (index) {
        this.setLastRhSelected(index)
      }
    }
  },
  watch: {
    isModalActive () {
      this.rhCreated = undefined
    },
    isRhModalActive () {
      this.rhCreated = undefined
    },
    searchQuery (newQuery, oldQuery) {
      if (newQuery === '' || newQuery === oldQuery) this.restoreRhs()
      else this.filter()
    },
    // searchQuery: _.debounce(function (newQuery, oldQuery) {
    //   this.rhSelected = undefined
    //   if (newQuery === '' && newQuery === oldQuery) {
    //     this.getRhs(this)
    //   } else {
    //     this.searchRh(newQuery)
    //   }
    // }, 500),
    selected (newVal) {
      if (this.rhs.length > 0) {
        this.$router.push({ name: 'rh', params: { rh_id: newVal.id } })
      }
    }
  },
  // activated () {
  //   if (this.selected) {
  //     if (this.rhSelected) this.$router.push({ name: 'rh', params: { rh_id: this.rhSelected.id } })
  //     else this.$router.push({ name: 'rh', params: { rh_id: this.selected.id } })
  //   }
  // },
  beforeMount () {
    if (this.filterActive) {
      this.filter()
    } else {
      this.getRhs(this).then(rhs => {
        if (rhs.length) {
          this.rhs = rhs
          this.rhSelected = rhs[this.lastRhSelected !== undefined ? this.lastRhSelected : 0]
        }
      })
    }
    this.currentPage = Math.ceil(this.selectedIndex / this.perPage) || 1
  },
  beforeDestroy () {
    this.lastRhSelected = this.selectedIndex
  },
  methods: {
    ...mapActions([
      'getRhs',
      'setRhs',
      'updateRh',
      'setRhSelected',
      'setLastRhSelected',
      'restoreRhFilters',
      'setRhQuery',
      'setRhFilters'
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
    filter () {
      let data = {
        name: this.searchQuery,
        userFilters: this.userFilters.filter(f => f.active),
        rhFilters: this.rhFilters.filter(f => f.active),
        addressFilters: this.addressFilters.filter(f => f.active),
        academicFilters: this.academicFilters.filter(f => f.active)
      }
      this.$http.post(this.$api({ target: 'filter-rh' }), data, {
        headers: header()
      }).then(response => {
        this.rhs = response.data
        this.rhSelected = response.data[this.lastRhSelected !== undefined ? this.lastRhSelected : 0]
        this.isFilterModalActive = false
      })
    },
    restoreRhs () {
      this.getRhs(this).then(rhs => {
        this.rhs = rhs
        this.rhSelected = rhs[this.lastRhSelected !== undefined ? this.lastRhSelected : 0]
      })
      this.restoreRhFilters()
    },
    searchUserByDocument (document) {
      this.$http.post(this.$api({ target: 'search-rh-document' }), { document: document }, {
        headers: header()
      }).then(response => {
        console.log(response)
        this.rhs = response.data
        this.rhSelected = response.data[0]
      })
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
