<template>
  <main id="rhs">
    <b-tabs type="is-boxed">
      <b-tab-item label="Master">
        <vmaster></vmaster>
      </b-tab-item>
    </b-tabs>
  </main>
</template>

<script>
import vmaster from './vmaster.vue'
export default {
  name: 'rhs',
  components: {
    vmaster
  }
}
</script>
