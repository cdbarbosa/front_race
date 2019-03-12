<template>
  <div class="createRhForService">
    <b-modal :active.sync="open">
      <div id="rhForService">
        <div class="contentRh">
          <div class="infoRh">
            <b-field label="Nome">
              <b-input v-model="rh.name" placeholder="Nome" v-validate="{ regex: /^[a-zA-Z]+$/ }" name="name" required></b-input>
            </b-field>
            <b-field label="Telefone">
              <b-input v-model="rh.phone" v-mask="'(##) # ####-####'" placeholder="Telefone" required></b-input>
            </b-field>
            <b-field label="Data de aniversário">
              <b-input v-model="birthdate" v-validate="rules.birthdate" v-mask="'##/##/####'" placeholder="10/10/1994" name="birthdate" required></b-input>
            </b-field>
            <span>{{ errors.first('birthdate') }}</span>
            <div class="info-second">
              <b-field label="Email">
                <b-input v-model="user.email" v-validate="rules.email" type="email" placeholder="example@example.com" name="email" required></b-input>
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
              <b-input v-model="user.document" v-mask="['###.###.###-##', '##.###.###/####-##']" v-validate="rules.document" placeholder="cpf" name="document" required></b-input>
            </b-field>
            <div class="address">
              <h3>Endereço</h3>
              <div class="info-three">
                <b-field label="Rua">
                  <b-input v-model="address.address" placeholder="Rua" required></b-input>
                </b-field>
                <b-field label="Estado">
                  <b-input v-model="address.state" v-validate="{regex: /^[a-zA-Z]+$/}" placeholder="ES" name="state" required></b-input>
                </b-field>
                <span>{{ errors.first('state') }}</span>
              </div>
              <div class="info-fourth">
                <b-field label="CEP">
                  <b-input v-model="address.postal_code" v-validate="rules.postal_code" v-mask="'##.###-###'" placeholder="CEP" name="postal_code" required></b-input>
                </b-field>
                <b-field label="Bairro">
                  <b-input v-model="address.neighborhood" v-validate="{regex: /^[a-zA-Z]+$/}" placeholder="Bairro" name="bairro" required></b-input>
                </b-field>
                <b-field label="Cidade">
                  <b-input v-model="address.city" v-validate="{regex: /^[a-zA-Z]+$/}" placeholder="Cidade" name="cidade" required></b-input>
                </b-field>
              </div>
            </div>
          </div>
          <div class="competencias">
            <b-field label="Competências">
              <b-input v-model="rh.competencies" placeholder="Analise de dados" required></b-input>
            </b-field>
            <b-field label="Experiência">
              <b-input placeholder="Analise de dados" required></b-input>
            </b-field>
            <b-field label="Observações">
              <textarea name="" id="" cols="40" rows="4" required></textarea>
            </b-field>
            <div class="course">
              <b-field label="Bacharelado">
                <b-input placeholder="Matemática" required></b-input>
              </b-field>
              <b-field label="Título">
                <b-input placeholder="Doutorado" required></b-input>
              </b-field>
              <b-field label="Custo">
                <b-input v-model="rh.cost" v-money="money" placeholder="R$ 131,00" required></b-input>
              </b-field>
            </div>
            <b-field label="Atividade">
              <b-input placeholder="Produção de PANIC" required></b-input>
            </b-field>
            <div class="buttonCreate">
              <!-- <button class="is-primary" @click="open = false">Cancelar</button> -->
              <button class="is-primary" v-if="birthdate" @click="createRh">Cadastrar</button>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
import { header } from '../../../config/index.js'
import { mapActions } from 'vuex'
export default {
  name: 'create-rh',
  props: ['open'],
  data () {
    return {
      close: true,
      birthdate: undefined,
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
      },
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
      money: {
        decimal: '.',
        thousands: ',',
        prefix: 'R$ ',
        precision: 2
      }
    }
  },
  watch: {
    birthdate (val) {
      if (val.length === 10) {
        var year = (new Date()).getFullYear()
        var birth = parseInt(val.substr(val.length - 4))
        if (birth > year) {
          // exibir notificação de erro
          console.log('false')
          return false
        } else if ((year - birth) > 100) {
          console.log(false)
          // exibir notificação de erro
          return false
        } else {
          console.log(true)
          return true
        }
      }
    }
  },
  computed: {
    // closeModal () {
    //   if (this.close) {
    //     this.open = false
    //     return this.open
    //   } else {
    //     return this.open
    //   }
    // }
  },
  methods: {
    ...mapActions([
      'getRhs'
    ]),
    createRh () {
      this.rh.cost = parseFloat(this.rh.cost.split(' ')[1])
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
          }).then(response => {
            this.getRhs(this)
            this.$route.name === 'rh' ? this.$router.push({ name: 'rh' }) : this.$router.push({ name: 'vueDetails', params: { id: this.$route.params.id } })
            this.$emit('update:open', false)
          })
        })
      })
    }
  }
}
</script>
