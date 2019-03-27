<template>
  <div id="app" style="height: 100%">
    <transition name="fade" mode="out-in">
      <router-view :scroll="scroll"></router-view>
    </transition>
  </div>
</template>

<script>
import { header } from './config'
export default {
  name: 'app',
  data () {
    return {
      scroll: 0
    }
  },
  mounted () {
  },
  methods: {
    //
  },
  components: {
    //
  }
}
</script>

<style lang="scss">
  @import "~bulma";
  @import "~buefy/src/scss/buefy";
  @import "scss/main.scss";
</style>
