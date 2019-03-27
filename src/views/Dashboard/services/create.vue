<template>
  <main class="create" id="createService">
    <h3>Serviço</h3>
    <div class="content">
      <section class="service">
        <b-field label="Título">
          <textarea v-model="service.name" name=""  cols="50" rows="2"></textarea>
        </b-field>
        <b-field label="Simple">
          <b-select placeholder="Select a name" v-model="client_id">
            <option
              v-for="option in clients"
              :value="option.id"
              :key="option.id">
              {{ option.name }}
            </option>
          </b-select>
        </b-field>
        <article class="info-two">
          <b-field label="Previsão">
            <b-input v-model="service.forecast" v-validate="'regex: rules.date_before.regex, before: beforeTarget'" v-mask="'##/##/####'" placeholder="data" name="date" required></b-input>
          </b-field>
          <b-field label="Prazo">
            <b-input v-model="service.due_date" ref="beforeTarget" v-validate="rules.date_before" v-mask="'##/##/####'" placeholder="data" name="beforeTarget" required></b-input>
          </b-field>
          <b-field label="Sigilo">
            <div class="block">
              <b-radio v-model="service.confidentiality_id" :native-value="1">Nenhum</b-radio>
              <b-radio v-model="service.confidentiality_id" :native-value="2">Parcial</b-radio>
              <b-radio v-model="service.confidentiality_id" :native-value="3">Total</b-radio>
            </div>
          </b-field>
          <span>{{ errors.first('date') }}</span>
          <span>{{ errors.first('beforeTarget') }}</span>
        </article>
        <article class="info-three">
        </article>
        <article class="info-four">
          <b-field label="Margem">
            <b-input v-model="service.profit" placeholder="50%" v-validate="rules.number" name="margem" required></b-input>
          </b-field>
          <b-field label="Valor">
            <b-input v-model.lazy="service.value" v-money="money" placeholder="825" name="valor" required></b-input>
          </b-field>
          <b-field label="Recebido">
            <b-input placeholder="825" name="recebido" required></b-input>
          </b-field>
        </article>
        <span>{{ errors.first('margem') }}</span>
        <span>{{ errors.first('valor') }}</span>
        <span>{{ errors.first('recebido') }}</span>
        <b-field label="Situação">
          <b-select placeholder="Select a name">
            <option value="">Selecione</option>
            <option v-for="(st, index) in serviceStatuses" :value="st.id" :key="index">{{ st.abbreviation }} - {{ st.description }}</option>
          </b-select>
        </b-field>
      </section>
      <section>
        <div class="description">
          <b-field label="Observações">
            <vue-editor :editorToolbar="customToolbar" v-model="service.description" placeholder="Analise de dados"></vue-editor>
          </b-field>
          <div class="buttonClass">
            <button class="is-primary" @click="create">Cadastrar</button>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { header } from '../../../config/index.js'
import userCreate from '../../../mixins/userCreate'
import { VueEditor } from 'vue2-editor'
export default {
  name: 'createService',
  mixins: [userCreate],
  data () {
    return {
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }]
      ],
      radio: '',
      beforeTarget: '',
      service: {
        name: undefined,
        description: undefined,
        due_date: undefined,
        forecast: undefined,
        profit: undefined,
        status_id: 1,
        value: undefined,
        confidentiality_id: undefined
      },
      client_id: undefined,
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
    // console.log(this.clients)
  },
  computed: {
    ...mapGetters([
      'services',
      'clients'
    ])
  },
  methods: {
    ...mapActions([
      'getClients'
    ]),
    getServiceStatuses () {
      this.$http.get(this.$api({ target: 'service-status' }), {
        headers: header()
      }).then(response => {
        this.serviceStatuses = response.data
      })
    },
    create () {
      this.service.value = parseFloat(this.service.value.split(' ')[1])
      let data = {
        client_id: this.client_id,
        service: this.service
      }
      this.$http.post(this.$api({ target: 'services' }), data, {
        headers: header()
      }).then(response => {
        console.log(response)
        this.$router.push({ name: 'service', params: { service_id: this.services[0].id } })
      })
    }
  },
  components: {
    VueEditor
  }
}
</script>
