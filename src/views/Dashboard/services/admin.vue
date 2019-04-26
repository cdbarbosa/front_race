<template>
  <main id="services">
    <b-tabs v-model="active" type="is-boxed">
      <b-tab-item label="Master">
        <vmaster></vmaster>
      </b-tab-item>
      <b-tab-item label="Detalhes">
        <vdetails v-if="$route.params.service_id"></vdetails>
      </b-tab-item>
      <b-tab-item label="Recebimentos">
        <vreceipt v-if="$route.params.service_id"></vreceipt>
      </b-tab-item>
      <b-tab-item label="Histórico">
        <vhistory :active="active" v-if="$route.params.service_id"></vhistory>
      </b-tab-item>
    </b-tabs>
  </main>
</template>
<script>
import vmaster from './vmaster.vue'
import vdetails from './details'
import vhistory from './vhistory'
import vreceipt from './Receipt'
export default {
  name: 'services',
  data () {
    return {
      active: 0
    }
  },
  components: {
    vmaster,
    vhistory,
    vdetails,
    vreceipt
  }
}
</script>
