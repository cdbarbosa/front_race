<template>
  <main id="clients" v-if="clients.length">
    <div id="info">
      <div class="information">
        <div class="client">
          <h3>Cliente</h3>
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
              <b-input :value="parseDate(selected.create_at)" v-mask="'##/##/####'" disabled></b-input>
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
              <b-radio v-model="selected.user.type.name" native-value="legal">
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
        <div class="others">
          <h3>Outros</h3>
          <b-field label="Observações">
            <textarea name="" id="" cols="30" rows="11" style="width: 100%"></textarea>
          </b-field>
          <b-field label="Atividade">
            <b-input placeholder="Produçaõ de PANIC"></b-input>
          </b-field>
        </div>
      </div>
      <div class="tableClients">
        <div class="headerTable">
          <h4>Clientes</h4>
          <button class="buttons is-primary" @click="isModalActive = true">Cadastrar novo cliente</button>
          <b-input placeholder="Procurar..."></b-input>
        </div>
         <b-table :data="clients" :selected.sync="selected" :paginated="true" :per-page="5" focusable>
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
      <div id="createClient">
        <div class="content">
          <div class="client">
            <h3>Cliente</h3>
            <b-field label="Nome">
              <b-input v-model="client.name" placeholder="Nome"></b-input>
            </b-field>
            <b-field label="Telefone">
              <b-input v-model="client.phone" v-mask="'(##) # ####-####'" placeholder="Telefone"></b-input>
            </b-field>
            <b-field label="Data de Nascimento">
              <b-input v-model="user.birthdate" v-mask="'##/##/####'" placeholder="10/10/1994"></b-input>
            </b-field>
            <div class="info-second">
              <b-field label="Email">
                <b-input v-model="user.email" type="email" placeholder="example@example.com"></b-input>
              </b-field>
              <div class="block">
                <b-radio v-model="user.type_id" native-value="1">
                  Fisico
                </b-radio>
                <b-radio v-model="user.type_id" native-value="2">
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
                  <b-input v-model="address.state" v-mask="'##'" laceholder="ES"></b-input>
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
          <div class="others">
            <h3>Outros</h3>
            <b-field label="Observações">
              <textarea name="" id="" cols="30" rows="11" style="width: 100%"></textarea>
            </b-field>
            <b-field label="Atividade">
              <b-input placeholder="Produçaõ de PANIC"></b-input>
            </b-field>
            <div class="buttonClass">
              <button @click="createUser">Cadastrar</button>
              <button @click="$router.push({ name: 'clients' })">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { header } from '../../config/index.js'
import moment from 'moment'
export default {
  name: 'clients',
  data () {
    return {
      isModalActive: false,
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
      client: {
        name: undefined,
        phone: undefined
      },
      userSelected: undefined
    }
  },
  computed: {
    ...mapGetters([
      'clients'
    ]),
    selected: {
      get () {
        return this.userSelected ? this.userSelected : this.clients[0]
      },
      set (newValue) {
        console.log(newValue)
      }
    }
  },
  beforeMount () {
    this.getClients(this)
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'getClients'
    ]),
    parseDate (date) {
      return moment().format('DD/MM/YYYY')
    },
    createUser () {
      let data = {
        user: this.user
      }
      this.$http.post(this.$api({ target: 'users' }), data, {
        headers: header()
      }).then(response => {
        console.log(response.data.data.id)
        let datas = {
          user_id: response.data.id,
          address: this.address
        }
        this.$http.post(this.$api({ target: 'addresses' }), datas, {
          headers: header()
        }).then(() => {
          let data = {
            user_id: datas.user_id,
            client: this.client
          }
          this.$http.post(this.$api({ target: 'clients' }), data, {
            headers: header()
          }).then(() => {
            this.$router.push({ name: 'show' })
          })
        })
      })
    }
  }
}
</script>
