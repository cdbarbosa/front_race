<template>
  <main class="create" id="createService">
    <h3>Serviço</h3>
    <form @submit.prevent="create" class="content">
      <section class="service">
        <b-field label="Título">
          <textarea v-model="service.name" placeholder="Titulo do serviço" cols="50" rows="2" required></textarea>
        </b-field>
        <b-field label="Cliente">
          <b-select placeholder="Selecione um cliente" v-model="client_id">
            <option
              v-for="option in clients"
              :value="option.id"
              :key="option.id" required>
            {{ option.name }}
            </option>
          </b-select>
        </b-field>
        <article class="info-two">
          <b-field label="Previsão">
            <b-datepicker  v-model="service.forecast"  :month-names="months" :day-names="days" :date-parser="parseDate(service.forecast)" v-mask="'##/##/####'" v-validate="'regex: rules.date_before.regex, before: beforeTarget'" name="date" required></b-datepicker>
            <!-- <b-input v-model="service.forecast" v-validate="'regex: rules.date_before.regex, before: beforeTarget'" v-mask="'##/##/####'" placeholder="Data" name="date" required></b-input> -->
          </b-field>
          <b-field label="Sigilo">
            <div class="block">
              <b-radio v-model="service.confidentiality_id" :native-value="1">Nenhum</b-radio>
              <b-radio v-model="service.confidentiality_id" :native-value="2">Parcial</b-radio>
              <b-radio v-model="service.confidentiality_id" :native-value="3">Total</b-radio>
            </div>
          </b-field>
          <!-- <span>{{ errors.first('date') }}</span> -->
          <span>{{ errors.first('beforeTarget') }}</span>
        </article>
        <article class="info-three">
        </article>
        <article class="info-four">
          <b-field label="Margem (%)">
            <b-input v-model="service.profit" type="number" step="0.01" required></b-input>
          </b-field>
          <b-field label="Tipo de custo TJ">
            <div class="block">
              <b-radio v-model="service.tj_cost_type_id" :native-value="1">Porcentagem</b-radio>
              <b-radio v-model="service.tj_cost_type_id" :native-value="2">Valor</b-radio>
            </div>
          </b-field>
          <b-field :label="`Custo TJ (${service.tj_cost_type_id === 1 ? '%' : 'R$'})`">
            <b-input v-model="service.tj_cost" type="number" step="0.01"></b-input>
          </b-field>
        </article>
        <b-field label="Situação">
          <b-select placeholder="Selecione um status para o cliente">
            <!-- <option value="">Selecione</option> -->
            <option v-for="(st, index) in serviceStatuses" :value="st.id" :key="index">{{ st.abbreviation }} - {{ st.description }}</option>
          </b-select>
        </b-field>
      </section>
      <section>
        <div class="description">
          <b-field label="Descrição">
            <vue-editor :editorToolbar="customToolbar" v-model="service.description" placeholder="Analise de dados"></vue-editor>
          </b-field>
          <div class="buttonClass">
            <button type="submit" class="is-primary" >Cadastrar</button>
          </div>
        </div>
      </section>
    </form>
  </main>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { header } from '../../../config/index.js'
import userCreate from '../../../mixins/userCreate'
import { VueEditor } from 'vue2-editor'
import moment from 'moment'
moment.locale('pt-BR')
export default {
  name: 'createService',
  mixins: [userCreate],
  data () {
    return {
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }]
      ],
      months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      days: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
      radio: '',
      beforeTarget: '',
      service: {
        name: null,
        description: null,
        due_date: null,
        forecast: null,
        profit: null,
        service_status_id: 1,
        confidentiality_id: 1,
        tj_cost_type_id: 1,
        tj_cost: null
      },
      client_id: null,
      serviceStatuses: [],
      money: {
        decimal: '.',
        thousands: ',',
        prefix: 'R$ ',
        precision: 2,
        masked: false
      }
    }
  },
  beforeMount () {
    this.getClients(this)
    this.getServiceStatuses()
  },
  computed: {
    ...mapGetters([
      'services',
      'clients'
    ])
  },
  methods: {
    ...mapActions([
      'getClients',
      'getServices',
      'setServices'
    ]),
    getServiceStatuses () {
      this.$http.get(this.$api({ target: 'service-status' }), {
        headers: header()
      }).then(response => {
        this.serviceStatuses = response.data
      })
    },
    parseDate (date) {
      var data = new Date(date)
      return data.toLocaleDateString('pt-BR')
    },
    create () {
      let data = {
        client_id: this.client_id,
        service: this.service
      }
      this.$Progress.start()
      this.$http.post(this.$api({ target: 'services' }), data, {
        headers: header()
      }).then(response => {
        this.$Progress.finish()
        this.getServices(this).then(services => {
          this.setServices(services)
          this.$emit('serviceCreated')
        })
      }).catch(err => {
        this.$Progress.fail()
        this.$emit('creationFailed')
        console.log(err)
      })
    }
  },
  components: {
    VueEditor
  }
}
</script>
