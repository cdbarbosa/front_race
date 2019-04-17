<template>
  <main id="clients">
    <b-tabs type="is-boxed">
      <b-tab-item label="Master">
        <vmaster></vmaster>
      </b-tab-item>
    </b-tabs>
  </main>
</template>

<script>
import vmaster from './clients/vmaster.vue'
export default {
  name: 'clients',
  components: {
    vmaster
  }
}
</script>
