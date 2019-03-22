<template>
  <section>
    <div class="info-first">
      <b-field label="Nome">
        <b-input v-model="person.name" placeholder="Nome" disabled></b-input>
      </b-field>
      <b-field label="ID">
        <b-input v-model="person.id" placeholder="23" disabled></b-input>
      </b-field>
    </div>
    <div class="info-second">
      <b-field label="Cadastro">
        <b-input :value="parseDate(person.created_at)" v-mask="'##/##/####'" disabled></b-input>
      </b-field>
      <b-field label="Telefone">
        <b-input v-model="person.phone" v-mask="'(##) # ####-####'" placeholder="Telefone" disabled></b-input>
      </b-field>
    </div>
    <div class="info-second">
      <b-field label="Email">
        <b-input v-model="person.user.email" type="email" placeholder="example@example.com" disabled></b-input>
      </b-field>
      <div class="block">
        <b-radio v-model="person.user.type.id" native-value="1" disabled>
          Juridico
        </b-radio>
        <b-radio v-model="person.user.type.id" native-value="2" disabled>
          Fisico
        </b-radio>
      </div>
    </div>
    <b-field label="CPF/CNPJ">
      <b-input v-model="person.user.document" v-mask="['###.###.###-##', '##.###.###/####-##']" placeholder="cpf" disabled></b-input>
    </b-field>
    <div class="address">
      <h3>Endereço</h3>
      <div class="info-three">
        <b-field label="Rua">
          <b-input v-model="person.user.address.address" placeholder="Rua" disabled></b-input>
        </b-field>
        <b-field label="Estado">
          <b-input v-model="person.user.address.state" placeholder="ES" disabled></b-input>
        </b-field>
      </div>
      <div class="info-fourth">
        <b-field label="CEP">
          <b-input v-model="person.user.address.postal_code" v-mask="'##.###-###'" placeholder="CEP" disabled></b-input>
        </b-field>
        <b-field label="Bairro">
          <b-input v-model="person.user.address.neighborhood" placeholder="Bairro" disabled></b-input>
        </b-field>
        <b-field label="Cidade">
          <b-input v-model="person.user.address.city" placeholder="Cidade" disabled></b-input>
        </b-field>
      </div>
    </div>
  </section>
</template>
<script>
import moment from 'moment'
export default {
  name: 'componentGeneric',
  props: ['person'],
  data () {
    return {
    }
  },
  methods: {
    parseDate (date) {
      return moment(date).format('DD/MM/YYYY')
    }
  }
}
</script>
