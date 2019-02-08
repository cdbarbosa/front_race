<template>
  <div id="dashboard">
    <div class="columns">
      <div class=" column is-one-fifth">
        <navstrip></navstrip>
         <!-- <h1>Nav</h1> -->
      </div>
      <div class="column">
        <transition name="fade" mdoe="in-out">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import navstrip from './Dashboard/NavStrip.vue'
export default {
  name: 'home',
  components: {
    navstrip
  }
}
</script>