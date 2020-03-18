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
      tableSelected: undefined,
      creationErros: []
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
        if (fi !== 'name') {
          // if (this.$store.getters.rhFilters[fi]) ret = true
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
        this.setLastRhSelected(index >= 0 ? index : 0)
      }
    }
  },
  watch: {
    isEditActive (newVal) {
      if (newVal) {
        setTimeout(() => {
          console.log('time is ticking')
          this.isEditActive = false
        }, 10 * 60 * 1000)
      }
    },
    rhCreated () {
      this.get()
    },
    isModalActive () {
      this.rhCreated = undefined
    },
    isRhModalActive () {
      this.rhCreated = undefined
    },
    searchQuery (newQuery, oldQuery) {
      if (newQuery === '' || newQuery === oldQuery) this.get()
      else this.filterRhs()
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
    this.get()
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
    get () {
      if (this.filterActive || this.$store.getters.rhFilters.name) this.filterRhs()
      else this.getAllRhs()
    },
    getAllRhs () {
      this.getRhs(this).then(rhs => {
        if (rhs.length) {
          this.rhs = rhs
          this.rhSelected = rhs[this.lastRhSelected !== undefined ? this.lastRhSelected : 0]
        }
      })
    },
    filterRhs () {
      let data = {
        name: this.searchQuery,
        userFilters: this.userFilters.filter(f => f.active),
        rhFilters: this.rhFilters.filter(f => f.active),
        addressFilters: this.addressFilters.filter(f => f.active),
        academicFilters: this.academicFilters.filter(f => f.active)
      }
      this.$http.post(this.$api({
        target: 'filter-rh',
        conn: this.$store.getters.conn
      }), data, {
        headers: header()
      }).then(response => {
        this.rhs = response.data
        this.rhSelected = response.data.length ? response.data[this.lastRhSelected !== undefined ? this.lastRhSelected : 0] : null
        this.isFilterModalActive = false
      })
    },
    restoreRhSelected () {
      this.$http.get(this.$api({
        target: `rh/${this.selected.user.id}`,
        conn: this.$store.getters.conn
      }), {
        headers: header()
      }).then(response => {
        this.updateRh([response.data, this.selectedIndex])
        // this.setClientSelected(this.clients[this.selectedIndex])
      })
      // this.setRhSelected(this.rhs[this.selectedIndex])
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
    restoreRhs () {
      this.restoreRhFilters()
      if (this.filterActive) {
        this.filterRhs()
      } else {
        this.getRhs(this).then(rhs => {
          if (rhs.length) {
            this.rhs = rhs
            this.rhSelected = rhs[this.lastRhSelected !== undefined ? this.lastRhSelected : 0]
          }
        })
      }
    },
    searchUserByDocument (document) {
      this.$http.post(this.$api({
        target: 'search-rh-document',
        conn: this.$store.getters.conn
      }), { document: document }, {
        headers: header()
      }).then(response => {
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
