<template>
  <main class="clientScreen" id="updateClient">
    <div class="content">
      <edit-generic :person="client" :title="'Cliente'" @change="updateClientSelected($event)"></edit-generic>
      <div class="others">
        <b-field label="Observações">
          <vue-editor :editorToolbar="customToolbar" v-model="observations" placeholder="Analise de dados"></vue-editor>
        </b-field>
        <b-field label="Atividade">
          <b-input v-model="activity" placeholder="Produçaõ de PANIC"></b-input>
        </b-field>
      </div>
      <button @click="updateFunction">Atualizar</button>
    </div>
  </main>
</template>
<script>
import { mapActions } from 'vuex'
import { VueEditor } from 'vue2-editor'
import _ from 'lodash'
import editGeneric from '../common/editGeneric.vue'
import moment from 'moment'
export default {
  name: 'editClient',
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
    observations: {
      get () {
        return this.client.observations
      },
      set: _.debounce(function (newVal) {
        this.updateClientSelected(['observations', '', newVal])
      }, 1000)
    },
    activity: {
      get () {
        return this.client.activity
      },
      set: _.debounce(function (newVal) {
        this.updateClientSelected(['activity', '', newVal])
      }, 1000)
    }
  },
  methods: {
    ...mapActions([
      'postClientSelected',
      'updateClient',
      'updateClientAddress',
      'updateClientSelected'
    ]),
    parseDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    updateFunction () {
      this.postClientSelected([this, this.client]).then(response => {
        this.updateClient([response.data, this.selectedIndex])
        setTimeout(() => {
          this.$toasted.success('Perfil do Cliente atualizado com sucesso!', {
            theme: 'bubble',
            position: 'top-center',
            duration: 2000,
            onComplete: () => {
              this.$emit('updated')
            }
          })
        }, 300)
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
</script>
