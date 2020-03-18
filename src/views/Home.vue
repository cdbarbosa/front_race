<template>
  <div id="home">
    <div class="columns">
      <div class=" column is-one-quarter">
        <navstrip></navstrip>
      </div>
      <div class="column is-full">
        <dashboard></dashboard>
      </div>
    </div>
  </div>
</template>

<script>
import dashboard from './Dashboard.vue'
import navstrip from './Dashboard/NavStrip.vue'
export default {
  name: 'home',
  components: {
    dashboard,
    navstrip
  }
}
</script>
