<template>
  <div id="dashboard">
    <div class="component">
      <div class="dashNav">
        <navstrip></navstrip>
      </div>
      <div class="content">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import navstrip from './Dashboard/NavStrip.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      banana: true
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  beforeRouteEnter (to, from, next) {
    next($this => {
      if ($this.user) next()
      else next({ name: 'login' })
    })
  },
  beforeMount () {
  },
  mounted () {
  },
  components: {
    navstrip
  }
}
</script>
