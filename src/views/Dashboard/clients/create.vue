<template>
  <main id="createClient">
    <form @submit.prevent="createClient" class="content __create">
      <section>
        <article>
          <b-field label="Nome">
            <b-input v-model="client.name" v-validate="'alpha_spaces'" placeholder="Nome" name="name" required></b-input>
          </b-field>
          <span>{{ errors.first('name') }}</span>
        </article>
        <article class="info-second">
          <b-field label="Email">
            <b-input v-model="user.email" type="email"  v-validate="rules.email" placeholder="exemplo@exemplo.com" name="Email" required></b-input>
          </b-field>
          <b-field label="Tipo">
            <div class="block">
              <b-radio v-model="user.type_id" native-value="1">
                Juridico
              </b-radio>
              <b-radio v-model="user.type_id" native-value="2">
                Fisico
              </b-radio>
            </div>
          </b-field>
        </article>
        <b-field label="CPF/CNPJ">
          <b-input v-model="user.document" v-validate="rules.document" v-mask="user.type_id == 1 ? '##.###.###/####-##':'###.###.###-##' " placeholder="Documentos" name="document" required></b-input>
        </b-field>
        <article>
          <b-field label="Telefone">
            <b-input v-model="client.phone" v-mask="'(##) # ####-####'" placeholder="Telefone"></b-input>
          </b-field>
          <b-field label="Data (nascimento)">
            <b-datepicker v-model="user.birthdate" placeholder="Data de nascimento" :disabled="user.type_id == 1" :max-date="maxDate"></b-datepicker>
          </b-field>
          <!-- <span>{{ errors.first('birthdate') }}</span> -->
        </article>
        <address class="address">
          <hr>
          <article>
            <b-field label="País">
              <b-input pattern="[A-Za-z ]+" name="country" v-model="address.country" placeholder="País"></b-input>
            </b-field>
            <b-field label="Estado">
              <b-input maxlength="2" pattern="[A-Z]{2}" name="region" autocomplete="shipping region" v-model="address.state" placeholder="ES"></b-input>
            </b-field>
          </article>
          <article class="info-three">
            <b-field label="Logradouro">
              <b-input v-model="address.address" name="street-address" autocomplete="shipping street-address" placeholder="Logradouro"></b-input>
            </b-field>
            <b-field label="Complemento">
              <b-input v-model="address.complement" placeholder="Complemento"></b-input>
            </b-field>
          </article>
          <article class="info-fourth">
            <b-field label="CEP">
              <b-input v-model="address.postal_code" name="postal-code" autocomplete="shipping postal-code" v-mask="'##.###-###'" placeholder="CEP"></b-input>
            </b-field>
            <b-field label="Bairro">
              <b-input v-model="address.neighborhood" name="sublocality_level_1" autocomplete="sublocality_level_1" placeholder="Bairro"></b-input>
            </b-field>
            <b-field label="Cidade">
              <b-input v-model="address.city" name="locality" autocomplete="shipping locality" placeholder="Cidade"></b-input>
            </b-field>
          </article>
        </address>
      </section>
      <aside class="others">
        <b-field label="Observações">
          <vue-editor :editorToolbar="customToolbar" v-model="client.observations" placeholder="Anotações internas"></vue-editor>
        </b-field>
        <b-field label="Atividade">
          <vue-editor :editorToolbar="customToolbar" v-model="client.activity" placeholder="Pessoa Física: Pesquisadora da USP / Pessoa Jurídica: Empresa de Celulose"></vue-editor>
        </b-field>
        <div class="buttonClass">
          <button type="submit">Cadastrar</button>
        </div>
      </aside>
    </form>
  </main>
</template>
<script>
import { mapActions } from 'vuex'
import userCreate from '../../../mixins/userCreate'
import { header } from '../../../config/index.js'
import { VueEditor } from 'vue2-editor'
import moment from 'moment'
moment.locale('pt-BR')
export default {
  name: 'createClient',
  mixins: [userCreate],
  data () {
    return {
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }]
      ],
      client: {
        name: null,
        phone: null,
        activity: null,
        observations: null
      }
    }
  },
  computed: {
    birthdate: {
      get () {
        return this.user.birthdate
      },
      set (newVal) {
        console.log(newVal)
      }
    }
  },
  watch: {
    // validating date of birth
    birthdate (val) {
      if (val.length === 10) {
        let year = (new Date()).getFullYear()
        let birth = parseInt(val.substr(val.length - 4))
        if (birth > year) {
          // exibir notificação de erro
          return false
        } else if ((year - birth) > 100) {
          // exibir notificação de erro
          return false
        } else {
          return birth
        }
      }
    }
  },
  beforeMount () {
  },
  methods: {
    ...mapActions([
      'getClients',
      'setClients'
    ]),
    parseDate (date) {
      if (date) {
        return moment(date).format('DD/MM/YYYY')
      }
      return undefined
    },
    createClient () {
      this.$Progress.start()
      this.createUser().then(userId => {
        let data = {
          user_id: userId,
          client: this.client
        }
        this.$http.post(this.$api({
          target: 'clients',
          conn: this.$store.getters.conn
        }), data, {
          headers: header()
        }).then(() => {
          this.$Progress.finish()
          this.$emit('clientCreated')
        }).catch(err => {
          this.$Progress.fail()
          this.$emit('creationFailed')
          console.log(err)
        })
      }).catch(err => {
        this.$Progress.fail()
        this.$emit('creationFailed')
        console.log(err)
      })
    }
  },
  components: {
    VueEditor
  }
}
</script>
