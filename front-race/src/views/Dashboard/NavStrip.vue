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
        <router-link tag="li" :to="{ name: 'service'}">Serviços</router-link>
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
      index: 0
    }
  }
}
</script>


