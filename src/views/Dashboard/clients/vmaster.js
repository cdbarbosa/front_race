import { mapActions } from 'vuex'
import createClient from './create.vue'
import editClient from './edit.vue'
import success from '../common/create-messages/success'
import error from '../common/create-messages/error'
import genericUser from '../common/genericUser.vue'
import filtersClient from './Filters.vue'
import moment from 'moment'
import _ from 'lodash'
import { header } from '../../../config/index.js'
moment.locale('pt-BR')
export default {
  name: 'clients',
  data () {
    return {
      searchQuery: null,
      searchDocument: null,
      clientCreated: undefined,
      isModalActive: false,
      isEditActive: false,
      isFilterModal: false,
      tableSelected: undefined,
      currentPage: 1,
      perPage: 5,
      basicFilter: [
        {
          key: 'observations',
          label: 'Observações',
          value: null,
          active: false
        },
        {
          key: 'activity',
          label: 'Atividades',
          value: null,
          active: false
        }
      ]
    }
  },
  computed: {
    selectedIndex () {
      return this.clients.findIndex(client => client.id === this.clientSelected.id)
    },
    userFilters () {
      return this.$store.getters.clientFilters.userFilters
    },
    addressFilters () {
      return this.$store.getters.clientFilters.addressFilters
    },
    clientFilters () {
      return this.$store.getters.clientFilters.clientFilters
    },
    filterActive () {
      let ret = false
      Object.keys(this.$store.getters.clientFilters).forEach(fi => {
        if (this.$store.getters.clientFilters[fi].filter(f => f.active).length) ret = true
      })
      return ret
    },
    lastClientSelected: {
      get () {
        return this.$store.getters.lastClientSelected
      },
      set (index) {
        this.setLastClientSelected(index)
      }
    },
    selected: {
      get () {
        return this.tableSelected ? this.tableSelected : this.clients[0]
      },
      set (newVal) {
        this.tableSelected = newVal
      }
    },
    clientSelected: {
      get () {
        return this.$store.getters.clientSelected
      },
      set (newVal) {
        this.setClientSelected(newVal)
      }
    },
    clients: {
      get () {
        return this.$store.getters.clients
      },
      set (newVal) {
        this.setClients(newVal)
      }
    }
  },
  watch: {
    clients () {
      this.tableSelected = this.clients[this.selectedIndex]
    },
    isModalActive (newVal) {
      if (!newVal) this.clientCreated = undefined
    },
    searchQuery: _.debounce(function (newQuery, oldQuery) {
      this.tableSelected = undefined
      if (newQuery === '' || newQuery === oldQuery) {
        if (this.filterActive) this.searchClient()
        else this.restoreClients()
      } else {
        this.searchClient(newQuery)
      }
    }, 500),
    searchDocument: _.debounce(function (newQuery, oldQuery) {
      this.searchQuery = ''
      if (newQuery === '') this.restoreClients()
      else {
        this.restoreClientFilters()
        this.searchUserByDocument(newQuery)
      }
    }, 500),
    selected (newVal) {
      if (this.clients.length > 0) {
        this.$router.push({ name: 'client', params: { client_id: newVal.id } })
      }
    }
  },
  activated () {
    if (this.selected) {
      if (this.tableSelected) this.$router.push({ name: 'client', params: { client_id: this.tableSelected.id } })
      else this.$router.push({ name: 'client', params: { client_id: this.clients[0].id } })
    }
  },
  beforeMount () {
    this.getClients(this).then(clients => {
      this.clients = clients
      this.clientSelected = clients[this.lastClientSelected !== undefined ? this.lastClientSelected : 0]
      this.currentPage = Math.ceil(this.selectedIndex / this.perPage) || 1
    })
  },
  beforeDestroy () {
    this.lastClientSelected = this.selectedIndex
  },
  methods: {
    ...mapActions([
      'getClients',
      'setClients',
      'updateClient',
      'updateUser',
      'updateAddress',
      'setClientSelected',
      'setLastClientSelected',
      'restoreClientFilters'
    ]),
    restoreClients () {
      this.tableSelected = this.clients[this.selectedIndex]
      this.getClients(this).then(clients => {
        this.clients = clients
        this.clientSelected = clients[this.lastClientSelected !== undefined ? this.lastClientSelected : 0]
      })
    },
    restoreClientSelected () {
      this.setClientSelected(this.clients[this.selectedIndex])
    },
    log (e) {
      console.log(e)
    },
    parseDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    parseModal () {
      if (this.clientCreated === undefined) {
        return 'createClient'
      } else if (this.clientCreated === true) {
        return 'success'
      }
      return 'error'
    },
    resetFilters () {
      this.getClients(this).then(clients => {
        this.clients = clients
        this.clientSelected = clients[0]
      })
      this.tableSelected = this.clients[0]
    },
    searchClient (event) {
      let data = {
        name: this.searchQuery,
        userFilters: this.userFilters.filter(f => f.active),
        addressFilters: this.addressFilters.filter(f => f.active),
        clientFilters: this.clientFilters.filter(f => f.active)
      }
      this.$http.post(this.$api({ target: 'filter-client' }), data, {
        headers: header()
      }).then(response => {
      // console.log(response)
        this.clients = response.data
        this.clientSelected = response.data[0]
        this.isFilterModal = false
      })
    },
    searchUserByDocument (document) {
      this.$http.post(this.$api({ target: 'search-client-document' }), { document: document }, {
        headers: header()
      }).then(response => {
        this.clients = response.data
        this.clientSelected = response.data[0]
        this.isFilterModal = false
      })
    }
  },
  components: {
    createClient,
    genericUser,
    editClient,
    filtersClient,
    success,
    error
  }
}
