<template>
  <div id="vueDetails">
    <div class="details-information" v-if="serviceSelected !== undefined">
      <div class="description-service">
        <h2>Detalhes</h2>
        <div class="info-service">
          <b-field label="Serviço">
            <b-input v-model="serviceSelected.name"></b-input>
          </b-field>
          <b-field label="ID">
            <b-input v-model="serviceSelected.id"></b-input>
          </b-field>
        </div>
        <hr>
        <div class="infoRh">
          <b-field label="RH">
            <b-input v-model="rhsService[0].name" placeholder="Lorem ipsum dolor sit amet"></b-input>
          </b-field>
          <b-field label="ID">
            <b-input v-model="rhsService[0].id" placeholder="2"></b-input>
          </b-field>
        </div>
        <b-field label="Especificidade e Serviço">
          <textarea v-model="rhsService[0].observations" name="" id="" cols="55" rows="4"></textarea>
        </b-field>
        <div class="hours">
          <b-field label="Custo">
            <b-input v-model="rhsService[0].cost" placeholder="ORCA - Orçamento (em aberto)"></b-input>
          </b-field>
          <b-field label="Horas">
            <b-input placeholder="ORCA - Orçamento (em aberto)"></b-input>
          </b-field>
          <b-field label="Prazo">
            <b-input placeholder="ORCA - Orçamento (em aberto)"></b-input>
          </b-field>
        </div>
        <div class="cost">
          <div class="field">
            <b-checkbox>Estado</b-checkbox>
          </div>
          <button class="is-primary">Desassociar esse RH</button>
        </div>
      </div>
      <div class="description">
        <div class="serviceTable">
          <div class="headerTable">
            <h4>RHs responsáveis</h4>
            <button class="buttons is-primary">Adicionar novo RH ao serviço</button>
          </div>
          <b-table :data="rhsService" :paginated="true" :per-page="5" focusable style="padding-top: 1rem">
            <template slot-scope="props">
              <b-table-column field="name" label="ID" sortable>
                {{ props.row.id }}
              </b-table-column>
              <b-table-column field="name" label="NOME" sortable>
                {{ props.row.name }}
              </b-table-column>
              <b-table-column field="created_at" label="Custo">
                {{ props.row.cost }}
              </b-table-column>
              <b-table-column field="user.email" label="Horas">
                {{ parseDate(props.row.created_at) }}
              </b-table-column>
              <b-table-column field="phone" label="Prazo">
                {{ parseDate(props.row.created_at) }}
              </b-table-column>
            </template>
          </b-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { header } from '../../../config/index.js'
import moment from 'moment'
export default {
  name: 'vueDetails',
  data () {
    return {
      radio: '',
      serviceSelected: undefined,
      rhsService: undefined
    }
  },
  computed: {
  },
  beforeMount () {
    this.$http.get(this.$api({ target: `service/${this.$route.params.id}` }), {
      headers: header()
    }).then(response => {
      console.log(response)
      this.serviceSelected = response.data
      this.rhsService = this.serviceSelected.rhs
    })
  },
  methods: {
    parseDate (date) {
      return moment().format('DD/MM/YYYY')
    }
  }
}
</script>
