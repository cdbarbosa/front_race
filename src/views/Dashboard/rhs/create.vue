<template>
  <main id="createRh">
    <header class="createHeader">
      <h3>RH</h3>
      <h3>Competências</h3>
    </header>
    <form @submit.prevent="createRh" class="content __create">
      <section>
        <article>
          <b-field label="Nome">
            <b-input v-model="rh.name" placeholder="Nome" v-validate="'alpha'" name="name" required></b-input>
          </b-field>
        </article>
        <article>
          <b-field label="Telefone">
            <b-input v-model="rh.phone" v-mask="'(##) # ####-####'" placeholder="Telefone" required></b-input>
          </b-field>
          <b-field label="Data de aniversário">
            <b-input v-model="user.birthdate" v-validate="rules.birthdate" v-mask="'##/##/####'" placeholder="10/10/1994" name="birthdate" required></b-input>
          </b-field>
          <span>{{ errors.first('birthdate') }}</span>
        </article>
        <article>
          <b-field label="Email">
            <b-input v-model="user.email" v-validate="rules.email" type="email" placeholder="example@example.com" name="email" required></b-input>
          </b-field>
          <b-field label="Tipo">
            <div class="block">
              <b-radio v-model="user.type_id" native-value="1">
                Fisico
              </b-radio>
              <b-radio v-model="user.type_id" native-value="2">
                Juridico
              </b-radio>
            </div>
          </b-field>
        </article>
        <b-field label="CPF/CNPJ">
          <b-input v-model="user.document" v-mask="user.type_id === '1' ? '###.###.###-##' : '##.###.###/####-##'" v-validate="rules.document" placeholder="cpf" name="document" required></b-input>
        </b-field>
         <address class="address">
          <h3>Endereço</h3>
          <article class="info-three">
            <b-field label="Rua">
              <b-input v-model="address.address" placeholder="Rua"></b-input>
            </b-field>
            <b-field label="Estado">
              <b-input v-model="address.state" placeholder="ES"></b-input>
            </b-field>
          </article>
          <article class="info-fourth">
            <b-field label="CEP">
              <b-input v-model="address.postal_code" v-mask="'##.###-###'" placeholder="CEP"></b-input>
            </b-field>
            <b-field label="Bairro">
              <b-input v-model="address.neighborhood" placeholder="Bairro"></b-input>
            </b-field>
            <b-field label="Cidade">
              <b-input v-model="address.city" placeholder="Cidade"></b-input>
            </b-field>
          </article>
        </address>
        <article class="course">
          <b-field label="Bacharelado">
            <b-input v-model="rh.academic.area" placeholder="Matemática" required></b-input>
          </b-field>
          <b-field label="Título">
            <b-input v-model="rh.academic.titulation" placeholder="Doutorado" required></b-input>
          </b-field>
          <b-field label="Custo">
            <b-input v-model="rh.cost" v-money="money" placeholder="R$ 131,00" required></b-input>
          </b-field>
        </article>
      </section>
      <section>
        <b-field label="Experiência">
          <b-input v-model="rh.experience" placeholder="Analise de dados"></b-input>
        </b-field>
        <b-field label="Competências">
          <vue-editor :editorToolbar="customToolbar" v-model="rh.competencies" placeholder="Analise de dados"></vue-editor>
        </b-field>
        <b-field label="Observações">
          <vue-editor :editorToolbar="customToolbar" v-model="rh.observations"></vue-editor>
        </b-field>
        <div class="buttonClass">
          <button type="submit">Cadastrar</button>
        </div>
      </section>
    </form>
  </main>
</template>
<script>
import { header } from '../../../config/index.js'
import { mapActions } from 'vuex'
import userCreate from '../../../mixins/userCreate'
import { VueEditor } from 'vue2-editor'
export default {
  name: 'create-rh',
  props: ['open'],
  mixins: [userCreate],
  data () {
    return {
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }]
      ],
      rh: {
        name: null,
        phone: null,
        cost: null,
        competencies: null,
        observatios: null,
        experience: null,
        academic: {
          area: null,
          titulation: null
        },
        activity: null
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
      'getRhs',
      'setRhs'
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
          this.getRhs(this).then(rhs => {
            this.setRhs(rhs)
            this.$emit('rhCreated')
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
