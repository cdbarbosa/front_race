<template>
  <main id="createClient">
    <form @submit.prevent="createClient" class="content __create">
      <!-- <basic-client :person="client" :name="'Cliente'"></basic-client> -->
      <section>
        <article>
          <b-field label="Nome">
            <b-input v-model="client.name" v-validate="'alpha_spaces'" placeholder="Nome" name="name" required></b-input>
          </b-field>
          <span>{{ errors.first('name') }}</span>
        </article>
        <article>
          <b-field label="Telefone">
            <b-input v-model="client.phone" v-mask="'(##) # ####-####'" placeholder="Telefone"></b-input>
          </b-field>
          <b-field label="Data de Nascimento">
<<<<<<< HEAD
            <b-datepicker v-model="user.birthdate" :date-formatter="(date) => date.toLocaleDateString('pt-BR')" placeholder="Data de nascimento"></b-datepicker>
=======
            <!-- <datepicker v-model="user.birthdate" :format="parseDate" name="birthdate"></datepicker> -->
            <b-datepicker  v-model="user.birthdate" :month-names="months" :day-names="days"  :date-parser="parseDate(user.birthdate)" v-validate="rules.birthdate" name="birthdate"></b-datepicker>
>>>>>>> ea4fd86507bd8229a64da60364bcd5da31b6f575
          </b-field>
          <!-- <span>{{ errors.first('birthdate') }}</span> -->
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
          <b-input v-if="user.type_id" v-model="user.document" v-validate="rules.document" v-mask="user.type_id === '2' ? '###.###.###-##' : '##.###.###/####-##'" placeholder="Documentos" name="document" required></b-input>
          <b-input v-else v-model="user.document" v-validate="rules.document" v-mask="user.type_id === '2' ? '###.###.###-##' : '##.###.###/####-##'" placeholder="Documentos" name="document" disabled></b-input>
        </b-field>
        <address class="address">
          <h3>Endereço</h3>
          <article class="info-three">
            <b-field label="Rua">
              <b-input v-model="address.address" placeholder="Rua" name="address" required></b-input>
            </b-field>
            <b-field label="Estado">
              <b-input v-model="address.state"  v-validate="'alpha'" laceholder="ES" name="state" required></b-input>
            </b-field>
          </article>
          <article class="info-fourth">
            <b-field label="CEP">
              <b-input v-model="address.postal_code" v-mask="'##.###-###'" v-validate="rules.postal_code" name="postal_code" placeholder="CEP" required></b-input>
            </b-field>
            <b-field label="Bairro">
              <b-input v-model="address.neighborhood" v-validate="'alpha'" placeholder="Bairro"  name="neighborhood" required></b-input>
            </b-field>
            <b-field label="Cidade">
              <b-input v-model="address.city" v-validate="'alpha'" placeholder="Cidade" required name="city"></b-input>
            </b-field>
          </article>
        </address>
      </section>
      <aside class="others">
        <b-field label="Observações">
          <vue-editor :editorToolbar="customToolbar" v-model="client.observations" placeholder="Analise de dados"></vue-editor>
        </b-field>
        <b-field label="Atividade">
          <vue-editor :editorToolbar="customToolbar" v-model="client.activity" placeholder="Produção de PANIC"></vue-editor>
          <!-- <b&#45;input v&#45;model="client.activity" placeholder=""></b&#45;input> -->
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
export default {
  name: 'createClient',
  mixins: [userCreate],
  data () {
    return {
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }]
      ],
      months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      days: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
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
          return true
        }
      }
    }
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
      this.createUser().then(userId => {
        let data = {
          user_id: userId,
          client: this.client
        }
        console.log(data)
        this.$http.post(this.$api({ target: 'clients' }), data, {
          headers: header()
        }).then(() => {
          this.getClients(this).then(clients => {
            this.setClients(clients)
            this.$emit('clientCreated')
          })
        }).catch(err => {
          this.$emit('creationFailed')
          console.log(err)
        })
      }).catch(err => {
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
