<template>
  <div class="clientScreen" id="updateClient">
    <div class="content">
     <div class="client">
        <h3>
          Cliente
        </h3>
        <div class="info-first">
          <b-field label="Nome">
            <b-input v-model="name" placeholder="Nome"></b-input>
          </b-field>
          <b-field label="ID">
            <b-input v-model="client.id" placeholder="23" disabled></b-input>
          </b-field>
        </div>
        <div class="info-second">
          <b-field label="Cadastro">
            <b-input :value="parseDate(client.created_at)" v-mask="'##/##/####'" disabled></b-input>
          </b-field>
          <b-field label="Telefone">
            <b-input v-model="phone" v-mask="'(##) # ####-####'" placeholder="Telefone"></b-input>
          </b-field>
        </div>
        <div class="info-second">
          <b-field label="Email">
            <b-input v-model="client.user.email" type="email" placeholder="example@example.com" disabled></b-input>
          </b-field>
          <div class="block">
            <b-radio v-model="client.user.type.id" native-value="1" disabled>
              Juridico
            </b-radio>
            <b-radio v-model="client.user.type.id" native-value="2" disabled>
              Fisico
            </b-radio>
          </div>
        </div>
        <b-field label="CPF/CNPJ">
          <b-input v-model="client.user.document" v-mask="['###.###.###-##', '##.###.###/####-##']" placeholder="cpf" disabled></b-input>
        </b-field>
        <div class="address">
          <h3>Endereço</h3>
          <div class="info-three">
            <b-field label="Rua">
              <b-input v-model="address" placeholder="Rua"></b-input>
            </b-field>
            <b-field label="Estado">
              <b-input v-model="state" placeholder="ES"></b-input>
            </b-field>
          </div>
          <div class="info-fourth">
            <b-field label="CEP">
              <b-input v-model="postal_code" v-mask="'##.###-###'" placeholder="CEP"></b-input>
            </b-field>
            <b-field label="Bairro">
              <b-input v-model="neighborhood" placeholder="Bairro"></b-input>
            </b-field>
            <b-field label="Cidade">
              <b-input v-model="city" placeholder="Cidade"></b-input>
            </b-field>
          </div>
        </div>
      </div>
      <div class="others">
        <h3>Outros</h3>
        <b-field label="Observações 1">
          <!-- <textarea v&#45;model="client.observations" name="" id="" cols="30" rows="11" style="width: 100%"></textarea> -->
          <vue-editor :editorToolbar="customToolbar" v-model="observations" placeholder="Analise de dados"></vue-editor>
        </b-field>
        <b-field label="Atividade">
          <b-input v-model="client.activity" placeholder="Produçaõ de PANIC"></b-input>
        </b-field>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { VueEditor } from 'vue2-editor'
import { header } from '../../../config/index.js'
import _ from 'lodash'
import moment from 'moment'
// import userCreate from '../../../mixins/userCreate'
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
    }
  },
  components: {
    VueEditor
  }
}
</script>
