<template>
  <main class="page" id="login">
    <div class="wrapper">
      <form @submit.prevent="send">
        <img src="/img/logo@2x.png" alt=""/>
        <b-field label="Email">
          <b-input v-model="login" placeholder="Email"></b-input>
        </b-field>
        <b-field label="Senha">
          <b-input type="password" v-model="password" placeholder="Password"></b-input>
        </b-field>
        <button type="submit">Entrar</button>
      </form>
    </div>
  </main>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      login: 'admin@admin.com',
      password: 'nit_admin'
    }
  },
  beforeMount () {
    this.reLogin()
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'getAuthToken',
      'getAuthUser',
      'setAuthToken',
      'setAuthUser'
    ]),
    send () {
      this.getAuthToken([this, {
        username: this.login, password: this.password
      }]).then(response => {
        this.setAuthToken(response.data).then(() => {
          this.getAuthUser(this).then(response => {
            this.setAuthUser(response.data).then(status => {
              this.$router.push({ name: 'client', params: { client_id: 1 } })
            })
          })
        })
      })
    },
    reLogin () {
      const authTokens = JSON.parse(window.localStorage.getItem('authTokens'))
      if (authTokens) {
        this.setAuthToken(authTokens).then(() => {
          this.getAuthUser(this).then(response => {
            this.setAuthUser(response.data).then(status => {
              this.$router.push({ name: 'client' })
            })
          })
        })
      }
    }
  }
}
</script>
