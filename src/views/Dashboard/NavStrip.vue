<template>
  <div id="navstrip" v-if="user">
    <div class="logo">
      <img src="/img/logo.png" alt=""/>
    </div>
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
    },
    log () {
      console.log('mouse')
    }
  }
}
</script>
