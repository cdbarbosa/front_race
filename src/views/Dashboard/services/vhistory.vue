<template>
  <main id="history" v-if="records.length">
    <h3>
      Histórico
    </h3>
    <b-table :data="records" :paginated="true" :per-page="25" style="padding-top: 1rem">
      <template slot-scope="props">
        <b-table-column field="email" label="Usuário">
          {{ props.row.user.email }}
        </b-table-column>
        <b-table-column field="abbreviation" label="Abreviação">
          {{ props.row.service_status.abbreviation }}
        </b-table-column>
        <b-table-column field="abbreviation" label="Status">
          {{ props.row.service_status.description }}
        </b-table-column>
        <b-table-column field="abbreviation" label="Data">
          {{ parseDate(props.row.created_at) }}
        </b-table-column>
      </template>
      <template slot="empty">
        <section class="section">
          <div class="empty has-text-grey has-text-centered">
            <p>
            <b-icon icon="frown" size="is-large"></b-icon>
            </p>
            <p>Nenhum registro feito.</p>
          </div>
        </section>
      </template>
    </b-table>
  </main>
</template>
<script>
import { header } from '../../../config/index.js'
import moment from 'moment'
moment.locale('pt-BR')
export default {
  name: 'history',
  props: ['active'],
  data () {
    return {
      records: []
    }
  },
  computed: {
  },
  watch: {
  },
  beforeMount () {
    this.getRecords()
  },
  methods: {
    parseDate (date) {
      return moment(date).format('DD/MM/YYYY H:m')
    },
    getRecords () {
      this.$http.get(this.$api({ target: `service-history/${this.$route.params.service_id}` }), {
        headers: header()
      }).then(response => {
        this.records = response.data
      })
    }
  },
  components: {
  }
}
</script>
