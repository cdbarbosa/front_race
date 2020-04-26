<template>
  <form class="" @submit.prevent="$emit('create', { user: user })" id="accountsCreate">
    <header>
      <h3>Criar Conta</h3>
    </header>
    <div class="content grid">
      <b-field label="Email" id="email">
        <b-input placeholder="Email" v-model="user.email"></b-input>
      </b-field>
      <b-field label="Função" id="role">
        <b-select v-model="user.role_id" placeholder="Selecione um tipo de conta" required>
          <option
            v-for="role in roles"
            :value="role.id"
            :key="role.id">
          {{ role.description }}
          </option>
        </b-select>
      </b-field>
      <b-field label="Tipo" id="type">
        <div class="block">
          <b-radio v-model="user.type_id" native-value="1">
            Juridico
          </b-radio>
          <b-radio v-model="user.type_id" native-value="2">
            Fisico
          </b-radio>
        </div>
      </b-field>
      <b-field label="CPF/CNPJ" id="document">
        <b-input v-model="user.document" v-validate="rules.document" v-mask="user.type_id == 1 ? '##.###.###/####-##':'###.###.###-##' " placeholder="Documentos" name="document" required></b-input>
      </b-field>
      <b-field label="Nova Senha" id="password">
        <b-input type="password" placeholder="Senha" v-model="user.password" password-reveal></b-input>
      </b-field>
      <b-field :type="confirmationType.type" :message="confirmationType.message" label="Confirme a senha" id="passwordConfirmation">
        <b-input type="password" placeholder="Senha" v-model="user.passwordConfirmation" password-reveal></b-input>
      </b-field>
      <button class="__error" id="cancel" type="button" @click="$emit('cancel')">Cancelar</button>
      <button class="__success" id="confirm" type="submit" :disabled="confirmationType.type !== 'is-success'">Criar</button>
    </div>
  </form>
</template>

<script>
import { header } from '../../../config/index.js'
import userCreate from '@/mixins/userCreate'
export default {
  name: 'accountsCreate',
  mixins: [userCreate],
  data () {
    return {
      user: {
        email: null,
        password: null,
        passwordConfirmation: null,
        role_id: null,
        type_id: 2,
        document: null
      },
      roles: []
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
    this.getUserRoles()
  },
  methods: {
    getUserRoles () {
      this.$http.get(this.$api({
        target: 'roles/creatable',
        conn: this.$store.getters.conn
      }), {
        headers: header()
      }).then(response => {
        this.roles = response.data
      })
    },
    deepCopy (attr) {
      return JSON.parse(JSON.stringify(attr))
    }
  }
}
</script>
