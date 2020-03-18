<template>
  <main id="services">
    <b-tabs v-model="active" type="is-boxed">
      <b-tab-item label="Principal">
        <vmaster></vmaster>
      </b-tab-item>
    </b-tabs>
  </main>
</template>
<script>
import vmaster from './vmaster.vue'
export default {
  name: 'services',
  data () {
    return {
      active: 0
    }
  },
  components: {
    vmaster
  }
}
</script>
