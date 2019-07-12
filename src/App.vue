<template>
  <div id="app" style="height: 100%">
    <vue-progress-bar></vue-progress-bar>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
    <div id="refresh" v-if="updateExists">
      <p>
      Nova atualização encontrada!
      </p>
      <button @click="refreshApp">
        Atualizar
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      scroll: 0,
      refreshing: false,
      updateExists: false,
      registration: null
    }
  },
  created () {
    document.addEventListener('swUpdated', this.showRefreshUI, { once: true })
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (this.refreshing) return
      this.refreshing = true
      window.location.reload()
    })
  },
  mounted () {
  },
  methods: {
    showRefreshUI (e) {
      this.registration = e.detail
      this.updateExists = true
    },
    refreshApp () {
      this.updateExists = false
      if (!this.registration || !this.registration.waiting) return
      // send message to SW to skip the waiting and activate the new SW
      this.registration.waiting.postMessage('skipWaiting')
    }
  },
  components: {
  }
}
</script>

<style lang="scss">
  @import "~bulma";
  @import "~buefy/src/scss/buefy";
  @import "scss/main.scss";
</style>
