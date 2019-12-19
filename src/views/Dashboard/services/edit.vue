<template>
  <main id="updateService" v-if="ready">
    <h3>Serviços</h3>
    <form @keyup.enter.ctrl="update" @submit.prevent="update">
      <render :service="serviceSelected"></render>
      <button type="submit">Atualizar</button>
    </form>
  </main>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { header } from '../../../config/index.js'
import render from './edit/render.vue'
export default {
  data () {
    return {
      wasLocked: false,
      ready: true
    }
  },
  computed: {
    ...mapGetters([
      'serviceSelected'
    ])
  },
  beforeMount () {
    this.wasLocked = this.serviceSelected.lock
    this.lock().then(() => {
      this.ready = true
    })
  },
  beforeDestroy () {
    this.unlock()
  },
  methods: {
    ...mapActions([
      'updateService',
      'postServiceSelected',
      'setServiceSelected'
    ]),
    lock () {
      return new Promise((resolve, reject) => {
        this.$http.post(this.$api({
          target: 'lock-service',
          conn: this.$store.getters.conn
        }), { id: this.serviceSelected.id }, {
          headers: header()
        }).then(response => {
          resolve(response)
        })
      })
    },
    unlock () {
      this.$http.post(this.$api({
        target: 'unlock-service',
        conn: this.$store.getters.conn
      }), { id: this.serviceSelected.id }, {
        headers: header()
      }).then(response => {
        console.log(response)
        this.ready = true
      })
    },
    update () {
      this.$Progress.start()
      this.postServiceSelected([this, this.serviceSelected, this.$store.getters.serviceUpdateJustification]).then(response => {
        this.$Progress.finish()
        // this.setServiceSelected(['serviceSelected', response.data])
        // this.updateService([response.data, this.selectedIndex])
        this.$toasted.success('Serviço atualizado com sucesso!', {
          theme: 'bubble',
          position: 'top-center',
          duration: 300,
          onComplete: () => {
            this.$emit('updated')
          }
        })
      })
    }
  },
  components: {
    render
  }
}
</script>
