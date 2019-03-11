<template>
  <b-modal :active.sync="open">
    <div id="createClient">
      <div class="content">
        <div class="client">
          <h3>Cliente</h3>
          <b-field label="Nome">
            <b-input v-model="client.name" v-validate="{ regex: /^[a-zA-Z]+$/ }" placeholder="Nome" name="name" required></b-input>
          </b-field>
          <span>{{ errors.first('name') }}</span>
          <b-field label="Telefone">
            <b-input v-model="client.phone" v-mask="'(##) # ####-####'" placeholder="Telefone" required></b-input>
          </b-field>
          <b-field label="Data de Nascimento">
            <b-input v-model="birthdate" v-validate="rules.birthdate" v-mask="'##/##/####'" placeholder="10/10/1994" name="birthdate" required></b-input>
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
            <b-input v-model="user.document" v-validate="rules.document" v-mask="['###.###.###-##', '##.###.###/####-##']" placeholder="cpf" name="document" required></b-input>
          </b-field>
          <div class="address">
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
          </div>
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
            <button v-if="birthdate" @click="createUser">Cadastrar</button>
            <!-- <button>Cancelar</button> -->
          </div>
        </div>
      </div>
    </div>
  </b-modal>
</template>
<script>
import { header } from '../../../config/index.js'
import { mapActions } from 'vuex'
export default {
  name: 'createClient',
  props: ['open'],
  data () {
    return {
      birthdate: undefined,
      user: {
        email: undefined,
        type_id: undefined,
        document: undefined,
        // talvez não pode
        birthdate: this.birthdate,
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
      rules: {
        cadastro: {
          regex: /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)(((1)(9)[0-9][0-9])|((2)[0][0-9][0-9]))$/ 
        },
        birthdate: {
          // date_between: "01/01/1900",
          regex: /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)(((1)(9)[0-9][0-9])|((2)[0][0-9][0-9]))$/
        },
        email: {
          email: true
        },
        document: {
          regex: /^(([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}))|([0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/
        },
        postal_code: {
          regex: /^[0-9]{2}\.?[0-9]{3}-[\d]{3}$/
        }
      }
    }
  },
  watch: {
    // validating date of birth
    birthdate (val) {
      if (val.length === 10) {
        var year = (new Date()).getFullYear()
        var birth = parseInt(val.substr(val.length - 4))
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
    createUser () {
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
            client: this.client
          }
          this.$http.post(this.$api({ target: 'clients' }), data, {
            headers: header()
          }).then(() => {
            this.getClients(this)
            this.$emit('update:open', false)
            this.$router.push({ name: 'clients' })
          })
        })
      })
    }
  }
}
</script>
