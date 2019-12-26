<template>
  <form class="" @submit.prevent="$emit('update', { user: user })" id="accountsEdit">
    <header>
      <h3>Editar Conta</h3>
    </header>
    <div class="content grid">
      <b-field label="Email" id="email">
        <b-input placeholder="Email" v-model="user.email" disabled></b-input>
      </b-field>
      <b-field label="Tipo de conta" id="type">
        <b-input placeholder="Tipo de Conta" v-model="account.role.description" disabled></b-input>
      </b-field>
      <b-field label="Ativo" id="active">
          <b-checkbox v-model="user.active" :true-value="1" :false-value="0"></b-checkbox>
      </b-field>
      <b-field label="Senha antiga" id="old-password">
        <b-input type="password" placeholder="Senha" v-model="password" password-reveal></b-input>
      </b-field>
      <button class="__success" type="button" id="check" @click="check">Verificar</button>
      <b-field label="Nova Senha" id="password">
        <b-input type="password" placeholder="Senha" v-model="user.password" password-reveal :disabled="!confirmed"></b-input>
      </b-field>
      <b-field :type="confirmationType.type" :message="confirmationType.message" label="Confirme a senha" :required="confirmed" id="passwordConfirmation">
        <b-input type="password" placeholder="Senha" v-model="user.passwordConfirmation" password-reveal :required="confirmed" :disabled="!confirmed"></b-input>
      </b-field>
      <button class="__error" id="cancel" type="button" @click="$emit('cancel')">Cancelar</button>
      <button class="__success" id="confirm" type="submit" :disabled="confirmationType.type === 'is-success'">Atualizar</button>
    </div>
  </form>
</template>

<script>
import { client } from '../../../config/index.js'
export default {
  name: 'accountsEdit',
  props: ['account'],
  data () {
    return {
      password: null,
      confirmed: false,
      user: {
        email: null,
        password: null,
        passwordConfirmation: null,
        active: null
      }
    }
  },
  mounted () {
  },
  computed: {
    confirmationType () {
      return this.user.password ? (this.user.password === this.user.passwordConfirmation ? { type: 'is-success' } : { type: 'is-danger', message: 'As senhas devem ser iguais' }) : { type: 'is-danger', message: 'Preencha a senha' }
    }
  },
  beforeMount () {
    this.user.id = this.account.id
    this.user.email = this.deepCopy(this.account.email)
    this.user.active = this.deepCopy(this.account.active)
  },
  methods: {
    deepCopy (attr) {
      return JSON.parse(JSON.stringify(attr))
    },
    check () {
      let data = {
        username: this.user.email,
        password: this.password
      }
      Object.assign(data, client(this.$store.getters.conn), { grant_type: 'password', scope: '' })
      this.$http.post(this.$api({
        target: 'oauth/token', // the url /api/oauth/tokens
        secure: false // ignore version
      }), data).then(response => {
        if (response.status === 200) {
          this.confirmed = true
        } else {
          this.password = null
        }
      })
    }
  }
}
</script>
