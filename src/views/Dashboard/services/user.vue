<template>
  <main id="services" v-if="selected">
    <h3>
      Serviços
    </h3>
    <service :selected="selected"></service>
    <div class="content" id="table">
      <section class="__secundary">
        <header>
          <h4>Serviços</h4>
          <b-input placeholder="Procurar..." v-model="searchQuery"></b-input>
        </header>
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
            <b-table-column field="name" label="Situação">
              {{ props.row.status.abbreviation }}
            </b-table-column>
          </template>
        </b-table>
      </section>
    </div>
  </main>
  <main v-else>
    <h2>Não há serviço associado</h2>
  </main>
</template>
<script>
import service from './service'
import moment from 'moment'
import _ from 'lodash'
import { header } from '../../../config/index.js'
export default {
  name: 'showServices',
  data () {
    return {
      services: undefined,
      radio: '',
      searchQuery: undefined
    }
  },
  computed: {
    selected: {
      get () {
        return this.serviceSelected ? this.serviceSelected : (this.services === undefined ? undefined : this.services[0])
      },
      set (newValue) {
        this.serviceSelected = newValue
      }
    }
  },
  watch: {
    searchQuery: _.debounce(function (newQuery, oldQuery) {
      this.serviceSelected = undefined
      if (newQuery === '' && newQuery === oldQuery) {
        this.getServiceRh(this.rh_id)
      } else {
        this.searchServices(newQuery)
      }
    }, 500),
    selected (newVal) {
      this.$router.push({ name: 'service', params: { service_id: newVal.id } })
    }
  },
  beforeMount () {
    console.log('here')
    this.$http.get(this.$api({ target: `rh/${this.$store.getters.user.id}` }), {
      headers: header()
    }).then(response => {
      this.rh_id = response.data.id
      this.getServiceRh(this.rh_id)
    })
    console.log(this.services)
  },
  methods: {
    searchServices (title) {
      this.$http.get(this.$api({ target: 'service' }), {
        headers: header(),
        params: {
          search: title
        }
      }).then(response => {
        this.services = response.data
      })
    },
    getServiceRh (id) {
      this.$http.get(this.$api({ target: `service-rh/${id}` }), {
        headers: header()
      }).then(response => {
        this.services = response.data
      })
    },
    parseDate (date) {
      return moment(date).format('DD/MM/YYYY')
    }
  },
  components: {
    service
  }
}
</script>
