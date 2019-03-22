<template>
  <div class="rhScreen" id="updateRh">
     <div class="content">
        <div class="rh">
          <h3>RH's</h3>
          <div class="info-first">
            <b-field label="Nome">
              <b-input v-model="name" placeholder="Nome"></b-input>
            </b-field>
            <b-field label="ID">
              <b-input v-model="rh.id" placeholder="23" disabled></b-input>
            </b-field>
          </div>
          <div class="info-second">
            <b-field label="Cadastro">
              <b-input :value="parseDate(rh.created_at)" placeholder="Cadastro" disabled></b-input>
            </b-field>
            <b-field label="Telefone">
              <b-input v-model="phone" v-mask="'(##) # ####-####'" placeholder="Telefone"></b-input>
            </b-field>
          </div>
          <div class="info-second">
            <b-field label="Email">
              <b-input v-model="rh.user.email" type="email" placeholder="example@example.com" disabled></b-input>
            </b-field>
            <div class="block">
              <b-radio v-model="rh.user.type.id" native-value="1" disabled>
                Juridico
              </b-radio>
              <b-radio v-model="rh.user.type.id" native-value="2" disabled>
                Fisico
              </b-radio>
            </div>
          </div>
          <b-field label="CPF/CNPJ">
            <b-input v-model="rh.user.document" v-mask="'###.###.###-##'" placeholder="cpf" disabled></b-input>
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
        <div class="competencias">
          <b-field label="Competências">
            <b-input v-model="competencies" placeholder="Analise de dados"></b-input>
          </b-field>
          <b-field label="Experiência">
            <b-input v-model="rh.experience" placeholder="Analise de dados"></b-input>
          </b-field>
          <b-field label="Observações">
            <textarea v-model="rh.observations" name="" id="" cols="40" rows="4"></textarea>
          </b-field>
          <div class="course">
            <b-field label="Bacharelado">
              <b-input v-model="bacharel" placeholder="Matemática"></b-input>
            </b-field>
            <b-field label="Título">
              <b-input v-model="titulo" placeholder="Doutorado"></b-input>
            </b-field>
            <b-field label="Custo">
              <b-input v-model="cost" placeholder="R$ 131,00"></b-input>
            </b-field>
          </div>
          <b-field label="Atividade">
            <b-input v-model="rh.activity" placeholder="Produção de PANIC"></b-input>
          </b-field>
        </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { header } from '../../../config/index.js'
import _ from 'lodash'
import moment from 'moment'
export default {
  name: 'updateRh',
  props: ['rh', 'selectedIndex'],
  data () {
    return {
    }
  },
  watch: {
  },
  mounted () {
  },
  computed: {
    name: {
      get () {
        return this.rh.name
      },
      set: _.debounce(function (newVal, oldVal) {
        let data = {
          label: 'name',
          value: newVal,
          id: this.rh.id
        }
        this.$http.put(this.$api({ target: 'rh' }), data, {
          headers: header()
        }).then(response => {
          let payload = [response.data, this.selectedIndex]
          this.updaterh(payload)
          this.$emit('updated')
        })
      }, 400)
    },
    phone: {
      get () {
        return this.rh.phone
      },
      set: _.debounce(function (newVal, oldVal) {
        let data = {
          label: 'phone',
          value: newVal,
          id: this.rh.id
        }
        this.$http.put(this.$api({ target: 'rh' }), data, {
          headers: header()
        }).then(response => {
          let payload = [response.data, this.selectedIndex]
          this.updaterh(payload)
          this.$emit('updated')
        })
      }, 400)
    },
    bacharel: {
      get () {
        return (this.rh.academics === undefined ? undefined : (this.rh.academics.length === 0 ? undefined : this.rh.academics[0].description))
      },
      set: _.debounce(function (newVal, oldVal) {
        //
      })
    },
    titulo: {
      get () {
        return (this.rh.academics === undefined ? undefined : (this.rh.academics.length === 0 ? undefined : this.rh.academics[1].description))
      },
      set: _.debounce(function (newVal, oldVal) {
        //
      })
    },
    email: {
      get () {
        return this.rh.user.email
      },
      set: _.debounce(function (newVal, oldVal) {
      }, 400)
    },
    address: {
      get () {
        return this.rh.user.address.address
      },
      set: _.debounce(function (newVal, oldVal) {
        // let data = {
        //   label: 'address',
        //   value: newVal,
        //   id: this.rh.user.id
        // }
      })
    },
    state: {
      get () {
        return this.rh.user.address.state
      },
      set: _.debounce(function (newVal, oldVal) {
        // let data = {
        //   label: 'state',
        //   value: newVal,
        //   id: this.selected.user.id
        // }
      })
    },
    postal_code: {
      get () {
        return this.rh.user.address.postal_code
      },
      set: _.debounce(function (newVal, oldVal) {
        // let data = {
        //   label: 'postal_code',
        //   value: newVal,
        //   id: this.selected.user.id
        // }
      })
    },
    neighborhood: {
      get () {
        return this.rh.user.address.neighborhood
      },
      set: _.debounce(function (newVal, oldVal) {
        // let data = {
        //   label: 'neighborhood',
        //   value: newVal,
        //   id: this.selected.user.id
        // }
      })
    },
    city: {
      get () {
        return this.rh.user.address.city
      },
      set: _.debounce(function (newVal, oldVal) {
        // let data = {
        //   label: 'city',
        //   value: newVal,
        //   id: this.selected.user.id
        // }
      })
    }
  },
  methods: {
    ...mapActions([
      'updateRh'
    ]),
    parseDate (date) {
      return moment(date).format('DD/MM/YYYY')
    }
  }
}
</script>
