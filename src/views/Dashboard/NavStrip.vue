<template>
  <div id="navstrip">
    <div class="logo">
      <img src="/img/logo.png" alt=""/>
    </div>
    <div class="links">
      <ul>
        <!-- <router&#45;link tag="li" :to="{ name: 'overview' }" :class="{__active: this.$route.name == 'overview'}"> -->
        <!--   Overview -->
        <!-- </router&#45;link> -->
        <router-link tag="li" :to="{ name: 'clients' }">
          Clientes
        </router-link>
        <router-link tag="li" :to="{ name: 'showRhs' }">RH's</router-link>
        <div class="selectService">
          <router-link tag="li" :to="{ name: 'showServices'}" :class="{__active: this.$route.name === 'serviceShow' || this.$route.name === 'vueDetails' || this.$route.name === 'receipt'}">
            Serviços
            <span @click="serviceSubMenuOpen = !serviceSubMenuOpen" class="toggleBtn">
              <b-icon  icon="fa-angle-down"></b-icon>
            </span>
          </router-link>
        </div>
        <!-- <div :class="[{ __open: serviceSubMenuOpen }, 'serviceSubMenu']">
          <ul>
            <router-link tag="li" :to="{ name: 'vueDetails' }">
              Detalhes
            </router-link>
            <router-link tag="li" :to="{ name: 'receive' }">
              Recebimentos
            </router-link>
          </ul>
        </div> -->
        <!-- <router&#45;link tag="li" :to={}>Administração</router&#45;link> -->
      </ul>
    </div>
  </div>
</template>
<script>
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
  methods: {
    //
  },
  beforeMount () {
    /* eslint-disable no-console */
    console.log(this.$route)
  }
}
</script>
