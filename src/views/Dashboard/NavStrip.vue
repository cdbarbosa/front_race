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
          <router-link tag="li" :to="{ name: 'showServices'}">
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
      services: false,
      radio: ''
    }
  },
  methods: {
    //
  },
  beforeMount () {
    /* eslint-disable no-console */
  }
}
</script>
