<template>
  <div id="service">
    <h2 v-if="$route.name === 'serviceShow'">Serviços</h2>
    <div class="info">
      <router-view></router-view>
    </div>
    <div class="serviceTable" v-if="$route.name !== 'details' && $route.name !== 'receive'">
      <div class="headerTable">
        <h4>Serviços</h4>
        <router-link v-if="selected !== undefined" class="buttons s-primary" tag="button" :to="{ name: 'serviceCreate', params: { client_name: selected.client.name, code: selected.client.id } }">Criar novo serviço</router-link>
        <b-input placeholder="Procurar..."></b-input>
      </div>
      <b-table :data="services" :selected.sync="selected" :paginated="true" :per-page="5" focusable style="padding-top: 1rem">
        <template slot-scope="props">
          <b-table-column field="name" label="Titulo" sortable>
            {{ props.row.name }}
          </b-table-column>
          <b-table-column field="name" label="Cliente">
            {{ props.row == undefined ? undefined : props.row.client.name }}
          </b-table-column>
          <b-table-column field="created_at" label="Registro">
            {{ parseDate(props.row.created_at) }}
          </b-table-column>
          <b-table-column field="created_at" label="Previsão">
            {{ parseDate(props.row.created_at) }}
          </b-table-column>
          <b-table-column field="created_at" label="Entrega">
            {{ parseDate(props.row.created_at) }}
          </b-table-column>
          <b-table-column field="name" label="Situação">
            {{ props.row.status.abbreviation }}
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
  name: 'service',
  data () {
    return {
      serviceSelected: undefined,
      client: undefined
    }
  },
  computed: {
    ...mapGetters([
      'services'
    ]),
    selected: {
      get () {
        return this.serviceSelected ? this.serviceSelected : this.services[0]
      },
      set (newValue) {
        console.log(newValue)
      }
    }
  },
  beforeMount () {
    this.getServices(this)
  },
  methods: {
    ...mapActions([
      'getServices'
    ]),
    parseDate (date) {
      return moment().format('DD/MM/YYYY')
    }
  }
}
</script>
