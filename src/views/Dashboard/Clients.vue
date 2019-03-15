<template>
  <main id="clients" v-if="clients.length">
    <div id="info">
      <div class="information" v-if="selected !== undefined">
        <div class="client">
          <h3>Cliente</h3>
          <div class="info-first">
            <b-field label="Nome">
              <b-input v-model="selected.name" placeholder="Nome"></b-input>
            </b-field>
            <b-field label="ID">
              <b-input v-model="selected.id" placeholder="23" disabled></b-input>
            </b-field>
          </div>
          <div class="info-second">
            <b-field label="Cadastro">
              <b-input :value="parseDate(selected.created_at)" v-mask="'##/##/####'" disabled></b-input>
            </b-field>
            <b-field label="Telefone">
              <b-input v-model="selected.phone" v-mask="'(##) # ####-####'" placeholder="Telefone"></b-input>
            </b-field>
          </div>
          <div class="info-second">
            <b-field label="Email">
              <b-input v-model="selected.user.email" type="email" placeholder="example@example.com"></b-input>
            </b-field>
            <div class="block">
              <b-radio v-model="selected.user.type.name" native-value="1">
                Fisico
              </b-radio>
              <b-radio v-model="selected.user.type.name" native-value="2">
                Juridico
              </b-radio>
            </div>
          </div>
          <b-field label="CPF/CNPJ">
            <b-input v-model="selected.user.document" v-mask="['###.###.###-##', '##.###.###/####-##']" placeholder="cpf" disabled></b-input>
          </b-field>
          <div class="address">
            <h3>Endereço</h3>
            <div class="info-three">
              <b-field label="Rua">
                <b-input v-model="selected.user.address.address" placeholder="Rua"></b-input>
              </b-field>
              <b-field label="Estado">
                <b-input v-model="selected.user.address.state" placeholder="ES"></b-input>
              </b-field>
            </div>
            <div class="info-fourth">
              <b-field label="CEP">
                <b-input v-model="selected.user.address.postal_code" v-mask="'##.###-###'" placeholder="CEP"></b-input>
              </b-field>
              <b-field label="Bairro">
                <b-input v-model="selected.user.address.neighborhood" placeholder="Bairro"></b-input>
              </b-field>
              <b-field label="Cidade">
                <b-input v-model="selected.user.address.city" placeholder="Cidade"></b-input>
              </b-field>
            </div>
          </div>
        </div>
        <div class="others">
          <h3>Outros</h3>
          <b-field label="Observações">
            <textarea name="" id="" cols="30" rows="11" style="width: 100%"></textarea>
          </b-field>
          <b-field label="Atividade">
            <b-input placeholder="Produçaõ de PANIC"></b-input>
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
      <component :is="parseModal()" @clientCreated="clientCreated = true" @creationFailed="clientCreated = false"></component>
    </b-modal>
  </main>
</template>

<script>
import { mapActions } from 'vuex'
import createClient from './client/create.vue'
import success from './common/create-messages/success'
import error from './common/create-messages/error'
import moment from 'moment'
import _ from 'lodash'
import { header } from '../../config/index.js'
// import { log } from 'util'
export default {
  name: 'clients',
  data () {
    return {
      searchQuery: '',
      clientCreated: undefined,
      isModalActive: false,
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
    }
  },
  watch: {
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
    },
    'selected.name': _.debounce(function (newVal, oldVal) {
      // this.updateClient([this, { 'id': this.selected.id, 'label': 'name', 'value': newVal }])
    }, 500),
    'selected.phone': _.debounce(function (newVal) {
      // this.updateClient([this, { 'id': this.selected.id, 'label': 'phone', 'value': newVal }])
    }, 500),
    'selected.user.email': _.debounce(function (newVal) {
      // this.updateUser([this, { 'id': this.selected.user.id, 'label': 'email', 'value': newVal }])
    }, 500),
    'selected.user.address.address': _.debounce(function (newVal) {
      // this.updateAddress([this, ])
    }, 500),
    'selected.user.address.state': _.debounce(function (newVal) {
      // this.updateAddress([this, ])
    }, 500),
    'selected.user.address.postal_code': _.debounce(function (newVal) {
      // this.updateAddress([this, ])
    }, 500),
    'selected.user.address.neighborhood': _.debounce(function (newVal) {
      // this.updateAddress([this, ])
    }, 500),
    'selected.user.address.city': _.debounce(function (newVal) {
      // this.updateAddress([this, ])
    }, 500)
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
    success,
    error
  }
}
</script>
