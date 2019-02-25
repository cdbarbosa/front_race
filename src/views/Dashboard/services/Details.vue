<template>
  <div id="details">
    <h1>Detalhes</h1>
    <div class="service-information">
      <div class="description-service">
        <b-field label="Título">
          <textarea v-model="selected.name" name=""  cols="60" rows="2"></textarea>
        </b-field>
        <b-field label="Observações">
          <textarea v-model="selected.description" name="" id="" cols="60" rows="5"></textarea>
        </b-field>
        <b-field label="Situação">
          <b-select placeholder="Select a name">
            <option value="">Selecione</option>
            <option value="1">ORCA - Orçamento (em aberto)</option>
          </b-select>
        </b-field>
      </div>
      <div class="description">
        <div class="infoRh">
          <b-field label="RH">
            <b-input v-model="selected.rhs[0].name" placeholder="Lorem ipsum dolor sit amet"></b-input>
          </b-field>
          <b-field label="ID">
            <b-input v-model="selected.rhs[0].id" placeholder="2"></b-input>
          </b-field>
        </div>
        <b-field label="Especificidade e Serviço">
          <textarea v-model="selected.rhs[0].observations" name="" id="" cols="40" rows="4"></textarea>
        </b-field>
        <div class="cost">
          <b-field label="Custo">
            <b-input v-model="selected.rhs[0].cost" placeholder="ORCA - Orçamento (em aberto)"></b-input>
          </b-field>
          <div class="field">
            <b-checkbox>Estado</b-checkbox>
          </div>
        </div>
        <div class="hours">
          <b-field label="Horas">
            <b-input placeholder="ORCA - Orçamento (em aberto)"></b-input>
          </b-field>
          <b-field label="Prazo">
            <b-input placeholder="ORCA - Orçamento (em aberto)"></b-input>
          </b-field>
        </div>
      </div>
    </div>
    <div class="serviceTable" v-if="$route.name == 'details'">
      <div class="headerTable">
        <h4>RHs responsáveis</h4>
        <button class="buttons is-primary">Adicionar novo RH ao serviço</button>
        <b-input placeholder="Procurar..."></b-input>
      </div>
      <b-table :data="rhsService" :selected.sync="selected" :paginated="true" :per-page="5" focusable style="padding-top: 1rem">
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
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
export default {
  name: 'showService',
  data () {
    return {
      radio: '',
      serviceSelected: undefined,
      rhsService: undefined
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
    this.rhsService = this.services[0].rhs
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
