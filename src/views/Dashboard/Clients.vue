<template>
  <main id="clients">
    <h3>
      Cliente
      <div id="edit" @click="isEditActive = true" v-if="selected">
        <b-icon icon="edit"></b-icon>
      </div>
    </h3>
    <div class="content" v-if="selected">
      <generic-user :person="selected"></generic-user>
      <section>
        <b-field label="Observações">
          <div class="textarea __disabled" v-html="selected.observations"></div>
          <!-- <textarea v&#45;model="" name="" id="" cols="30" rows="11" style="width: 100%" disabled></textarea> -->
        </b-field>
        <b-field label="Atividade">
          <b-input v-model="selected.activity" placeholder="Produçaõ de PANIC" disabled></b-input>
        </b-field>
      </section>
    </div>
    <div class="content" v-else>
      <h2>Nenhum cliente cadastrado ou encontrado</h2>
    </div>
    <div class="content __display">
      <section class="__secundary">
        <div class="tableContainer">
          <header>
            <h4>Clientes</h4>
            <button class="buttons is-primary" @click="isModalActive = true">Cadastrar novo cliente</button>
            <b-input placeholder="Procurar..." v-model="searchQuery"></b-input>
          </header>
          <b-table :data="clients ? clients : []" :selected.sync="selected" :paginated="true" :per-page="5" focusable>
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
            <template slot="empty">
              <section class="section">
                <div class="empty has-text-grey has-text-centered">
                  <p>
                    <b-icon icon="frown" size="is-large"></b-icon>
                  </p>
                  <p>Nothing here.</p>
                </div>
              </section>
            </template>
          </b-table>
        </div>
      </section>
    </div>
    <b-modal :active.sync="isModalActive">
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
import genericUser from './common/genericUser.vue'
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
        this.getClients(this).then(clients => {
          console.log(clients)
        })
      } else {
        this.searchClient(newQuery)
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
      if (this.userSelected) this.$router.push({ name: 'client', params: { client_id: this.userSelected.id } })
      else this.$router.push({ name: 'client', params: { client_id: this.clients[0].id } })
    }
  },
  created () {
    this.getClients(this).then(clients => {
      this.setClients(clients)
    })
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'getClients',
      'setClients',
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
    genericUser,
    editClient,
    success,
    error
  }
}
</script>
