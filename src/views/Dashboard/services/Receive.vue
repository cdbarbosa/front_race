<template>
  <div id="receives">
    <h1>Recebimento</h1>
    <div class="content">
      <div class="infoClient">
        <div class="client">
          <b-field label="Cliente">
            <b-input v-model="client.name" placeholder="Jessica Miles"></b-input>
          </b-field>
          <b-field label="ID">
            <b-input v-model="client.id" placeholder="5"></b-input>
          </b-field>
        </div>
        <div class="rh">
          <b-field label="RH">
            <b-input v-model="rhsService[0].name" placeholder="Enio G. Jelihovsch"></b-input>
          </b-field>
          <b-field label="ID">
            <b-input v-model="rhsService[0].id" placeholder="2"></b-input>
          </b-field>
        </div>
      </div>
      <div class="infoService">
        <b-field label="Título">
          <b-input v-model="selected.name" placeholder="Jessica Miles"></b-input>
        </b-field>
        <b-field label="Descrição">
          <textarea v-model="selected.description" name="" id="" cols="35" rows="5"></textarea>
        </b-field>
        <b-field label="Situação">
          <b-select placeholder="Select a name">
            <option value="">Selecione</option>
            <option value="1">ORCA - Orçamento (em aberto)</option>
          </b-select>
        </b-field>
      </div>
    </div>
    <div class="serviceTable">
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
  name: 'VueReceive',
  data () {
    return {
      radio: '',
      serviceSelected: undefined,
      rhsService: undefined,
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
    this.rhsService = this.services[0].rhs
    this.client = this.services[0].client
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
