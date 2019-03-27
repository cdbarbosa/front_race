<template>
  <div class="content" v-if="selected">
    <section>
      <article>
        <b-field label="Título">
          <b-input v-model="selected.name" disabled></b-input>
        </b-field>
        <b-field label="ID">
          <b-input v-model="selected.id" placeholder="23"></b-input>
        </b-field>
      </article>
      <article>
        <b-field label="Cliente">
          <b-input v-model="selected.client.name" placeholder="Cliente" disabled></b-input>
        </b-field>
        <b-field label="Sigilo">
          <div class="block">
            <b-radio v-model="selected.confidentiality_id" :native-value="1" disabled>Nenhum</b-radio>
            <b-radio v-model="selected.confidentiality_id" :native-value="2" disabled>Parcial</b-radio>
            <b-radio v-model="selected.confidentiality_id" :native-value="3" disabled>Total</b-radio>
          </div>
        </b-field>
      </article>
      <article>
        <b-field label="Data de Registro">
          <b-input :value="parseDate(selected.created_at)" v-mask="'##/##/####'" placeholder="data" name="register" disabled></b-input>
        </b-field>
        <b-field label="Previsão">
          <b-input :value="parseDate(selected.created_at)" v-mask="'##/##/####'" placeholder="data" name="date" disabled></b-input>
        </b-field>
        <b-field label="Prazo">
          <b-input :value="parseDate(selected.due_date)" v-mask="'##/##/####'" placeholder="data" name="date-duo" disabled></b-input>
        </b-field>
      </article>
      <article>
        <b-field label="Margem">
          <b-input :value="`${selected.profit} %`" placeholder="50%" disabled></b-input>
        </b-field>
        <b-field label="Valor">
          <money class="input" :value="selected.total_cost" v-money="money" :masked="true" disabled></money>
          <!-- <b&#45;input :value="selected.total_cost" v&#45;money="money" placeholder="825" disabled></b&#45;input> -->
        </b-field>
        <b-field label="Recebido">
          <money class="input" :value="selected.received_value" v-money="money" :masked="true" disabled></money>
          <!-- <b&#45;input :value="" v&#45;money="money" placeholder="825" disabled></b&#45;input> -->
        </b-field>
      </article>
      <b-field label="Situação">
        <b-input :value="`${selected.status.abbreviation} - ${selected.status.description}`" disabled></b-input>
        <!-- <b&#45;select placeholder="Select a name"> -->
        <!--   <option value="">Selecione</option> -->
        <!--   <option value="1">ORCA &#45; Orçamento (em aberto)</option> -->
        <!-- </b&#45;select> -->
      </b-field>
      <div class="actions">
        <router-link tag="button" :to="{ name: 'serviceReceipts', params: { service_id: this.$route.params.service_id } }">Recebimentos</router-link>
        <router-link tag="button" :to="{ name: 'serviceDetails', params: { service_id: this.$route.params.service_id } }">Detalhes</router-link>
      </div>
    </section>
    <section>
      <div class="description">
        <b-field label="Observações">
          <div class="textarea" v-html="selected.description"></div>
        </b-field>
      </div>
    </section>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'service',
  props: ['selected'],
  data () {
    return {
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: true
      },
      radio: ''
    }
  },
  methods: {
    parseDate (date) {
      return moment(date).format('DD/MM/YYYY')
    }
  }
}
</script>
