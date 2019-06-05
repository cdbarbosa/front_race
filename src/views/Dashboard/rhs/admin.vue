<template>
  <main id="rhs">
    <b-tabs type="is-boxed">
      <b-tab-item label="Master">
        <vmaster></vmaster>
      </b-tab-item>
      <b-tab-item label="Serviços">
        <rh-services></rh-services>
      </b-tab-item>
    </b-tabs>
  </main>
</template>

<script>
import vmaster from './vmaster.vue'
import rhServices from './rhServices.vue'
export default {
  name: 'rhs',
  components: {
    vmaster,
    rhServices
  }
}
</script>
