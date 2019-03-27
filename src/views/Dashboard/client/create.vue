<template>
  <main id="createClient">
    <div class="content">
      <!-- <basic-client :person="client" :name="'Cliente'"></basic-client> -->
      <section class="client">
        <article>
          <h3>Cliente</h3>
          <b-field label="Nome">
            <b-input v-model="client.name" v-validate="'alpha_spaces'" placeholder="Nome" name="name" required></b-input>
          </b-field>
          <span>{{ errors.first('name') }}</span>
          <b-field label="Telefone">
            <b-input v-model="client.phone" v-mask="'(##) # ####-####'" placeholder="Telefone" required></b-input>
          </b-field>
          <b-field label="Data de Nascimento">
            <b-input v-model="user.birthdate" v-validate="rules.birthdate" v-mask="'##/##/####'" placeholder="10/10/1994" name="birthdate" required></b-input>
          </b-field>
          <span>{{ errors.first('birthdate') }}</span>
        </article>
        <article class="info-second">
          <b-field label="Email">
            <b-input v-model="user.email" type="email"  v-validate="rules.email" placeholder="exemplo@exemplo.com" name="Email" required></b-input>
          </b-field>
          <div class="block">
            <b-radio v-model="user.type_id" native-value="1">
              Juridico
            </b-radio>
            <b-radio v-model="user.type_id" native-value="2">
              Fisico
            </b-radio>
          </div>
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
        <h3>Outros</h3>
        <b-field label="Observações">
          <vue-editor :editorToolbar="customToolbar" v-model="client.observations" placeholder="Analise de dados"></vue-editor>
        </b-field>
        <b-field label="Atividade">
          <b-input v-model="client.activity" placeholder="Produçaõ de PANIC" required></b-input>
        </b-field>
        <div class="buttonClass">
          <button @click="createClient">Cadastrar</button>
        </div>
      </aside>

    </div>
  </main>
</template>
<script>
import { mapActions } from 'vuex'
import userCreate from '../../../mixins/userCreate'
import { header } from '../../../config/index.js'
import { VueEditor } from 'vue2-editor'
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
        name: undefined,
        phone: undefined,
        activity: undefined,
        observations: undefined
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
      'getClients'
    ]),
    createClient () {
      this.createUser().then(userId => {
        let data = {
          user_id: userId,
          client: this.client
        }
        this.$http.post(this.$api({ target: 'clients' }), data, {
          headers: header()
        }).then(() => {
          this.getClients(this)
          this.$emit('clientCreated')
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
