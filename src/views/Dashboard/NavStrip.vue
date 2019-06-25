<template>
  <div id="navstrip" v-if="user">
    <div class="logo">
      <img src="/img/logo.png" alt=""/>
    </div>
    <div class="links">
      <ul v-if="user.role.name === 'admin'">
        <router-link tag="li" :to="{ name: 'client', params: { client_id: $route.params.client_id } }">
          Clientes
        </router-link>
        <router-link tag="li" :to="{ name: 'rh', params: { rh_id: $route.params.rh_id } }">RH's</router-link>
        <router-link tag="li" :to="{ name: 'service', params: { service_id: $route.params.service_id } }">
          Serviços
        </router-link>
        <li @click="logout">Sair</li>
        <!-- <router&#45;link tag="li" :to={}>Administração</router&#45;link> -->
      </ul>
      <ul v-else-if="user.role.name === 'rh'">
        <router-link tag="li" :to="{ name: 'rh', params: { rh_id: $route.params.rh_id } }">Perfil</router-link>
        <router-link tag="li" :to="{ name: 'service', params: { service_id: $route.params.service_id } }">
          Serviços
        </router-link>
        <li @click="logout">Sair</li>
        <!-- <router&#45;link tag="li" :to={}>Administração</router&#45;link> -->
      </ul>
      <ul v-else-if="user.role.name === 'tj'">
        <router-link tag="li" :to="{ name: 'service', params: { service_id: $route.params.service_id } }">
          Serviços
        </router-link>
        <li @click="logout">Sair</li>
      </ul>
    </div>
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
      radio: ''
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    ...mapActions([
      'destroyUserStore'
    ]),
    logout () {
      window.localStorage.removeItem('authTokens')
      this.$router.push({ name: 'login' })
      this.destroyUserStore()
    }
  }
}
</script>
