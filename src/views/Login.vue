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
        <section>
          <button type="submit">Entrar</button>
          <transition name="fade" mode="out-in">
            <p>{{ message }}</p>
          </transition>
        </section>
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
      password: 'nit_admin',
      message: ''
    }
  },
  beforeMount () {
    // this.reLogin()
    const authTokens = JSON.parse(window.localStorage.getItem('authTokens'))
    if (authTokens) this.reLogin(authTokens)
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
      this.message = 'Validando credênciais'
      this.getAuthToken([this, {
        username: this.login, password: this.password
      }]).then(response => {
        this.message = 'Credênciais validadas'
        this.setAuthToken(response.data).then(() => {
          this.message = 'Armazenando o token'
          this.getAuthUser(this).then(response => {
            this.message = 'Validando o token'
            this.setAuthUser(response.data).then(status => {
              this.message = 'Token Validado'
              this.$router.push({ name: 'client', params: { client_id: 1 } })
            })
          }).catch(err => {
            console.log(err)
            this.message = 'Token Expirado, faça o login novamente'
          })
        }).catch(err => {
          console.log(err)
        })
      }).catch(err => {
        console.log(err)
        this.message = 'Credênciais invalidas, tente novamente'
      })
    },
    reLogin (authTokens) {
      this.message = 'Token encontrado'
      this.setAuthToken(authTokens).then(() => {
        this.message = 'Validando token'
        this.getAuthUser(this).then(response => {
          this.message = 'Token Validado'
          this.setAuthUser(response.data).then(status => {
            this.$router.push({ name: 'client' })
          })
        }).catch(err => {
          console.log(err)
          this.message = 'Token Expirado, faça o login novamente'
        })
      })
    }
  }
}
</script>
