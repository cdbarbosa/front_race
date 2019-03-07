<template>
  <div id="service">
    <div id="showService">
      <h2>Serviços</h2>
      <div class="service-information" v-if="selected !== undefined">
        <div class="description-service">
          <div class="info-one">
            <b-field label="Título">
              <textarea v-model="selected.name" name=""  cols="50" rows="4"></textarea>
            </b-field>
            <b-field label="ID">
              <b-input v-model="selected.id" placeholder="23"></b-input>
            </b-field>
          </div>
          <div class="info-two">
            <b-field label="Data de registro">
              <b-input :value="parseDate(selected.created_at)" v-validate="{regex: dataRegex.regex}" v-mask="'##/##/####'" placeholder="data" name="register"></b-input>
            </b-field>
            <b-field label="Previsão">
              <b-input :value="parseDate(selected.created_at)" v-validate="{regex: dataRegex.regex}" v-mask="'##/##/####'" placeholder="data" name="date"></b-input>
            </b-field>
            <b-field label="Prazo">
              <b-input :value="parseDate(selected.due_date)" v-validate="{regex: dataRegex.regex}" v-mask="'##/##/####'" placeholder="data" name="date-duo"></b-input>
            </b-field>
          </div>
          <div class="info-three">
            <b-field label="Cliente">
              <b-input v-model="selected.client.name" placeholder="Cliente"></b-input>
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
            <textarea v-model="selected.description" name="" id="" cols="35" rows="15"></textarea>
          </b-field>
        </div>
        <div class="buttonsRoutes">
          <router-link tag="button" class="is-primary" :to="{ name: 'vueDetails', params: { id: selected.id } }">Detalhes</router-link>
          <router-link v-if="selected !== undefined" tag="button" class="is-primary" :to="{ name: 'receipt', params: { id: selected.id } }">Recebimentos</router-link>
        </div>
      </div>
       <div class="serviceTable">
        <div class="headerTable">
          <h4>Serviços</h4>
          <button class="buttons is-primary" @click="isModalActive = true">Criar novo serviço</button>
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
    <b-modal :active.sync="isModalActive">
      <div id="createService">
        <div class="service-informations" v-if="selected != undefined">
          <div class="description-service">
            <b-field label="Título">
              <textarea v-model="service.name" name=""  cols="50" rows="2"></textarea>
            </b-field>
            <div class="info-two">
              <b-field label="Previsão">
                <b-input v-model="service.forecast" v-validate="{regex: dataRegex.regex}" v-mask="'##/##/####'" placeholder="data" name="date"></b-input>
              </b-field>
              <b-field label="Prazo">
                <b-input v-model="service.due_date" v-validate="{regex: dataRegex.regex}" v-mask="'##/##/####'" placeholder="data" name="date-duo"></b-input>
              </b-field>
            </div>
            <span>{{ errors.first('date') }}</span>
            <span>{{ errors.first('date-duo') }}</span>
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
                <b-input v-model="service.profit" v-validate="{regex: numbersRegex.regex}" placeholder="50%" name="margem"></b-input>
              </b-field>
              <b-field label="Valor">
                <b-input v-model.lazy="service.value" v-money="money" placeholder="825" name="valor"></b-input>
              </b-field>
              <b-field label="Recebido">
                <b-input placeholder="825" name="recebido"></b-input>
              </b-field>
            </div>
            <span>{{ errors.first('margem') }}</span>
            <span>{{ errors.first('valor') }}</span>
            <span>{{ errors.first('recebido') }}</span>
            <b-field label="Situação">
              <b-select placeholder="Select a name">
                <option value="">Selecione</option>
                <option value="1">ORCA - Orçamento (em aberto)</option>
              </b-select>
            </b-field>
          </div>
          <div class="description">
            <b-field label="Observações">
              <textarea v-model="service.description" name="" id="" cols="35" rows="15"></textarea>
            </b-field>
            <div class="buttonsCreate">
              <button class="is-primary" @click="createService">Cadastrar</button>
              <button class="is-primary" @click="isModalActive = false">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
import { header } from '../../config/index.js'
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
export default {
  name: 'showService',
  data () {
    return {
      radio: '',
      serviceSelected: undefined,
      isModalActive: false,
      client_id: undefined,
      service: {
        name: undefined,
        description: undefined,
        due_date: undefined,
        forecast: undefined,
        profit: undefined,
        status_id: 1,
        value: undefined
      },
      dataRegex: {
        regex: /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)(((1)(9)[0-9][0-9])|((2)[0][0-9][0-9]))$/
      },
      estadoRegex: {
        regex: /^([a-zA-Z][a-zA-Z])$/
      },
      numbersRegex: {
        regex: /^([0-9]+)(%)$/
      },
      money: {
        decimal: '.',
        thousands: ',',
        prefix: 'R$ ',
        precision: 2,
        masked: false
      }
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
    console.log(this.services)
  },
  methods: {
    ...mapActions([
      'getServices'
    ]),
    parseDate (date) {
      return moment().format('DD/MM/YYYY')
    },
    createService () {
      this.service.value = parseFloat(this.service.value.split(' ')[1])
      let data = {
        client_id: this.selected.client.id,
        service: this.service
      }
      this.$http.post(this.$api({ target: 'services' }), data, {
        headers: header()
      }).then(response => {
        this.isModalActive = false
        this.$router.push({ name: 'services' })
      })
    }
  }
}
</script>
