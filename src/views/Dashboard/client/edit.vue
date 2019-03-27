<template>
  <main class="clientScreen" id="updateClient">
    <div class="content">
      <edit-client :person="client" :title="'Cliente'" @change="updateFunction($event)"></edit-client>
      <div class="others">
        <b-field label="Observações">
          <!-- <textarea v&#45;model="client.observations" name="" id="" cols="30" rows="11" style="width: 100%"></textarea> -->
          <vue-editor :editorToolbar="customToolbar" v-model="observations" placeholder="Analise de dados"></vue-editor>
        </b-field>
        <b-field label="Atividade">
          <b-input v-model="client.activity" placeholder="Produçaõ de PANIC"></b-input>
        </b-field>
      </div>
    </div>
  </main>
</template>
<script>
import { mapActions } from 'vuex'
import { VueEditor } from 'vue2-editor'
import { header } from '../../../config/index.js'
import _ from 'lodash'
import editClient from '../common/editGeneric.vue'
import moment from 'moment'
export default {
  name: 'updateClient',
  props: ['client', 'selectedIndex'],
  data () {
    return {
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }]
      ]
    }
  },
  watch: {
  },
  mounted () {
  },
  computed: {
    name: {
      get () {
        return this.client.name
      },
      set: _.debounce(function (newVal, oldVal) {
        let data = {
          label: 'name',
          value: newVal,
          id: this.client.id
        }
        this.$http.put(this.$api({ target: 'client' }), data, {
          headers: header()
        }).then(response => {
          let payload = [response.data, this.selectedIndex]
          this.updateClient(payload)
          this.$emit('updated')
        })
      }, 400)
    },
    phone: {
      get () {
        return this.client.phone
      },
      set: _.debounce(function (newVal, oldVal) {
        let data = {
          label: 'phone',
          value: newVal,
          id: this.client.id
        }
        this.$http.put(this.$api({ target: 'client' }), data, {
          headers: header()
        }).then(response => {
          let payload = [response.data, this.selectedIndex]
          this.updateClient(payload)
          this.$emit('updated')
        })
      }, 400)
    },
    address: {
      get () {
        return this.client.user.address.address
      },
      set: _.debounce(function (newVal, oldVal) {
        let data = {
          label: 'address',
          value: newVal,
          id: this.client.user.address.id
        }
        this.$http.put(this.$api({ target: 'address' }), data, {
          headers: header()
        }).then(response => {
          let payload = [response.data, this.selectedIndex]
          this.updateClientAddress(payload)
          this.$emit('updated')
        })
      })
    },
    state: {
      get () {
        return this.client.user.address.state
      },
      set: _.debounce(function (newVal, oldVal) {
        let data = {
          label: 'state',
          value: newVal,
          id: this.client.user.address.id
        }
        this.$http.put(this.$api({ target: 'address' }), data, {
          headers: header()
        }).then(response => {
          let payload = [response.data, this.selectedIndex]
          this.updateClientAddress(payload)
          this.$emit('updated')
        })
      })
    },
    postal_code: {
      get () {
        return this.client.user.address.postal_code
      },
      set: _.debounce(function (newVal, oldVal) {
        let data = {
          label: 'postal_code',
          value: newVal,
          id: this.client.user.address.id
        }
        this.$http.put(this.$api({ target: 'address' }), data, {
          headers: header()
        }).then(response => {
          let payload = [response.data, this.selectedIndex]
          this.updateClientAddress(payload)
          this.$emit('updated')
        })
      })
    },
    neighborhood: {
      get () {
        return this.client.user.address.neighborhood
      },
      set: _.debounce(function (newVal, oldVal) {
        let data = {
          label: 'neighborhood',
          value: newVal,
          id: this.client.user.address.id
        }
        this.$http.put(this.$api({ target: 'address' }), data, {
          headers: header()
        }).then(response => {
          let payload = [response.data, this.selectedIndex]
          this.updateClientAddress(payload)
          this.$emit('updated')
        })
      })
    },
    city: {
      get () {
        return this.client.user.address.city
      },
      set: _.debounce(function (newVal, oldVal) {
        let data = {
          label: 'city',
          value: newVal,
          id: this.client.user.address.id
        }
        this.$http.put(this.$api({ target: 'address' }), data, {
          headers: header()
        }).then(response => {
          let payload = [response.data, this.selectedIndex]
          this.updateClientAddress(payload)
          this.$emit('updated')
        })
      })
    },
    observations: {
      get () {
        return this.client.observations
      },
      set: _.debounce(function (newVal, oldVal) {
        let data = {
          label: 'observations',
          value: newVal,
          id: this.client.id
        }
        this.$http.put(this.$api({ target: 'client' }), data, {
          headers: header()
        }).then(response => {
          let payload = [response.data, this.selectedIndex]
          this.updateClient(payload)
          this.$emit('updated')
        })
      }, 400)
    }
  },
  methods: {
    ...mapActions([
      'updateClient',
      'updateClientAddress'
    ]),
    parseDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    updateFunction (e) {
      console.log(e)
      let data = {
        label: e[0],
        value: e[1],
        id: e[2] === 'client' ? this.client.id : this.client.user.address.id
      }
      this.$http.put(this.$api({ target: `${e[2]}` }), data, {
        headers: header()
      }).then(response => {
        let payload = [response.data, this.selectedIndex]
        e[2] === 'client' ? this.updateClient(payload) : this.updateClientAddress(payload)
        this.$emit('updated')
      })
    }
  },
  components: {
    VueEditor,
    editClient
  }
}
</script>
