import { mapActions } from 'vuex'
import { header } from '../../../config/index.js'
import { VueEditor } from 'vue2-editor'
import _ from 'lodash'
import editGeneric from '../common/editGeneric.vue'
import moment from 'moment'
moment.locale('pt-BR')
export default {
  name: 'editClient',
  props: ['client', 'selectedIndex'],
  data () {
    return {
      wasLocked: false,
      ready: false,
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }]
      ]
    }
  },
  watch: {
  },
  beforeMount () {
    this.wasLocked = this.client.lock
    this.lock().then(() => {
      this.ready = true
    })
  },
  beforeDestroy () {
    this.unlock()
  },
  mounted () {
  },
  computed: {
    observations: {
      get () {
        return this.client.observations
      },
      set: _.debounce(function (newVal) {
        this.updateClientSelected(['observations', '', newVal])
      }, 400)
    },
    activity: {
      get () {
        return this.client.activity
      },
      set: _.debounce(function (newVal) {
        this.updateClientSelected(['activity', '', newVal])
      }, 400)
    }
  },
  methods: {
    ...mapActions([
      'postClientSelected',
      'updateClient',
      'updateClientAddress',
      'updateClientSelected'
    ]),
    lock () {
      return new Promise((resolve, reject) => {
        this.$http.post(this.$api({
          target: 'lock-client',
          conn: this.$store.getters.conn
        }), { id: this.client.id }, {
          headers: header()
        }).then(response => {
          resolve(response)
        })
      })
    },
    unlock () {
      this.$http.post(this.$api({
        target: 'unlock-client',
        conn: this.$store.getters.conn
      }), { id: this.client.id }, {
        headers: header()
      }).then(response => {
        console.log(response)
        this.ready = true
      })
    },
    parseDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    updateFunction () {
      this.$Progress.start() // no início das requisições
      this.postClientSelected([this, this.client]).then(response => {
        this.$Progress.finish() // no fim das requisições, logo após o then da ultima requisição
        // this.$Progress.fail() // no catch
        this.updateClient([response.data, this.selectedIndex])
        this.$toasted.success('Perfil do Cliente atualizado com sucesso!', {
          theme: 'bubble',
          position: 'top-center',
          duration: 300,
          onComplete: () => {
            this.$emit('updated')
          }
        })
      })
      // let data = {
      //   label: e[0],
      //   value: e[1],
      //   id: e[2] === 'client' ? this.client.id : (e[2] === 'user' ? this.client.user.id : this.client.user.address.id)
      // }
      // this.$http.put(this.$api({ target: `${e[2]}` }), data, {
      //   headers: header()
      // }).then(response => {
      //   let payload = [response.data, this.selectedIndex]
      //   e[2] === 'client' ? this.updateClient(payload) : this.updateClientAddress(payload)
      //   this.$emit('updated')
      //   this.$toasted.success('Perfil do cliente atualizado com sucesso!', {
      //     theme: 'bubble',
      //     position: 'top-center',
      //     duration: 2000
      //   })
      // })
    }
  },
  components: {
    VueEditor,
    editGeneric
  }
}
