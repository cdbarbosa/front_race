<template>
  <main id="clients" >
    <div id="info">
      <router-view></router-view>
    </div>
    <div class="tableClients">
      <div class="headerTable">
        <h4>Clientes</h4>
        <router-link class="buttons is-primary" tag="button" :to="{ name: 'createClient'}">
          Cadastrar novo cliente
        </router-link>
        <!-- <button class="buttons is-primary">Cadastrar novo cliente</button> -->
        <b-input placeholder="Procurar..."></b-input>
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
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
export default {
  name: 'clients',
  data () {
    return {
      // radio: '',
      userSelected: undefined
    }
  },
  computed: {
    ...mapGetters([
      'clients'
    ]),
    selected: {
      get () {
        return this.userSelected ? this.userSelected : this.clients[0]
      },
      set (newValue) {
        console.log(newValue)
      }
    }
  },
  beforeMount () {
    this.getClients(this)
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'getClients'
    ]),
    parseDate (date) {
      return moment().format('DD/MM/YYYY')
    }
  }
}
</script>
