<template id="">
  <main id="master">
    <h3>
      Cliente
      <div @mouseenter="restoreClientSelected()" id="edit" @click="clientSelected ? (clientSelected.lock ? null : isEditActive = true) : null">
        <b-tooltip v-if="clientSelected" label="Cliente em edição" type="is-danger" :active="clientSelected.lock === 1">
          <b-icon icon="edit"></b-icon>
        </b-tooltip>
        <b-icon v-else icon="edit"></b-icon>
      </div>
      <button id="createButton" class="buttons is-primary" @click="isModalActive = true">Cadastrar novo cliente</button>
    </h3>
    <div class="content __display">
      <section class="__secundary">
        <div class="tableContainer">
          <header>
            <h4>Clientes</h4>
            <b-input placeholder="Procurar por nome" v-model="searchQuery"></b-input>
            <b-input placeholder="Procurar por documento" v-mask="['###.###.###-##','##.###.###/####-##']" v-model="searchDocument"></b-input>
            <span @click="restoreClients">
              <i class="fas fa-backspace"></i>
            </span>
            <div id="filter" :class="{ __filterActive: filterActive }" @click="isFilterModal = true">
              <b-icon icon="cog"></b-icon>
            </div>
          </header>
          <b-table :data="clients" :selected.sync="selected" @update:selected="setClientSelected($event)" :paginated="true" :per-page="perPage" :current-page.sync="currentPage" focusable>
            <template slot-scope="props">
              <b-table-column field="name" label="Nome" sortable>
                {{ props.row.name.length > 130 ? props.row.name.slice(0, 130) + ' ...' : props.row.name }}
              </b-table-column>
              <b-table-column field="user.document" label="CPF/CNPJ">
                {{ props.row.user.document }}
              </b-table-column>
              <b-table-column field="user.email" label="Email">
                <a :href="`mailto:${props.row.user.email}`" target="_blank">{{ props.row.user.email }}</a>
              </b-table-column>
              <b-table-column field="phone" label="Telefone">
                {{ props.row.phone }}
              </b-table-column>
              <b-table-column label="Completo" field="completed" :title="props.row.completed ? 'Completo' : 'Incompleto'" width="" centered>
                <span :class="[{ __completed: props.row.completed }, 'signal']"></span>
              </b-table-column>
            </template>
            <template slot="empty">
              <section class="section">
                <div class="empty has-text-grey has-text-centered">
                  <p>
                    <b-icon icon="frown" size="is-large"></b-icon>
                  </p>
                  <p>Nenhum cliente encontrado.</p>
                  <p v-if="filterActive">Seus filtros estão ativos.</p>
                </div>
              </section>
            </template>
          </b-table>
        </div>
      </section>
    </div>
    <div class="content" v-if="clientSelected">
      <generic-user :person="clientSelected"></generic-user>
      <section>
        <b-field label="Observações">
          <div class="ql-editor textarea __disabled" v-html="clientSelected.observations"></div>
        </b-field>
        <b-field label="Atividade">
          <div class="ql-editor textarea __disabled" v-html="clientSelected.activity"></div>
          <!-- <b&#45;input v&#45;model="clientSelected.activity" placeholder="Produçaõ de PANIC" disabled></b&#45;input> -->
        </b-field>
      </section>
    </div>
    <div class="content" v-else>
      <h2>Nenhum cliente cadastrado ou encontrado</h2>
    </div>
    <b-modal :active.sync="isModalActive">
      <component :is="parseModal()" @clientCreated="clientCreated = true; isModalActive = false" @creationFailed="clientCreated = false; creationErros = $event">
        <template v-slot:message>
          <h2>{{ clientCreated ? 'Sucesso ao cadastrar um cliente' : 'Algo de errado aconteceu' }}</h2>
          <span class="error" v-for="(err, index) in creationErros" :key="index">
            {{ err[0] }}
          </span>
        </template>
      </component>
    </b-modal>
    <b-modal :onCancel="restoreClientSelected" :active.sync="isEditActive">
      <edit-client :client="clientSelected" :selectedIndex="selectedIndex" @updated="isEditActive = false; isEditActive = false"></edit-client>
    </b-modal>
    <b-modal :active.sync="isFilterModal">
      <filters-client @restore="restoreClients(); isFilterModal = false" @filter="get(); isFilterModal = false"></filters-client>
    </b-modal>
  </main>
