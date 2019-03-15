<template>
  <div id="service" v-if="selected !== undefined">
    <div id="showService">
      <h2>Serviços</h2>
      <div class="service-information">
        <div class="description-service">
          <div class="info-one">
            <b-field label="Título">
              <textarea v-model="selected.name" name="" rows="4"></textarea>
            </b-field>
            <b-field label="ID">
              <b-input v-model="selected.id" placeholder="23" disabled></b-input>
            </b-field>
          </div>
          <div class="info-two">
            <b-field label="Data de registro">
              <b-input :value="parseDate(selected.created_at)" v-mask="'##/##/####'" placeholder="data" name="register"></b-input>
            </b-field>
            <b-field label="Previsão">
              <b-input :value="parseDate(selected.created_at)" v-mask="'##/##/####'" placeholder="data" name="date"></b-input>
            </b-field>
            <b-field label="Prazo">
              <b-input :value="parseDate(selected.due_date)" v-mask="'##/##/####'" placeholder="data" name="date-duo"></b-input>
            </b-field>
          </div>
          <div class="info-three">
            <b-field label="Cliente">
              <b-input v-model="selected.client.name" placeholder="Cliente" disabled></b-input>
            </b-field>
            <b-field label="Sigilo">
              <div class="block">
                <b-radio v-model="radio" native-value="Nenhum">
                  Nenhum
                </b-radio>
                <b-radio v-model="radio" native-value="Parcial">
                  Parcial
                </b-radio>
                <b-radio v-model="radio" native-value="Total">
                  Total
                </b-radio>
              </div>
            </b-field>
          </div>
          <div class="info-four">
            <b-field label="Margem">
              <b-input v-model="selected.profit" placeholder="50%"></b-input>
            </b-field>
            <b-field label="Valor">
              <b-input v-model="selected.value" placeholder="825"></b-input>
            </b-field>
            <b-field label="Recebido">
              <b-input v-model="selected.value" placeholder="825"></b-input>
            </b-field>
          </div>
          <b-field label="Situação">
            <b-select placeholder="Select a name">
              <option value="">Selecione</option>
              <option value="1">ORCA - Orçamento (em aberto)</option>
            </b-select>
          </b-field>
        </div>
        <div class="description">
          <b-field label="Observações">
            <textarea v-model="selected.description" name="" cols="35" rows="15"></textarea>
          </b-field>
        </div>
        <div class="buttonsRoutes">
          <router-link tag="button" class="is-primary" :to="{ name: 'vueDetails' }">Detalhes</router-link>
          <router-link v-if="selected !== undefined" tag="button" class="is-primary" :to="{ name: 'receipt', params: { receipt_id: selected.id } }">Recebimentos</router-link>
        </div>
      </div>
       <div class="serviceTable">
        <div class="headerTable">
          <h4>Serviços</h4>
          <button class="buttons is-primary" @click="isModalActive = true">Criar novo serviço</button>
          <b-input placeholder="Procurar..." v-model="searchQuery"></b-input>
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
    <b-modal :active.sync="isModalActive">
      <component :is="parseModal()" @serviceCreated="serviceCreated = true" @creationFailed="serviceCreated = false" :props="[selected.client.name, selected.client.id]"></component>
    </b-modal>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import moment from 'moment'
import success from './common/create-messages/success'
import error from './common/create-messages/error'
import createService from './services/create.vue'
import _ from 'lodash'
import { header } from '../../config/index.js'
export default {
  name: 'showService',
  data () {
    return {
      radio: '',
      searchQuery: undefined,
      serviceCreated: undefined,
      serviceSelected: undefined,
      isModalActive: false
    }
  },
  computed: {
    services: {
      get () {
        return this.$store.getters.services
      },
      set (newVal) {
        this.changeServices(newVal)
      }
    },
    selected: {
      get () {
        return this.serviceSelected ? this.serviceSelected : this.services[0]
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
        this.getServices(this)
      } else {
        this.searchServices(newQuery)
      }
    }, 500),
    selected (newVal) {
      this.$router.push({ name: 'service', params: { service_id: newVal.id } })
    },
    'selected.name': _.debounce(function (newVal, oldVal) {
      // this.updateService([this, { 'id': this.selected.id, 'label': 'name', 'value': newVal }])
    }, 500),
    'selected.due_date': _.debounce(function (newVal) {
      // this.updateService([this, { 'id': this.selected.id, 'label': 'due_date', 'value': newVal }])
    }, 500),
    'selected.profit': _.debounce(function (newVal) {
      // this.updateService([this, { 'id': this.selected.id, 'label': 'profit', 'value': newVal }])
    }, 500),
    'selected.value': _.debounce(function (newVal) {
      // this.updateService([this, { 'id': this.selected.id, 'label': 'value', 'value': newVal }])
    }, 500),
    'selected.description': _.debounce(function (newVal) {
      // this.updateService([this, { 'id': this.selected.user.id, 'label': 'description', 'value': newVal }])
    }, 500)
  },
  beforeRouteEnter (to, from, next) {
    next($this => {
      if ($this.serviceSelected) next({ name: 'service', params: { service_id: $this.serviceSelected.id } })
    })
  },
  beforeMount () {
    this.getServices(this)
  },
  methods: {
    ...mapActions([
      'getServices',
      'changeServices',
      'updateService'
    ]),
    parseDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    parseModal () {
      if (this.serviceCreated === undefined) {
        return 'createService'
      } else if (this.serviceCreated === true) {
        return 'success'
      }
      return 'error'
    },
    searchServices (title) {
      this.$http.get(this.$api({ target: 'service' }), {
        headers: header(),
        params: {
          search: title
        }
      }).then(response => {
        this.changeServices(response.data)
      })
    }
  },
  components: {
    createService,
    success,
    error
  }
}
</script>
