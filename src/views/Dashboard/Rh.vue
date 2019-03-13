<template>
  <div id="rhs" v-if="selected !== undefined">
    <h2>RH's</h2>
    <div class="info">
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
              <b-radio v-model="selected.user.type" native-value="Fisico">
                Fisico
              </b-radio>
              <b-radio v-model="selected.user.type" native-value="Juridico">
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
                <b-input v-model="selected.user.address.state" placeholder="ES"></b-input>
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
      <div class="serviceTable">
        <div class="headerTable">
          <h4>RH's</h4>
          <button class="buttons is-primary" @click="isModalActive = true">Cadastrar novo RH</button>
          <b-input placeholder="Procurar..."></b-input>
        </div>
         <b-table :data="rhs" @select="$router.push({ name: 'rh', params: { rh_id: $event.id } })" :selected.sync="selected" :paginated="true" :per-page="5" focusable style="padding-top: 1rem">
          <template slot-scope="props">
            <b-table-column field="name" label="NOME" sortable>
              {{ props.row.name }}
            </b-table-column>
            <b-table-column field="created_at" label="CADASTRO">
              {{ parseDate(props.row.created_at) }}
            </b-table-column>
            <b-table-column field="user.email" label="EMAIL">
              {{ props.row.user.email }}
            </b-table-column>
            <b-table-column field="phone" label="TELEFONE">
              {{ props.row.phone }}
            </b-table-column>
          </template>
        </b-table>
      </div>
    </div>
    <b-modal :active.sync="isModalActive">
      <component :is="parseModal()" @rhCreated="rhCreated = true" @creationFailed="rhCreated = false"></component>
    </b-modal>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import createRh from './rh/create.vue'
import success from './common/create-messages/success'
import error from './common/create-messages/error'
import moment from 'moment'
export default {
  name: 'rhs',
  data () {
    return {
      rhCreated: undefined,
      isModalActive: false,
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
        this.rhSelected = newValue
      }
    }
  },
  beforeRouterEnter (to, from, next) {
    next($this => {
      if ($this.rhSelected) next({ name: 'rh', params: { rh_id: $this.rhSelected.id } })
    })
  },
  beforeMount () {
    this.getRhs(this)
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'getRhs'
    ]),
    parseDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    parseModal () {
      if (this.rhCreated === undefined) {
        return 'createRh'
      } else if (this.rhCreated === true) {
        return 'success'
      }
      return 'error'
    }
  },
  components: {
    createRh,
    success,
    error
  }
}
</script>
