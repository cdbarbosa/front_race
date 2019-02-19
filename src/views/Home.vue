<template>
  <div id="home">
    <div class="columns">
      <div class=" column is-one-quarter">
        <navstrip></navstrip>
         <!-- <h1>Nav</h1> -->
      </div>
      <div class="column is-full">
        <!-- <transition name="fade" mdoe="out-in">
          <router-view></router-view>
        </transition> -->
        <dashboard></dashboard>
        <!-- <h1>Dashboard</h1> -->
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
