<template>
  <main id="services">
    <b-tabs :destroy-on-hide="true" v-model="active" type="is-boxed">
      <b-tab-item label="Principal">
        <vmaster></vmaster>
      </b-tab-item>
      <b-tab-item  label="Detalhes">
        <vdetails v-if="$route.params.service_id"></vdetails>
      </b-tab-item>
      <b-tab-item label="Recebimentos">
        <vreceipt v-if="$route.params.service_id"></vreceipt>
      </b-tab-item>
      <b-tab-item label="Histórico/Situação">
        <vhistory :active="active" v-if="$route.params.service_id"></vhistory>
      </b-tab-item>
      <b-tab-item label="Histórico/RH">
        <vhistory-rh :active="active" v-if="$route.params.service_id"></vhistory-rh>
      </b-tab-item>
      <b-tab-item label="Relatórios">
        <vreport v-if="$route.params.service_id"></vreport>
      </b-tab-item>
    </b-tabs>
  </main>
</template>
<script>
import vmaster from './vmaster.vue'
import vdetails from './details.vue'
import vhistory from './vhistory.vue'
import vhistoryRh from './vhistoryRh.vue'
import vreceipt from './Receipt.vue'
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
    vhistory,
    vhistoryRh,
    vdetails,
    vreceipt,
    vreport
  }
}
</script>
