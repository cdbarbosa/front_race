<template>
  <div id="vueDetails">
    <div class="details-information" v-if="serviceSelected !== undefined">
      <div class="description-service">
        <h2>Detalhes</h2>
        <div class="info-service">
          <b-field label="Serviço">
            <b-input v-model="serviceSelected.name"></b-input>
          </b-field>
          <b-field label="ID">
            <b-input v-model="serviceSelected.id"></b-input>
          </b-field>
        </div>
        <hr>
        <div class="infoRh">
          <b-field label="RH">
            <b-input v-model="rhsService[0].name" placeholder="Lorem ipsum dolor sit amet"></b-input>
          </b-field>
          <b-field label="ID">
            <b-input v-model="rhsService[0].id" placeholder="2"></b-input>
          </b-field>
        </div>
        <b-field label="Especificidade e Serviço">
          <textarea v-model="rhsService[0].observations" name="" id="" cols="55" rows="4"></textarea>
        </b-field>
        <div class="hours">
          <b-field label="Custo">
            <b-input v-model="rhsService[0].cost" placeholder="ORCA - Orçamento (em aberto)"></b-input>
          </b-field>
          <b-field label="Horas">
            <b-input placeholder="ORCA - Orçamento (em aberto)"></b-input>
          </b-field>
          <b-field label="Prazo">
            <b-input placeholder="ORCA - Orçamento (em aberto)"></b-input>
          </b-field>
        </div>
        <div class="cost">
          <div class="field">
            <b-checkbox>Estado</b-checkbox>
          </div>
          <button class="is-primary" @click="getRhService, isModalDesactive = true">Desassociar esse RH</button>
        </div>
      </div>
      <div class="description">
        <div class="serviceTable">
          <div class="headerTable">
            <h4>RHs responsáveis</h4>
            <button class="buttons is-primary" @click="getRhNotService">Adicionar novo RH ao serviço</button>
          </div>
          <b-table :data="rhsService" :paginated="true" :per-page="5" focusable style="padding-top: 1rem">
            <template slot-scope="props">
              <b-table-column field="name" label="ID" sortable>
                {{ props.row.id }}
              </b-table-column>
              <b-table-column field="name" label="NOME" sortable>
                {{ props.row.name }}
              </b-table-column>
              <b-table-column field="created_at" label="Custo">
                {{ props.row.cost }}
              </b-table-column>
              <b-table-column field="user.email" label="Horas">
                {{ parseDate(props.row.created_at) }}
              </b-table-column>
              <b-table-column field="phone" label="Prazo">
                {{ parseDate(props.row.created_at) }}
              </b-table-column>
            </template>
          </b-table>
        </div>
      </div>
    </div>
    <b-modal :active.sync="isModalActive">
      <div class="attachRh">
        <b-field label="Adicionar Rh ao serviço">
          <b-select v-model="rh_id" placeholder="Select a name">
            <option
              v-for="option in data"
              :value="option.id"
              :key="option.id">
              {{ option.name }}
            </option>
          </b-select>
        </b-field>
        <div class="buttonCreate">
          <button class="buttons is-primary" @click="attachRhService()">Adicionar</button>
          <button class="buttons is-primary" @click="isCreateModalActive = true, isModalActive = false">Criar um novo Rh</button>
        </div>
      </div>
    </b-modal>
    <div class="createRhForService">
      <b-modal :active.sync="isCreateModalActive">
        <div id="rhForService">
          <div class="contentRh">
            <div class="infoRh">
              <b-field label="Nome">
                <b-input v-model="rh.name" placeholder="Nome"></b-input>
              </b-field>
              <b-field label="Telefone">
                <b-input v-model="rh.phone" v-mask="'(##) # ####-####'" placeholder="Telefone"></b-input>
              </b-field>
              <b-field label="Data de aniversário">
                <b-input v-model="user.birthdate" v-validate="{regex: dataRegex.regex}" v-mask="'##/##/####'" placeholder="10/10/1994" name="birthdate"></b-input>
              </b-field>
              <span>{{ errors.first('birthdate') }}</span>
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
                    <b-input v-model="address.state" v-validate="{regex: estadoRegex.regex}" placeholder="ES" name="state"></b-input>
                  </b-field>
                  <span>{{ errors.first('state') }}</span>
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
                <button class="is-primary" @click="isCreateModalActive = false, isModalActive = true">Cancelar</button>
                <button class="is-primary" @click="createRh">Cadastrar</button>
              </div>
            </div>
          </div>
        </div>
      </b-modal>
    </div>
    <div class="detachRhFroService">
      <b-modal :active.sync="isModalDesactive">
        <div class="detachRh">
          <b-field label="Desassociar Rh">
            <b-select v-model="detachRh_id" placeholder="Select a name">
              <option v-for="option in rhsService" :value="option.id" :key="option.id">
                {{ option.name }}
              </option>
            </b-select>
          </b-field>
          <div class="buttonCreate">
            <button class="buttons is-primary" @click="ditachRh()">Disassociar</button>
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>
<script>
import { header } from '../../../config/index.js'
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
export default {
  name: 'vueDetails',
  data () {
    return {
      radio: '',
      data: [],
      rh_id: '',
      detachRh_id: '',
      isModalDesactive: false,
      isModalActive: false,
      isCreateModalActive: false,
      serviceSelected: undefined,
      rhsService: undefined,
      allRhs: undefined,
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
      },
      dataRegex: {
        regex: /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)(((1)(9)[0-9][0-9])|((2)[0][0-9][0-9]))$/
      },
      estadoRegex: {
        regex: /^([a-zA-Z][a-zA-Z])$/
      }
    }
  },
  computed: {
    ...mapGetters([
      'rhs'
    ]),
    selected: {
      get () {
        return this.allRhs ? this.allRhs : this.rhs[0]
      },
      set (newValue) {
        console.log(newValue)
      }
    }
  },
  beforeMount () {
    this.getRhs(this)
    this.$http.get(this.$api({ target: `service/${this.$route.params.id}` }), {
      headers: header()
    }).then(response => {
      this.serviceSelected = response.data
      this.rhsService = this.serviceSelected.rhs
    })
  },
  methods: {
    ...mapActions([
      'getRhs'
    ]),
    parseDate (date) {
      return moment().format('DD/MM/YYYY')
    },
    getRhService () {
      this.$http.get(this.$api({ target: `service/${this.$route.params.id}` }), {
        headers: header()
      }).then(response => {
        this.serviceSelected = response.data
        this.rhsService = this.serviceSelected.rhs
      })
    },
    getRhNotService () {
      let d = []
      let diferent = []
      let rh = []
      this.rhsService.forEach(function each (item, index, array) {
        rh.push(item.name)
      })
      this.rhs.forEach(function each (item, index, array) {
        d = diferent
        rh.includes(item.name) ? diferent = d : diferent.push(item)
      })
      this.data = diferent
      this.isModalActive = true
    },
    attachRhService () {
      let data = {
        rh_id: this.rh_id,
        service_id: this.serviceSelected.id
      }
      this.$http.post(this.$api({ target: 'rhservice' }), data, {
        headers: header()
      }).then(() => {
        this.getRhService()
        this.$router.push({ name: 'vueDetails', params: { id: this.serviceSelected.id } })
      })
      this.isModalActive = false
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
            this.getRhService()
            this.getRhs(this)
            this.getRhNotService()
            this.isCreateModalActive = false
          })
        })
      })
    },
    detachRh () {

    }
  }
}
</script>
