<template>
  <main id="clients" v-if="selected">
    <div class="info">
      <div class="content" v-if="selected !== undefined">
        <div class="basic">
          <h3>
            Cliente
            <div id="edit" @click="isEditActive = true">
              <b-icon icon="edit"></b-icon>
            </div>
          </h3>
          <client :person="selected" ></client>
        </div>
        <div class="others">
          <h3>Outros</h3>
          <b-field label="Observações">
            <div class="textarea" v-html="selected.observations"></div>
            <!-- <textarea v&#45;model="" name="" id="" cols="30" rows="11" style="width: 100%" disabled></textarea> -->
          </b-field>
          <b-field label="Atividade">
            <b-input v-model="selected.activity" placeholder="Produçaõ de PANIC" disabled></b-input>
          </b-field>
        </div>
      </div>
      <div class="tableClients">
        <div class="headerTable">
          <h4>Clientes</h4>
          <button class="buttons is-primary" @click="isModalActive = true">Cadastrar novo cliente</button>
          <b-input placeholder="Procurar..." v-model="searchQuery"></b-input>
        </div>
        <b-table :data="clients" :selected.sync="selected" :paginated="true" :per-page="5" focusable>
          <template slot-scope="props">
            <b-table-column field="name" label="NOME" sortable>
              {{ props.row.name }}
            </b-table-column>
            <b-table-column field="created_at" label="CADASTRO">
              {{ parseDate(props.row.created_at) }}
            </b-table-column>
            <b-table-column field="user.email" label="EMAIL">
              {{ props.row.user.email }}
            </b-table-column>
            <b-table-column field="phone" label="TELEFONE">
              {{ props.row.phone }}
            </b-table-column>
          </template>
        </b-table>
      </div>
    </div>
    <b-modal :active.sync="isModalActive">
      <!--   Create client or display message    -->
      <component :is="parseModal()" @clientCreated="clientCreated = true" @creationFailed="clientCreated = false">
        <template v-slot:message>
            <h2>{{ clientCreated ? 'Sucesso ao cadastrar um cliente' : 'Algo de errado aconteceu' }}</h2>
        </template>
      </component>
    </b-modal>
    <b-modal :active.sync="isEditActive">
      <edit-client :client="selected" :selectedIndex="selectedIndex" @updated="userSelected = clients[selectedIndex]"></edit-client>
    </b-modal>
  </main>
</template>

<script>
import { mapActions } from 'vuex'
import createClient from './client/create.vue'
import editClient from './client/edit.vue'
import success from './common/create-messages/success'
import error from './common/create-messages/error'
import client from './common/ComponentGeneric.vue'
import moment from 'moment'
import _ from 'lodash'
import { header } from '../../config/index.js'
export default {
  name: 'clients',
  data () {
    return {
      searchQuery: '',
      clientCreated: undefined,
      isModalActive: false,
      isEditActive: false,
      userSelected: undefined
    }
  },
  computed: {
    clients: {
      get () {
        return this.$store.getters.clients
      },
      set (newVal) {
        this.changeClients(newVal)
      }
    },
    selected: {
      get () {
        return this.userSelected ? this.userSelected : this.clients[0]
      },
      set (newVal) {
        this.userSelected = newVal
      }
    },
    selectedIndex () {
      return this.clients.findIndex(client => client.id === this.selected.id)
    }
  },
  watch: {
    isModalActive (newVal) {
      if (!newVal) this.clientCreated = undefined
    },
    searchQuery: _.debounce(function (newQuery, oldQuery) {
      this.userSelected = undefined
      if (newQuery === '' && newQuery === oldQuery) {
        this.getClients(this)
      } else {
        this.searchClient(newQuery)
      }
    }, 500),
    selected (newVal) {
      this.$router.push({ name: 'client', params: { client_id: newVal.id } })
    }
  },
  beforeRouteEnter (to, from, next) {
    next($this => {
      if ($this.userSelected) next({ name: 'client', params: { client_id: $this.userSelected.id } })
    })
  },
  beforeMount () {
    this.getClients(this)
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'getClients',
      'changeClients',
      'updateClient',
      'updateUser',
      'updateAddress'
    ]),
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
    searchClient (name) {
      this.$http.get(this.$api({ target: 'client' }), {
        headers: header(),
        params: {
          search: name
        }
      }).then(response => {
        this.clients = response.data
      })
    }
  },
  components: {
    createClient,
    client,
    editClient,
    success,
    error
  }
}
</script>
