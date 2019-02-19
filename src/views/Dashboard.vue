<template>
  <div id="dashboard">
    <div class="component">
      <div class="dashNav">
        <navstrip></navstrip>
      </div>
      <div class="content">
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