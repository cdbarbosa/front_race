<template>
  <div id="rhs">
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
      <div class="serviceTable">
        <div class="headerTable">
          <h4>RH's</h4>
          <button class="buttons is-primary" @click="isModalActive = true">Cadastrar novo RH</button>
          <b-input placeholder="Procurar..."></b-input>
        </div>
         <b-table :data="rhs" :selected.sync="selected" :paginated="true" :per-page="5" focusable style="padding-top: 1rem">
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
      <div id="rhC">
        <div class="content">
          <div class="infoRh">
            <b-field label="Nome">
              <b-input v-model="rh.name" placeholder="Nome"></b-input>
            </b-field>
            <b-field label="Telefone">
              <b-input v-model="rh.phone" v-mask="'(##) # ####-####'" placeholder="Telefone"></b-input>
            </b-field>
            <b-field label="Data de aniversário">
              <b-input v-model="user.birthdate" v-mask="'##/##/####'" placeholder="10/10/1994"></b-input>
            </b-field>
            <div class="info-second">
              <b-field label="Email">
                <b-input v-model="user.email" type="email" placeholder="example@example.com"></b-input>
              </b-field>
              <div class="block">
                <b-radio v-model="user.type_id" native-value="Fisico">
                  Fisico
                </b-radio>
                <b-radio v-model="user.type_id" native-value="Juridico">
                  Juridico
                </b-radio>
              </div>
            </div>
            <b-field label="CPF/CNPJ">
              <b-input v-model="user.document" v-mask="'###.###.###-##'" placeholder="cpf"></b-input>
            </b-field>
            <div class="address">
              <h3>Endereço</h3>
              <div class="info-three">
                <b-field label="Rua">
                  <b-input v-model="address.address" placeholder="Rua"></b-input>
                </b-field>
                <b-field label="Estado">
                  <b-input v-model="address.state" v-mask="'##'" placeholder="ES"></b-input>
                </b-field>
              </div>
              <div class="info-fourth">
                <b-field label="CEP">
                  <b-input v-model="address.postal_code" v-mask="'##.###-###'" placeholder="CEP"></b-input>
                </b-field>
                <b-field label="Bairro">
                  <b-input v-model="address.neighborhood" placeholder="Bairro"></b-input>
                </b-field>
                <b-field label="Cidade">
                  <b-input v-model="address.city" placeholder="Cidade"></b-input>
                </b-field>
              </div>
            </div>
          </div>
          <div class="competencias">
            <b-field label="Competências">
              <b-input v-model="rh.competencies" placeholder="Analise de dados"></b-input>
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
                <b-input v-model="rh.cost" placeholder="R$ 131,00"></b-input>
              </b-field>
            </div>
            <b-field label="Atividade">
              <b-input placeholder="Produção de PANIC"></b-input>
            </b-field>
            <div class="buttonCreate">
              <button class="is-primary">Cancelar</button>
              <button class="is-primary" @click="createRh">Cadastrar</button>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
import { header } from '../../config/index.js'
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
export default {
  name: 'rhs',
  data () {
    return {
      isModalActive: false,
      rhSelected: undefined,
      user: {
        email: undefined,
        type_id: undefined,
        document: undefined,
        birthdate: undefined,
        role: {
          name: 'user',
          description: 'Usuário padrão'
        },
        password: 'sistema'
      },
      address: {
        country: undefined,
        state: undefined,
        city: undefined,
        neighborhood: undefined,
        address: undefined,
        postal_code: undefined
      },
      rh: {
        name: undefined,
        phone: undefined,
        cost: undefined,
        competencies: undefined
      }
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
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'getRhs'
    ]),
    parseDate (date) {
      return moment().format('DD/MM/YYYY')
    },
    createRh () {
      let data = {
        user: this.user
      }
      this.$http.post(this.$api({ target: 'users' }), data, {
        headers: header()
      }).then(response => {
        let datas = {
          user_id: response.data.id,
          address: this.address
        }
        this.$http.post(this.$api({ target: 'addresses' }), datas, {
          headers: header()
        }).then(() => {
          let data = {
            user_id: datas.user_id,
            rh: this.rh
          }
          this.$http.post(this.$api({ target: 'rhs' }), data, {
            headers: header()
          }).then(() => {
            this.$router.push({ name: 'showRhs' })
          })
        })
      })
    }
  }
}
</script>
