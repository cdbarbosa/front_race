<template>
  <main id="services">
    <b-tabs type="is-boxed">
      <b-tab-item label="Master">
        <show-service></show-service>
      </b-tab-item>
      <b-tab-item label="Detalhes">
        <vdetails v-if="$route.params.service_id"></vdetails>
      </b-tab-item>
      <b-tab-item label="Recebimentos">
        <receipt v-if="$route.params.service_id"></receipt>
      </b-tab-item>
    </b-tabs>
  </main>
  <!-- <transition name="fade" mode="out&#45;in"> -->
  <!--   <router&#45;view></router&#45;view> -->
  <!-- </transition> -->
</template>
<script>
import showService from './services/showServices.vue'
import vdetails from './services/details'
import receipt from './services/receipt'
export default {
  name: 'services',
  components: {
    showService,
    vdetails,
    receipt
  }
}
</script>
