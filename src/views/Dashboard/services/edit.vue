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
            <b-input :value="parseDate(service.created_at)" v-mask="'##/##/####'" placeholder="data" name="date"></b-input>
          </b-field>
          <b-field label="Prazo">
            <b-input :value="parseDate(service.due_date)" v-mask="'##/##/####'" placeholder="data" name="date-duo"></b-input>
          </b-field>
        </article>
        <article class="info-three">
          <b-field label="Cliente">
            <b-input v-model="service.client.name" placeholder="Cliente" ></b-input>
          </b-field>
          <b-field label="Sigilo">
            <div class="block">
              <b-radio v-model="service.confidentiality_id" :native-value="1">Nenhum</b-radio>
              <b-radio v-model="service.confidentiality_id" :native-value="2">Parcial</b-radio>
              <b-radio v-model="service.confidentiality_id" :native-value="3">Total</b-radio>
            </div>
          </b-field>
        </article>
        <article class="info-four">
          <b-field label="Margem">
            <b-input v-model="profit" placeholder="50%"></b-input>
          </b-field>
          <b-field label="Recebido">
            <b-input v-model="received_value" placeholder="825"></b-input>
          </b-field>
        </article>
        <b-field label="Situação">
          <b-select placeholder="Select a name">
            <option value="">Selecione</option>
            <option value="1">ORCA - Orçamento (em aberto)</option>
          </b-select>
        </b-field>
      </section>
      <section class="description">
        <b-field label="Observações">
          <vue-editor :editorToolbar="customToolbar" v-model="description"></vue-editor>
        </b-field>
      </section>
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
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }]
      ],
      radio: ''
    }
  },
  watch: {
  },
  mounted () {
  },
  computed: {
    name: {
      get () {
        return this.service.name
      },
      set: _.debounce(function (newVal, oldVal) {
        this.updateFunction(['name', newVal])
      }, 1000)
    },
    profit: {
      get () {
        return this.service.profit
      },
      set: _.debounce(function (newVal, oldVal) {
        this.updateFunction(['profit', newVal])
      }, 1000)
    },
    value: {
      get () {
        return this.service.value
      },
      set: _.debounce(function (newVal, oldVal) {
        this.updateFunction(['value', newVal])
      }, 1000)
    },
    description: {
      get () {
        return this.service.description
      },
      set: _.debounce(function (newVal, oldVal) {
        this.updateFunction(['description', newVal])
      }, 1000)
    },
    received_value: {
      get () {
        return this.service.received_value
      },
      set: _.debounce(function (newVal, oldVal) {
        this.updateFunction(['received_value', newVal])
      }, 1000)
    }
  },
  methods: {
    ...mapActions([
      'updateService'
    ]),
    parseDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    updateFunction (e) {
      let data = {
        label: e[0],
        value: e[1],
        id: this.service.id
      }
      this.$http.put(this.$api({ target: 'service' }), data, {
        headers: header()
      }).then(response => {
        let payload = [response.data, this.selectedIndex]
        this.updateService(payload)
        this.$emit('updated')
        this.$toasted.success('Serviço atualizado com sucesso!', {
          theme: 'bubble',
          position: 'top-center',
          duration: 2000
        })
      })
    }
  },
  components: {
    VueEditor
  }
}
</script>
