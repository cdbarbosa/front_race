<template>
  <main class="page" id="login">
    <vue-particles clickMode="repulse" color="#dedede"></vue-particles>
    <div class="wrapper">
      <transition name="fade" mode="out-in">
        <form @submit.prevent="send" v-if="!recover">
          <img src="/img/logo@2x.png" alt=""/>
          <b-field label="Email">
            <b-input v-model="login" name="email" placeholder="Email" required></b-input>
          </b-field>
          <b-field label="Senha">
            <b-input type="password" name="password" v-model="password" placeholder="Password" required></b-input>
          </b-field>
          <section>
            <button type="submit">Entrar</button>
            <a @click="recover = true">Esqueceu sua senha?</a>
            <transition name="fade" mode="out-in">
            </transition>
          </section>
          <p>{{ message }}</p>
        </form>
        <form v-else @submit.prevent="resetPassword">
          <img src="/img/logo@2x.png" alt=""/>
          <b-field label="Email">
            <b-input v-model="login" name="recover_email" placeholder="Email" required></b-input>
          </b-field>
          <button type="submit">Enviar</button>
        </form>
      </transition>
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
      message: '',
      recover: false
    }
  },
  beforeMount () {
    const authTokens = JSON.parse(window.localStorage.getItem('authTokens'))
    const authConn = window.localStorage.getItem('authConn')
    if (authConn) this.setConn(authConn)
    if (authTokens) this.reLogin(authTokens)
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'getAuthToken',
      'getAuthUser',
      'setAuthToken',
      'setAuthUser',
      'setConn'
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
    },
    resetPassword () {
      this.$http.post(this.$api({ target: 'password/create' }), { email: this.login }).then(response => {
        console.log(response)
      }).then(err => {
        console.log(err)
      })
    }
  }
}
</script>
