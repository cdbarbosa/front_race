<template>
  <div class="create" id="createRh">
    <div class="content">
      <!-- <basic-rh :person="rh" :name="'Rh'"></basic-rh> -->
      <section class="rh">
        <h3>Rh</h3>
        <article>
          <b-field label="Nome">
            <b-input v-model="rh.name" placeholder="Nome" v-validate="'alpha'" name="name" required></b-input>
          </b-field>
          <b-field label="Telefone">
            <b-input v-model="rh.phone" v-mask="'(##) # ####-####'" placeholder="Telefone" required></b-input>
          </b-field>
          <b-field label="Data de aniversário">
            <b-input v-model="user.birthdate" v-validate="rules.birthdate" v-mask="'##/##/####'" placeholder="10/10/1994" name="birthdate" required></b-input>
          </b-field>
          <span>{{ errors.first('birthdate') }}</span>
          <div class="info-second">
            <b-field label="Email">
              <b-input v-model="user.email" v-validate="rules.email" type="email" placeholder="example@example.com" name="email" required></b-input>
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
        </article>
        <b-field label="CPF/CNPJ">
          <b-input v-model="user.document" v-mask="user.type_id === '1' ? '###.###.###-##' : '##.###.###/####-##'" v-validate="rules.document" placeholder="cpf" name="document" required></b-input>
        </b-field>
        <address class="address">
          <h3>Endereço</h3>
          <div class="info-three">
            <b-field label="Rua">
              <b-input v-model="address.address" placeholder="Rua" name="address" required></b-input>
              <textarea v-model="rh.observations" name="" id="" cols="40" rows="4" required></textarea>
            </b-field>
            <div class="course">
              <b-field label="Bacharelado">
                <b-input v-model="rh.academic.area" placeholder="Matemática" required></b-input>
              </b-field>
              <b-field label="Título">
                <b-input v-model="rh.academic.titulation" placeholder="Doutorado" required></b-input>
              </b-field>
              <b-field label="Custo">
                <b-input v-model="rh.cost" v-money="money" placeholder="R$ 131,00" required></b-input>
              </b-field>
            </div>
            <b-field label="Atividade">
              <b-input v-model="rh.activity" placeholder="Produção de PANIC" required></b-input>
            </b-field>
            <div class="buttonCreate">
              <!-- <button class="is-primary" @click="open = false">Cancelar</button> -->
              <button class="is-primary" @click="createRh">Cadastrar</button>
            </div>
          </div>
        </address>
      </section>
    </div>
  </div>
</template>
<script>
import { header } from '../../../config/index.js'
import { mapActions } from 'vuex'
import userCreate from '../../../mixins/userCreate'
export default {
  name: 'create-rh',
  props: ['open'],
  mixins: [userCreate],
  data () {
    return {
      rh: {
        name: undefined,
        phone: undefined,
        cost: undefined,
        competencies: undefined,
        observatios: undefined,
        experience: undefined,
        academic: {
          area: undefined,
          titulation: undefined
        },
        activity: undefined
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
  },
  computed: {
  },
  methods: {
    ...mapActions([
      'getRhs'
    ]),
    createRh () {
      this.rh.cost = parseFloat(this.rh.cost.split(' ')[1])
      this.createUser().then(userId => {
        let data = {
          user_id: userId,
          rh: this.rh
        }
        this.$http.post(this.$api({ target: 'rhs' }), data, {
          headers: header()
        }).then(response => {
          this.getRhs(this)
          this.$route.name === 'rh' ? this.$router.push({ name: 'rh' }) : this.$router.push({ name: 'vueDetails', params: { id: this.$route.params.id } })
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  components: {
  }
}
</script>
