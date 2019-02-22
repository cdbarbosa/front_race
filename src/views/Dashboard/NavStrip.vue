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
        <router-link tag="li" :to="{ name: 'show' }" :class="{__active: this.$route.name == 'show' || this.$route.name == 'create'}">
          Clientes
        </router-link>
        <router-link tag="li" :to="{ name: 'rh' }" :class="{__active: this.$route.name == 'rh'}">RH's</router-link>
        <div class="selectService">
          <router-link tag="li" :to="{ name: 'service'}" :class="{__active: this.$route.name == 'service'}">
            Serviços
          </router-link>
          <span class="icon-select" @click="services = !services">
            <b-icon icon="fa-angle-down"></b-icon>
          </span>
        </div>
        <div class="alternative" v-if="services === true">
          <ul>
            <router-link tag="li" :to="{ name: 'details' }">
              Detalhes
            </router-link>
            <router-link tag="li" :to="{ name: 'receive' }">
              Recebimentos
            </router-link>
          </ul>
        </div>
        <router-link tag="li" :to={} :class="{__active: this.$route.name == 'administration'}">Administração</router-link>
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
      services: false,
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
