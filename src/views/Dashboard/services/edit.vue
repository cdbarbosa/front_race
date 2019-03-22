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
            <b-input :value="parseDate(service.created_at)" v-mask="'##/##/####'" placeholder="data" name="register"></b-input>
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
            <b-input v-model="service.client.name" placeholder="Cliente" disabled></b-input>
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
        </article>
        <article class="info-four">
          <b-field label="Margem">
            <b-input v-model="profit" placeholder="50%"></b-input>
          </b-field>
          <b-field label="Valor">
            <b-input v-model="value" placeholder="825"></b-input>
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
          <textarea v-model="description" name="" cols="35" rows="15" disabled></textarea>
        </b-field>
      </section>
    </div>
  </main>
</template>
<script>
import { mapActions } from 'vuex'
import { header } from '../../../config/index.js'
import _ from 'lodash'
import moment from 'moment'
import { VueEditor } from 'vue2-editor'
export default {
  name: 'serviceUpdate',
  props: ['service', 'selectedIndex'],
  data () {
    return {
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
        let data = {
          'id': this.service.id,
          'label': 'name',
          'value': newVal
        }
        this.$http.put(this.$api({ target: 'service' }), data, {
          headers: header()
        }).then(response => {
          let payload = [response.data, this.selectedIndex]
          this.updateService(payload)
          this.$emit('updated')
        })
      }, 400)
    },
    profit: {
      get () {
        return this.service.profit
      },
      set: _.debounce(function (newVal, oldVal) {
        let data = {
          'id': this.service.id,
          'label': 'profit',
          'value': newVal
        }
        this.$http.put(this.$api({ target: 'service' }), data, {
          headers: header()
        }).then(response => {
          let payload = [response.data, this.selectedIndex]
          this.updateService(payload)
          this.$emit('updated')
        })
      }, 400)
    },
    value: {
      get () {
        return this.service.value
      },
      set: _.debounce(function (newVal, oldVal) {
        let data = {
          'id': this.service.id,
          'label': 'value',
          'value': newVal
        }
        this.$http.put(this.$api({ target: 'service' }), data, {
          headers: header()
        }).then(response => {
          let payload = [response.data, this.selectedIndex]
          this.updateService(payload)
          this.$emit('updated')
        })
      }, 400)
    },
    description: {
      get () {
        return this.service.description
      },
      set: _.debounce(function (newVal, oldVal) {
        let data = {
          'id': this.service.id,
          'label': 'description',
          'value': newVal
        }
        this.$http.put(this.$api({ target: 'service' }), data, {
          headers: header()
        }).then(response => {
          let payload = [response.data, this.selectedIndex]
          this.updateService(payload)
          this.$emit('updated')
        })
      }, 400)
    },
    received_value: {
      get () {
        return this.service.received_value
      },
      set: _.debounce(function (newVal, oldVal) {
        let data = {
          'id': this.service.id,
          'label': 'received_value',
          'value': newVal
        }
        this.$http.put(this.$api({ target: 'service' }), data, {
          headers: header()
        }).then(response => {
          let payload = [response.data, this.selectedIndex]
          this.updateService(payload)
          this.$emit('updated')
        })
      }, 400)
    }
  },
  methods: {
    ...mapActions([
      'updateService'
    ]),
    parseDate (date) {
      return moment(date).format('DD/MM/YYYY')
    }
  },
  components: {
    VueEditor
  }
}
</script>
