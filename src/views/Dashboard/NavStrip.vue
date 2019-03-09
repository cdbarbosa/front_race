<template>
  <div id="navstrip">
    <div class="logo">
      <img src="/img/logo.png" alt=""/>
    </div>
    <div class="links">
      <ul>
        <router-link tag="li" :to="{ name: 'clients'}">
          Clientes
        </router-link>
        <router-link tag="li" :to="{ name: 'rh' }">RH's</router-link>
        <div class="selectService">
          <router-link tag="li" :to="{ name: 'services' }" :class="{__active: this.$route.name === 'services' || this.$route.name === 'vueDetails' || this.$route.name === 'receipt'}">
            Serviços
          </router-link>
        </div>
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
