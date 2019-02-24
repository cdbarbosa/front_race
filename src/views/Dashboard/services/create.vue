<template>
  <div id="createService">
    <div class="service-information">
      <div class="description-service">
        <b-field label="Título">
          <textarea v-model="service.name" name=""  cols="40" rows="2"></textarea>
        </b-field>
        <div class="info-two">
          <b-field label="Previsão">
            <b-input v-model="service.forecast" placeholder="data"></b-input>
          </b-field>
          <b-field label="Prazo">
            <b-input v-model="service.due_date" placeholder="data"></b-input>
          </b-field>
        </div>
        <div class="info-three">
          <b-field label="Cliente">
            <b-input :value="$route.params.client_name" placeholder="Cliente" disabled></b-input>
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
            <b-input v-model="service.profit" placeholder="50%"></b-input>
          </b-field>
          <b-field label="Valor">
            <b-input v-model="service.value" placeholder="825"></b-input>
          </b-field>
          <b-field label="Recebido">
            <b-input placeholder="825"></b-input>
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
          <textarea v-model="service.description" name="" id="" cols="35" rows="15"></textarea>
        </b-field>
        <div class="buttonsCreate">
          <button class="is-primary">Cancelar</button>
          <button class="is-primary" @click="createService">Cadastrar</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { header } from '../../../config/index.js'
export default {
  name: 'createService',
  data () {
    return {
      radio: '',
      client_id: undefined,
      service: {
        name: undefined,
        description: undefined,
        due_date: undefined,
        forecast: undefined,
        profit: undefined,
        status_id: 1,
        value: undefined
      }
    }
  },
  computed: {
  },
  beforeMount () {
  },
  methods: {
    createService () {
      let data = {
        client_id: this.$route.params.code,
        service: this.service
      }
      this.$http.post(this.$api({ target: 'services' }), data, {
        headers: header()
      }).then(() => {
        this.$router.push({ name: 'serviceShow' })
      })
    }
  }
}
</script>
