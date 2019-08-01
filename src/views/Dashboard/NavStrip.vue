<template>
  <div id="navstrip" v-if="user">
    <div class="logo">
      <img src="/img/logo.png" alt=""/>
    </div>
    <h4>{{ user.email }}</h4>
    <div class="links">
      <ul>
        <span v-if="user.role.name === 'admin'">
          <router-link tag="li" :to="{ name: 'client', params: { client_id: $route.params.client_id } }">
            Clientes
          </router-link>
          <router-link tag="li" :to="{ name: 'rh', params: { rh_id: $route.params.rh_id } }">RH's</router-link>
          <router-link tag="li" :to="{ name: 'service', params: { service_id: $route.params.service_id } }">
            Serviços
          </router-link>
        </span>
        <span v-else-if="user.role.name === 'rh'">
          <router-link tag="li" :to="{ name: 'rh', params: { rh_id: $route.params.rh_id } }">Perfil</router-link>
          <router-link tag="li" :to="{ name: 'service', params: { service_id: $route.params.service_id } }">
            Serviços
          </router-link>
        </span>
        <span v-else-if="user.role.name === 'tj'">
          <router-link tag="li" :to="{ name: 'service', params: { service_id: $route.params.service_id } }">
            Serviços
          </router-link>
        </span>
        <transition>
          <li v-if="!confim" @click="confim = true">Sair</li>
          <li v-else id="actions">
            <button @click="logout">Confirmar</button>
            <button @click="confim = false">Cancelar</button>
          </li>
        </transition>
      </ul>
    </div>
    <b-switch id="connSwitch" v-model="conn" true-value="prod" false-value="beta">
      <strong>Conexão: </strong>{{ conn }}
    </b-switch>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'navstrip',
  data () {
    return {
      active: 1,
      index: 0,
      serviceSubMenuOpen: false,
      radio: '',
      confim: false
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ]),
    conn: {
      get () {
        return this.$store.getters.conn
      },
      set (newVal) {
        this.setConn(newVal)
        this.logout()
      }
    }
  },
  methods: {
    ...mapActions([
      'destroyUserStore',
      'destroyRhStore',
      'destroyClientStore',
      'destroyServiceStore',
      'setConn'
    ]),
    logout () {
      window.localStorage.removeItem('authTokens')
      this.$router.push({ name: 'login' })
      this.destroyUserStore()
      this.destroyClientStore()
      this.destroyRhStore()
      this.destroyServiceStore()
    },
    log () {
      console.log('mouse')
    }
  }
}
</script>
