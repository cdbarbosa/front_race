<template>
  <div :class="[title.toLowerCase()]">
    <h3>{{ title }}</h3>
    <section>
      <article>
        <b-field label="Nome">
          <b-input v-model="name" placeholder="Nome"></b-input>
        </b-field>
        <b-field label="ID">
          <b-input v-model="person.id" placeholder="23" disabled></b-input>
        </b-field>
      </article>
      <article class="info-second">
        <b-field label="Cadastro">
          <b-input :value="parseDate(person.created_at)" v-mask="'##/##/####'" disabled></b-input>
        </b-field>
        <b-field label="Telefone">
          <b-input v-model="phone" placeholder="Telefone"></b-input>
        </b-field>
      </article>
      <article class="info-second">
        <b-field label="Email">
          <b-input v-model="email" type="email" placeholder="example@example.com" ></b-input>
        </b-field>
        <div class="block">
          <b-radio v-model="person.user.type.id" native-value="1" >
            Juridico
          </b-radio>
          <b-radio v-model="person.user.type.id" native-value="2" >
            Fisico
          </b-radio>
        </div>
      </article>
      <b-field label="CPF/CNPJ">
        <b-input v-model="person.user.document" v-mask="['###.###.###-##', '##.###.###/####-##']" placeholder="cpf" ></b-input>
      </b-field>
      <address class="address">
        <h3>Endereço</h3>
        <article>
          <b-field label="Rua">
            <b-input v-model="address" placeholder="Rua"></b-input>
          </b-field>
          <b-field label="Estado">
            <b-input v-model="state" placeholder="ES"></b-input>
          </b-field>
        </article>
        <article>
          <b-field label="CEP">
            <b-input v-model="postal_code" placeholder="CEP"></b-input>
          </b-field>
          <b-field label="Bairro">
            <b-input v-model="neighborhood" placeholder="Bairro"></b-input>
          </b-field>
          <b-field label="Cidade">
            <b-input v-model="city" placeholder="Cidade"></b-input>
          </b-field>
        </article>
        <slot></slot>
      </address>
    </section>
  </div>
</template>
<script>
import moment from 'moment'
import _ from 'lodash'
export default {
  name: 'editGeneric',
  props: ['person', 'title'],
  data () {
    return {
      update: undefined
    }
  },
  methods: {
    parseDate (date) {
      return moment(date).format('DD/MM/YYYY')
    }
  },
  beforeMount () {
    this.update = this.title === 'Cliente' ? 'client' : 'rh'
  },
  computed: {
    name: {
      get () {
        return this.person.name
      },
      set: _.debounce(function (newVal, oldVal) {
        this.$emit('change', ['name', newVal, this.update])
      }, 1000)
    },
    phone: {
      get () {
        return this.person.phone
      },
      set: _.debounce(function (newVal, oldVal) {
        this.$emit('change', ['phone', newVal, this.update])
      }, 1000)
    },
    email: {
      get () {
        return this.person.user.email
      },
      set: _.debounce(function (newVal, oldVal) {
        this.$emit('change', ['email', newVal, 'user'])
      }, 1000)
    },
    address: {
      get () {
        return this.person.user.address.address
      },
      set: _.debounce(function (newVal, oldVal) {
        this.$emit('change', ['address', newVal, 'address'])
      }, 1000)
    },
    state: {
      get () {
        return this.person.user.address.state
      },
      set: _.debounce(function (newVal, oldVal) {
        this.$emit('change', ['state', newVal, 'address'])
      }, 1000)
    },
    postal_code: {
      get () {
        return this.person.user.address.postal_code
      },
      set: _.debounce(function (newVal, oldVal) {
        this.$emit('change', ['postal_code', newVal, 'address'])
      }, 1000)
    },
    neighborhood: {
      get () {
        return this.person.user.address.neighborhood
      },
      set: _.debounce(function (newVal, oldVal) {
        this.$emit('change', ['neighborhood', newVal, 'address'])
      }, 1000)
    },
    city: {
      get () {
        return this.person.user.address.city
      },
      set: _.debounce(function (newVal, oldVal) {
        this.$emit('change', ['city', newVal, 'address'])
      }, 1000)
    }
  }
}
</script>
