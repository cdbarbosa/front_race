<template>
  <main id="services">
    <b-tabs v-model="active" type="is-boxed" :destroy-on-hide="true">
      <b-tab-item label="Principal">
        <vmaster></vmaster>
      </b-tab-item>
      <b-tab-item label="Histórico">
        <vhistory :active="active" v-if="$route.params.service_id"></vhistory>
      </b-tab-item>
    </b-tabs>
  </main>
</template>
<script>
import vmaster from './vmaster.vue'
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
    vhistory
  }
}
</script>
