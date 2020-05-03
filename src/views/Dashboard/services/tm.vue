<template>
  <main id="services">
    <b-tabs :destroy-on-hide="true" v-model="active" type="is-boxed">
      <b-tab-item label="Principal">
        <vmaster></vmaster>
      </b-tab-item>
      <!-- <b&#45;tab&#45;item label="Detalhes"> -->
      <!--   <vdetails v&#45;if="$route.params.service_id"></vdetails> -->
      <!-- </b&#45;tab&#45;item> -->
      <!-- <b&#45;tab&#45;item label="Recebimentos"> -->
      <!--   <vreceipt v&#45;if="$route.params.service_id"></vreceipt> -->
      <!-- </b&#45;tab&#45;item> -->
      <!-- <b&#45;tab&#45;item label="Histórico"> -->
      <!--   <vhistory :active="active" v&#45;if="$route.params.service_id"></vhistory> -->
      <!-- </b&#45;tab&#45;item> -->
      <b-tab-item label="Relatórios">
        <vreport v-if="$route.params.service_id"></vreport>
      </b-tab-item>
    </b-tabs>
  </main>
</template>
<script>
import vmaster from './vmaster.vue'
import vreport from './report.vue'
export default {
  name: 'services',
  data () {
    return {
      active: 0
    }
  },
  components: {
    vmaster,
    vreport
  }
}
</script>
