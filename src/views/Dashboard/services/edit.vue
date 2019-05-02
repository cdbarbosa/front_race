<template>
  <main id="updateService">
    <h3>Serviços</h3>
    <div class="content">
      <section class="service">
        <article class="info-one">
          <b-field label="Título">
            <textarea v-model="name" name="" rows="4"></textarea>
          </b-field>
          <b-field label="ID">
            <b-input v-model="service.id" placeholder="23" disabled></b-input>
          </b-field>
        </article>
        <article class="info-two">
          <b-field label="Data de registro">
            <b-input :value="parseDate(service.created_at)" v-mask="'##/##/####'" placeholder="data" name="register" disabled></b-input>
          </b-field>
          <b-field label="Previsão">
            <b-input :value="parseDate(service.forecast)" v-model="forecast" v-mask="'##/##/####'" placeholder="data" name="date"></b-input>
          </b-field>
          <b-field label="Entrega">
            <b-input :value="parseDate(service.delivered)" v-model="delivered" v-mask="'##/##/####'" name="delivered"></b-input>
          </b-field>
        </article>
        <article class="info-three">
          <b-field label="Cliente">
            <b-input v-model="service.client.name" placeholder="Cliente" disabled></b-input>
          </b-field>
         <b-field label="Sigilo">
            <div class="block">
              <b-radio v-model="confidentiality" :native-value="1">Nenhum</b-radio>
              <b-radio v-model="confidentiality" :native-value="2">Parcial</b-radio>
              <b-radio v-model="confidentiality" :native-value="3">Total</b-radio>
            </div>
          </b-field>
        </article>
        <article class="info-four">
          <b-field label="Margem">
            <b-input v-model="profit" placeholder="50%"></b-input>
          </b-field>
          <b-field label="Recebido">
            <b-input v-model="received_value" placeholder="825" disabled></b-input>
          </b-field>
        </article>
        <b-field label="Situação">
          <b-select placeholder="Selecione um status para o cliente" v-model="status">
            <!-- <option value="">Selecione</option> -->
            <option v-for="(st, index) in serviceStatuses" :value="st.id" :key="index">{{ st.abbreviation }} - {{ st.description }}</option>
          </b-select>
        </b-field>
      </section>
      <section class="description">
        <b-field label="Observações">
          <vue-editor :editorToolbar="customToolbar" v-model="description"></vue-editor>
        </b-field>
      </section>
      <button @click="updateFunction">Atualizar</button>
    </div>
  </main>
</template>
<script>
import { mapActions } from 'vuex'
import { header } from '../../../config/index.js'
import _ from 'lodash'
import { VueEditor } from 'vue2-editor'
import moment from 'moment'
// import { VueEditor } from 'vue2-editor'
export default {
  name: 'serviceUpdate',
  props: ['service', 'selectedIndex'],
  data () {
    return {
      serviceStatuses: [],
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }]
      ],
      radio: ''
    }
  },
  watch: {
  },
  beforeMount () {
    this.getServiceStatuses()
  },
  mounted () {
  },
  computed: {
    name: {
      get () {
        return this.service.name
      },
      set: _.debounce(function (newVal, oldVal) {
        this.updateServiceSelected(['name', newVal])
      }, 1000)
    },
    profit: {
      get () {
        return this.service.profit
      },
      set: _.debounce(function (newVal, oldVal) {
        this.updateServiceSelected(['profit', newVal])
      }, 1000)
    },
    description: {
      get () {
        return this.service.description
      },
      set: _.debounce(function (newVal, oldVal) {
        this.updateServiceSelected(['description', newVal])
      }, 1000)
    },
    confidentiality: {
      get () {
        return this.service.confidentiality_id
      },
      set: _.debounce(function (newVal, oldVal) {
        this.updateServiceSelected(['confidentiality_id', newVal])
      }, 1000)
    },
    delivered: {
      get () {
        return this.service.delivered ? this.parseDate(this.service.delivered) : null
      },
      set: _.debounce(function (newVal, oldVal) {
        this.updateServiceSelected(['delivered', newVal])
      }, 1000)
    },
    forecast: {
      get () {
        return this.parseDate(this.service.forecast)
      },
      set: _.debounce(function (newVal, oldVal) {
        this.updateServiceSelected(['forecast', newVal])
      }, 1000)
    },
    received_value: {
      get () {
        return this.service.received_value
      },
      set: _.debounce(function (newVal, oldVal) {
        this.updateServiceSelected(['received_value', newVal])
      }, 1000)
    },
    status: {
      get () {
        return this.service.status_id
      },
      set: _.debounce(function (newVal, oldVal) {
        this.updateServiceSelected(['status_id', newVal])
      })
    }
  },
  methods: {
    ...mapActions([
      'updateService',
      'updateServiceSelected',
      'postServiceSelected'
    ]),
    getServiceStatuses () {
      this.$http.get(this.$api({ target: 'service-status' }), {
        headers: header()
      }).then(response => {
        this.serviceStatuses = response.data
      })
    },
    parseDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    updateFunction (e) {
      this.postServiceSelected([this, this.service]).then(response => {
        this.updateService([response.data, this.selectedIndex])
        setTimeout(() => {
          this.$toasted.success('Serviço atualizado com sucesso!', {
            theme: 'bubble',
            position: 'top-center',
            duration: 2000,
            onComplete: () => {
              this.$emit('updated')
            }
          })
        }, 300)
      })
    }
  },
  components: {
    VueEditor
  }
}
</script>
