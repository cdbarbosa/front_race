<template>
  <div id="rhs" v-if="rhs.length">
    <div class="content">
      <div class="infoRh">
        <div class="info-first">
          <b-field label="Nome">
            <b-input v-model="selected.name" placeholder="Nome"></b-input>
          </b-field>
          <b-field label="ID">
            <b-input v-model="selected.id" placeholder="23"></b-input>
          </b-field>
        </div>
        <div class="info-second">
          <b-field label="Cadastro">
            <b-input :value="parseDate(selected.created_at)" placeholder="Cadastro" disabled></b-input>
          </b-field>
          <b-field label="Telefone">
            <b-input v-model="selected.phone" v-mask="'(##) # ####-####'" placeholder="Telefone"></b-input>
          </b-field>
        </div>
        <div class="info-second">
          <b-field label="Email">
            <b-input v-model="selected.user.email" type="email" placeholder="example@example.com"></b-input>
          </b-field>
          <div class="block">
            <b-radio v-model="selected.user.type.name" native-value="Fisico">
              Fisico
            </b-radio>
            <b-radio v-model="selected.user.type.name" native-value="Juridico">
              Juridico
            </b-radio>
          </div>
        </div>
        <b-field label="CPF/CNPJ">
          <b-input v-model="selected.user.document" v-mask="'###.###.###-##'" placeholder="cpf"></b-input>
        </b-field>
        <div class="address">
          <h3>Endereço</h3>
          <div class="info-three">
            <b-field label="Rua">
              <b-input v-model="selected.user.address.address" placeholder="Rua"></b-input>
            </b-field>
            <b-field label="Estado">
              <b-input v-model="selected.user.address.state" v-mask="'##'" placeholder="ES"></b-input>
            </b-field>
          </div>
          <div class="info-fourth">
            <b-field label="CEP">
              <b-input v-model="selected.user.address.postal_code" v-mask="'##.###-###'" placeholder="CEP"></b-input>
            </b-field>
            <b-field label="Bairro">
              <b-input v-model="selected.user.address.neighborhood" placeholder="Bairro"></b-input>
            </b-field>
            <b-field label="Cidade">
              <b-input v-model="selected.user.address.city" placeholder="Cidade"></b-input>
            </b-field>
          </div>
        </div>
      </div>
      <div class="competencias">
        <b-field label="Competências">
          <b-input v-model="selected.competencies" placeholder="Analise de dados"></b-input>
        </b-field>
        <b-field label="Experiência">
          <b-input placeholder="Analise de dados"></b-input>
        </b-field>
        <b-field label="Observações">
          <textarea name="" id="" cols="40" rows="4"></textarea>
        </b-field>
        <div class="course">
          <b-field label="Bacharelado">
            <b-input placeholder="Matemática"></b-input>
          </b-field>
          <b-field label="Título">
            <b-input placeholder="Doutorado"></b-input>
          </b-field>
          <b-field label="Custo">
            <b-input v-model="selected.cost" placeholder="R$ 131,00"></b-input>
          </b-field>
        </div>
        <b-field label="Atividade">
          <b-input placeholder="Produção de PANIC"></b-input>
        </b-field>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
export default {
  name: 'rhs',
  data () {
    return {
      radio: '',
      rhSelected: undefined
    }
  },
  computed: {
    ...mapGetters([
      'rhs'
    ]),
    selected: {
      get () {
        return this.rhSelected ? this.rhSelected : this.rhs[0]
      },
      set (newValue) {
        console.log(newValue)
      }
    }
  },
  beforeMount () {
    this.getRhs(this)
    console.log(this.selected)
  },
  methods: {
    ...mapActions([
      'getRhs'
    ]),
    parseDate (date) {
      return moment().format('DD/MM/YYYY')
    }
  }
}
</script>
