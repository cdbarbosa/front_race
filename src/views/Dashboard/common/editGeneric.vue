<template>
  <div :class="[{client: title === 'Cliente'}, {rh: title === 'Rh'}]">
    <h3>{{ title }}</h3>
    <div class="info-first">
      <b-field label="Nome">
        <b-input v-model="name" placeholder="Nome"></b-input>
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
        <b-input v-model="phone" v-mask="'(##) # ####-####'" placeholder="Telefone"></b-input>
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
          <b-input v-model="address" placeholder="Rua"></b-input>
        </b-field>
        <b-field label="Estado">
          <b-input v-model="state" placeholder="ES"></b-input>
        </b-field>
      </div>
      <div class="info-fourth">
        <b-field label="CEP">
          <b-input v-model="postal_code" v-mask="'##.###-###'" placeholder="CEP"></b-input>
        </b-field>
        <b-field label="Bairro">
          <b-input v-model="neighborhood" placeholder="Bairro"></b-input>
        </b-field>
        <b-field label="Cidade">
          <b-input v-model="city" placeholder="Cidade"></b-input>
        </b-field>
      </div>
    </div>
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
      }, 400)
    },
    phone: {
      get () {
        return this.person.phone
      },
      set: _.debounce(function (newVal, oldVal) {
        this.$emit('change', ['phone', newVal, this.update])
      }, 400)
    },
    address: {
      get () {
        return this.person.user.address.address
      },
      set: _.debounce(function (newVal, oldVal) {
        this.$emit('change', ['address', newVal, 'address'])
      }, 400)
    },
    state: {
      get () {
        return this.person.user.address.state
      },
      set: _.debounce(function (newVal, oldVal) {
        this.$emit('change', ['state', newVal, 'address'])
      }, 400)
    },
    postal_code: {
      get () {
        return this.person.user.address.postal_code
      },
      set: _.debounce(function (newVal, oldVal) {
        this.$emit('change', ['postal_code', newVal, 'address'])
      }, 400)
    },
    neighborhood: {
      get () {
        return this.person.user.address.neighborhood
      },
      set: _.debounce(function (newVal, oldVal) {
        this.$emit('change', ['neighborhood', newVal, 'address'])
      }, 400)
    },
    city: {
      get () {
        return this.person.user.address.city
      },
      set: _.debounce(function (newVal, oldVal) {
        this.$emit('change', ['city', newVal, 'address'])
      }, 400)
    }
  }
}
</script>
