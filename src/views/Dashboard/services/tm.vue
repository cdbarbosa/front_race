<template>
  <main id="services">
    <b-tabs :destroy-on-hide="true" v-model="active" type="is-boxed">
      <b-tab-item label="Principal">
        <vmaster></vmaster>
      </b-tab-item>
      <b-tab-item label="Histórico">
        <vhistory :active="active" v-if="$route.params.service_id"></vhistory>
      </b-tab-item>
      <b-tab-item label="Relatórios">
        <vreport v-if="$route.params.service_id"></vreport>
      </b-tab-item>
    </b-tabs>
  </main>
</template>
<script>
import vmaster from './vmaster.vue'
import vreport from './report.vue'
import vhistory from './vhistory.vue'
export default {
  name: 'services',
  data () {
    return {
      active: 0
    }
  },
  components: {
    vmaster,
    vreport,
    vhistory
  }
}
</script>
