<template>
  <main id="services">
    <b-tabs type="is-boxed">
      <b-tab-item label="Master">
        <vmaster></vmaster>
      </b-tab-item>
      <b-tab-item label="Detalhes">
        <vdetails v-if="$route.params.service_id"></vdetails>
      </b-tab-item>
      <b-tab-item label="Recebimentos">
        <vreceipt v-if="$route.params.service_id"></vreceipt>
      </b-tab-item>
    </b-tabs>
  </main>
  <!-- <transition name="fade" mode="out&#45;in"> -->
  <!--   <router&#45;view></router&#45;view> -->
  <!-- </transition> -->
</template>
<script>
import vmaster from './master.vue'
import vdetails from './details'
import vreceipt from './receipt'
export default {
  name: 'services',
  components: {
    vmaster,
    vdetails,
    vreceipt
  }
}
</script>
