<template>
  <div id="navstrip">
    <div class="logo"></div>
    <div class="links">
      <ul>
        <router-link tag="li" :to="{ name: 'overview' }">
          Overview
        </router-link>
        <router-link tag="li" :to="{ name: 'clients' }" >
          Clientes
        </router-link>
        <router-link tag="li" :to={}>RH's</router-link>
        <div class="selectService">
          <router-link :to="{ name: 'service'}">
            <li @click="services = !services">Serviços</li>
          </router-link>
          <b-icon icon="fa-angle-down"></b-icon>
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
        <router-link tag="li" :to={}>Administração</router-link>
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
  }
}
</script>


