<template>
  <div id="navstrip">
    <div class="logo">
      <img src="/img/logo.png" alt=""/>
    </div>
    <div class="links">
      <ul>
        <router-link tag="li" :to="{ name: 'client' }">
          Clientes
        </router-link>
        <router-link tag="li" :to="{ name: 'rh' }">RH's</router-link>
        <router-link tag="li" :to="{ name: 'service' }">
          Serviços
        </router-link>
        <li @click="logout">Sair</li>
        <!-- <router&#45;link tag="li" :to={}>Administração</router&#45;link> -->
      </ul>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
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
