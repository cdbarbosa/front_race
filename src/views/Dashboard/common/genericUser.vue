<template>
  <section class="genericUser">
    <article>
      <b-field label="Nome">
        <b-input :value="person.name" placeholder="Nome" disabled></b-input>
      </b-field>
      <b-field label="Ativo">
        <b-checkbox :value="person.user.active === 1 || person.user.active" disabled></b-checkbox>
      </b-field>
      <b-field label="ID">
        <b-input :value="person.id" placeholder="23" disabled></b-input>
      </b-field>
    </article>
    <article>
      <b-field label="Cadastro">
        <b-input :value="parseDate(person.created_at)" v-mask="'##/##/####'" disabled></b-input>
      </b-field>
      <b-field label="Telefone">
        <b-input :value="person.phone" v-mask="'(##) # ####-####'" placeholder="Telefone" disabled></b-input>
      </b-field>
    </article>
    <article>
      <b-field label="Email">
        <b-input :value="person.user.email" type="email" placeholder="example@example.com" disabled></b-input>
      </b-field>
    </article>
    <article>
      <b-field label="Data (nascimento)">
        <b-input :value="person.user.birthdate ? parseDate(person.user.birthdate) : 'Não informado'" v-mask="'##/##/####'" disabled></b-input>
      </b-field>
      <b-field label="CPF/CNPJ">
        <b-input :value="person.user.document" v-mask="['###.###.###-##', '##.###.###/####-##']" placeholder="CPF/CNPJ" disabled></b-input>
      </b-field>
      <b-field label="Tipo">
        <div class="control">
          <b-radio v-model="person.user.type_id" native-value="1" disabled>
            Jurídica
          </b-radio>
          <b-radio v-model="person.user.type_id" native-value="2" disabled>
            Física
          </b-radio>
        </div>
      </b-field>
    </article>
    <slot name="academic"></slot>
    <address class="address">
      <h3>Endereço</h3>
      <article>
        <b-field label="Logradouro">
          <b-input :value="person.user.address.address" placeholder="Logradouro" disabled></b-input>
        </b-field>
        <b-field label="Complemento">
          <b-input :value="person.user.address.complement" placeholder="Complemento" disabled></b-input>
        </b-field>
        <b-field label="Estado">
          <b-input :value="person.user.address.state" placeholder="ES" disabled></b-input>
        </b-field>
      </article>
      <article class="info-fourth">
        <b-field label="CEP">
          <b-input :value="person.user.address.postal_code" v-mask="'##.###-###'" placeholder="CEP" disabled></b-input>
        </b-field>
        <b-field label="Bairro">
          <b-input :value="person.user.address.neighborhood" placeholder="Bairro" disabled></b-input>
        </b-field>
        <b-field label="Cidade">
          <b-input :value="person.user.address.city" placeholder="Cidade" disabled></b-input>
        </b-field>
      </article>
    </address>
  </section>
</template>
<script>
import moment from 'moment'
moment.locale('pt-BR')
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
