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
const routes = {
  admin: 'client',
  rh: 'rh',
  user: 'service',
  tj: 'service'
}
export default {
  name: 'login',
  data () {
    return {
      login: '',
      password: '',
      // login: '',
      // password: '',
      message: ''
    }
  },
  beforeMount () {
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
            let authUser = response.data
            this.setAuthUser(authUser).then(status => {
              return authUser
            }).then(user => {
              this.message = 'Token Validado'
              this.$router.push({ name: routes[authUser.role.name] })
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
          let authUser = response.data
          this.setAuthUser(authUser).then(status => {
            return authUser
          }).then(user => {
            this.message = 'Token Validado'
            this.$router.push({ name: routes[authUser.role.name] })
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