</template>
<script>
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
      ],
      creationErros: []
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
        if (fi !== 'name') {
          if (this.$store.getters.clientFilters[fi].filter(f => f.active).length) ret = true
          // if (this.$store.getters.clientFilters[fi]) ret = true
        } else {
        }
      })
      return ret
    },
    searchQuery: {
      get () {
        return this.$store.getters.clientFilters.name
      },
      set: _.debounce(function (newQuery) {
        this.setClientQuery(newQuery)
      }, 500)
    },
    lastClientSelected: {
      get () {
        return this.$store.getters.lastClientSelected
      },
      set (index) {
        this.setLastClientSelected(index >= 0 ? index : 0)
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
    isEditActive (newVal) {
      if (newVal) {
        setTimeout(() => {
          console.log('time is ticking')
          this.isEditActive = false
        }, 10 * 60 * 1000)
      }
    },
    clientCreated () {
      this.get()
    },
    clients () {
      this.tableSelected = this.clients[this.selectedIndex]
    },
    isModalActive (newVal) {
      if (!newVal) this.clientCreated = undefined
    },
    searchQuery (newQuery) {
      if (newQuery === '' || newQuery === null) {
        if (!this.searchDocument) this.restoreClients()
      } else this.filterClients()
    },
    searchDocument: _.debounce(function (newQuery) {
      if (newQuery === '') this.restoreClients()
      else this.searchUserByDocument(newQuery)
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
    this.get()
    this.currentPage = Math.ceil((this.selectedIndex + 1) / this.perPage) || 1
    if (this.filterActive) {
      this.filterClients()
    } else {
      this.getClients(this).then(clients => {
        if (clients.length) {
          this.clients = clients
          this.clientSelected = clients[this.lastClientSelected !== undefined ? this.lastClientSelected : 0]
        }
      })
    }
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
      'restoreClientFilters',
      'setClientQuery'
    ]),
    get () {
      if (this.filterActive || this.$store.getters.clientFilters.name) this.filterClients()
      else this.getAllClients()
    },
    getAllClients () {
      this.getClients(this).then(clients => {
        if (clients.length) {
          this.clients = clients
          this.clientSelected = clients[this.lastClientSelected !== undefined ? this.lastClientSelected : 0]
        }
      })
    },
    filterClients (event) {
      let data = {
        name: this.searchQuery,
        userFilters: this.userFilters.filter(f => f.active),
        addressFilters: this.addressFilters.filter(f => f.active),
        clientFilters: this.clientFilters.filter(f => f.active)
      }
      this.$http.post(this.$api({
        target: 'filter-client',
        conn: this.$store.getters.conn
      }), data, {
        headers: header()
      }).then(response => {
        this.clients = response.data
        this.clientSelected = response.data.length ? response.data[this.lastClientSelected !== undefined ? this.lastClientSelected : 0] : null
        this.isFilterModal = false
      })
    },
    restoreClients () {
      this.restoreClientFilters()
      this.get()
      this.currentPage = Math.ceil((this.selectedIndex + 1) / this.perPage) || 1
      // if (!this.document) {
      //   this.tableSelected = this.clients[this.selectedIndex]
      //   this.restoreClientFilters()
      //   this.getClients(this).then(clients => {
      //     this.clients = clients
      //     this.clientSelected = clients[this.lastClientSelected !== undefined ? this.lastClientSelected : 0]
      //   })
      // }
    },
    restoreClientSelected () {
      this.$http.get(this.$api({
        target: `client/${this.selected.id}`,
        conn: this.$store.getters.conn
      }), {
        headers: header()
      }).then(response => {
        this.updateClient([response.data, this.selectedIndex])
        // this.setClientSelected(this.clients[this.selectedIndex])
      })
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
    searchUserByDocument (document) {
      this.$http.post(this.$api({
        target: 'search-client-document',
        conn: this.$store.getters.conn
      }), { document: document }, {
        headers: header()
      }).then(response => {
        this.clients = response.data
        this.clientSelected = response.data[0]
        this.isFilterModal = false
        this.searchQuery = ''
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
</script>
