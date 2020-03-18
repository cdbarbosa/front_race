<template>
  <main id="control">
    <b-tabs type="is-boxed">
      <b-tab-item label="Contas">
        <d-control-accounts></d-control-accounts>
      </b-tab-item>
    </b-tabs>
  </main>
</template>

<script>
import dControlAccounts from './control/d-control-accounts.vue'
export default {
  name: 'control',
  components: {
    dControlAccounts
  }
}
</script>
