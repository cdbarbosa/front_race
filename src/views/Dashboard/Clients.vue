<template>
  <main id="clients">
    <b-tabs type="is-boxed">
      <b-tab-item label="Principal">
        <vmaster></vmaster>
      </b-tab-item>
      <b-tab-item label="Serviços">
        <client-services></client-services>
      </b-tab-item>
    </b-tabs>
  </main>
</template>

<script>
import vmaster from './clients/vmaster.vue'
import clientServices from './clients/clientServices.vue'
export default {
  name: 'clients',
  components: {
    vmaster,
    clientServices
  }
}
</script>
