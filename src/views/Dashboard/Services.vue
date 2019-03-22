<template>
  <main id="service" v-if="selected !== undefined">
    <div id="showService">
      <div class="service-information">
        <div class="description-service">
          <h3>
            Serviços
            <div id="edit" @click="isEditActive = true">
              <b-icon icon="edit"></b-icon>
            </div>
          </h3>
          <div class="info-one">
            <b-field label="Título">
              <textarea v-model="selected.name" name="" rows="4" disabled></textarea>
            </b-field>
            <b-field label="ID">
              <b-input v-model="selected.id" placeholder="23" disabled></b-input>
            </b-field>
          </div>
          <div class="info-two">
            <b-field label="Data de registro">
              <b-input :value="parseDate(selected.created_at)" v-mask="'##/##/####'" placeholder="data" name="register" disabled></b-input>
            </b-field>
            <b-field label="Previsão">
              <b-input :value="parseDate(selected.created_at)" v-mask="'##/##/####'" placeholder="data" name="date" disabled></b-input>
            </b-field>
            <b-field label="Prazo">
              <b-input :value="parseDate(selected.due_date)" v-mask="'##/##/####'" placeholder="data" name="date-duo" disabled></b-input>
            </b-field>
          </div>
          <div class="info-three">
            <b-field label="Cliente">
              <b-input v-model="selected.client.name" placeholder="Cliente" disabled></b-input>
            </b-field>
            <b-field label="Sigilo">
              <div class="block">
                <b-radio v-model="radio" native-value="Nenhum" disabled>
                  Nenhum
                </b-radio>
                <b-radio v-model="radio" native-value="Parcial" disabled>
                  Parcial
                </b-radio>
                <b-radio v-model="radio" native-value="Total" disabled>
                  Total
                </b-radio>
              </div>
            </b-field>
          </div>
          <div class="info-four">
            <b-field label="Margem">
              <b-input v-model="selected.profit" placeholder="50%" disabled></b-input>
            </b-field>
            <b-field label="Valor">
              <b-input v-model="selected.value" placeholder="825" disabled></b-input>
            </b-field>
            <b-field label="Recebido">
              <b-input v-model="selected.received_value" placeholder="825" disabled></b-input>
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
          <h3>Outros</h3>
          <b-field label="Observações">
            <div class="textarea" v-html="selected.description"></div>
            <!-- <textarea v&#45;model="selected.description" name="" cols="35" rows="15" disabled></textarea> -->
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

    <b-modal :active.sync="isEditActive">
      <service-edit :service="selected" :selectedIndex="selectedIndex" @update="serviceSelected = services[selectedIndex]"></service-edit>
    </b-modal>
  </main>
</template>
<script>
import { mapActions } from 'vuex'
import moment from 'moment'
import serviceEdit from './services/edit.vue'
import success from './common/create-messages/success'
import error from './common/create-messages/error'
import createService from './services/create.vue'
import _ from 'lodash'
import { header } from '../../config/index.js'
export default {
  name: 'showService',
  data () {
    return {
      isEditActive: false,
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
    },
    selectedIndex () {
      return this.services.findIndex(service => service.id === this.selected.id)
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
    }
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
      'changeServices'
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
    serviceEdit,
    success,
    error
  }
}
</script>
