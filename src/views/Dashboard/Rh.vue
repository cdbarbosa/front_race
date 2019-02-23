<template>
  <div id="rhs">
    <h2>RH's</h2>
    <div class="info">
      <router-view></router-view>
    </div>
    <div class="serviceTable">
      <div class="headerTable">
        <h4>RH's</h4>
        <router-link tag="button" class="buttons is-primary" :to="{ name: 'rhCreate' }">Cadastrar novo RH</router-link>
        <b-input placeholder="Procurar..."></b-input>
      </div>
       <b-table :data="rhs" :selected.sync="selected" :paginated="true" :per-page="5" focusable style="padding-top: 1rem">
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
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
export default {
  name: 'rhs',
  data () {
    return {
      rhSelected: undefined
    }
  },
  computed: {
    ...mapGetters([
      'rhs'
    ]),
    selected: {
      get () {
        return this.rhSelected ? this.rhSelected : this.rhs[0]
      },
      set (newValue) {
        console.log(newValue)
      }
    }
  },
  beforeMount () {
    this.getRhs(this)
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'getRhs'
    ]),
    parseDate (date) {
      return moment().format('DD/MM/YYYY')
    }
  }
}
</script>
