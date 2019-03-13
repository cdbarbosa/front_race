<template>
  <div id="navstrip">
    <div class="logo">
      <img src="/img/logo.png" alt=""/>
    </div>
    <div class="links">
      <ul>
        <router-link tag="li" :to="{ name: 'client', params: { client_id: $route.params.client_id || 1 } }" exact>
          Clientes
        </router-link>
        <router-link tag="li" :to="{ name: 'rh', params: { rh_id: $route.params.rh_id || 1 } }" exact>RH's</router-link>
        <router-link tag="li" :to="{ name: 'service', params: { service_id: $route.params.service_id || 1 } }">
          Serviços
        </router-link>
        <!-- <router&#45;link tag="li" :to={}>Administração</router&#45;link> -->
      </ul>
    </div>
  </div>
</template>
<script>
// import { mapGetters, mapActions } from 'vuex'
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
    // ...mapGetters([
    //   'services',
    //   'clients',
    //   'rhs'
    // ])
  },
  methods: {
    // ...mapActions([
    //   'getRhs',
    //   'getServices',
    //   'getClients'
    // ])
  },
  beforeMount () {
    // this.getRhs(this)
    // this.getServices(this)
    // this.getClients(this)
  }
}
</script>
