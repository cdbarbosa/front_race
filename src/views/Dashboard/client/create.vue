<template>
  <div id="createClient">
    <div class="content">
      <div class="client">
        <h3>Cliente</h3>
        <b-field label="Nome">
          <b-input v-model="client.name" v-validate="'alpha'" placeholder="Nome" name="name" required></b-input>
        </b-field>
        <span>{{ errors.first('name') }}</span>
        <b-field label="Telefone">
          <b-input v-model="client.phone" v-mask="'(##) # ####-####'" placeholder="Telefone" required></b-input>
        </b-field>
        <b-field label="Data de Nascimento">
          <b-input v-model="user.birthdate" v-validate="rules.birthdate" v-mask="'##/##/####'" placeholder="10/10/1994" name="birthdate" required></b-input>
        </b-field>
        <span>{{ errors.first('birthdate') }}</span>
        <div class="info-second">
          <b-field label="Email">
            <b-input v-model="user.email" type="email"  v-validate="rules.email" placeholder="example@example.com" name="email" required></b-input>
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
          <b-input v-model="user.document" v-validate="rules.document" v-mask="user.type_id === '1' ? '###.###.###-##' : '##.###.###/####-##'" placeholder="cpf" name="document" required></b-input>
        </b-field>
        <address class="address">
          <h3>Endereço</h3>
          <div class="info-three">
            <b-field label="Rua">
              <b-input v-model="address.address" placeholder="Rua" required></b-input>
            </b-field>
            <b-field label="Estado">
              <b-input v-model="address.state"  v-validate="{regex: /^[a-zA-Z]+$/}" laceholder="ES" name="state" required></b-input>
            </b-field>
          </div>
          <!-- <span>{{ errors.first('state') }}</span> -->
          <div class="info-fourth">
            <b-field label="CEP">
              <b-input v-model="address.postal_code" v-mask="'##.###-###'" v-validate="rules.postal_code" name="postal_code" placeholder="CEP" required></b-input>
            </b-field>
            <b-field label="Bairro">
              <b-input v-model="address.neighborhood" placeholder="Bairro" required></b-input>
            </b-field>
            <b-field label="Cidade">
              <b-input v-model="address.city" placeholder="Cidade" required></b-input>
            </b-field>
          </div>
        </address>
      </div>
      <div class="others">
        <h3>Outros</h3>
        <b-field label="Observações">
          <textarea name="" id="" cols="30" rows="11" required></textarea>
        </b-field>
        <b-field label="Atividade">
          <b-input placeholder="Produçaõ de PANIC" required></b-input>
        </b-field>
        <div class="buttonClass">
          <!-- Só cadastra quando a data de nascimento estiver correta -->
          <button @click="createClient">Cadastrar</button>
          <!-- <button>Cancelar</button> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import userCreate from '../../../mixins/userCreate'
import { header } from '../../../config/index.js'
export default {
  name: 'createClient',
  mixins: [userCreate],
  data () {
    return {
      client: {
        name: undefined,
        phone: undefined
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
  }
}
</script>
