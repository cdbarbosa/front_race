<template>
  <div id="rhC">
    <div class="content">
      <div class="infoRh">
        <b-field label="Nome">
          <b-input v-model="rh.name" placeholder="Nome"></b-input>
        </b-field>
        <b-field label="Telefone">
          <b-input v-model="rh.phone" placeholder="Telefone"></b-input>
        </b-field>
        <b-field label="Data de aniversário">
          <b-input v-model="user.birthdate" placeholder="10/10/1994"></b-input>
        </b-field>
        <div class="info-second">
          <b-field label="Email">
            <b-input v-model="user.email" placeholder="example@example.com"></b-input>
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
          <b-input v-model="user.document" placeholder="cpf"></b-input>
        </b-field>
        <div class="address">
          <h3>Endereço</h3>
          <div class="info-three">
            <b-field label="Rua">
              <b-input v-model="address.address" placeholder="Rua"></b-input>
            </b-field>
            <b-field label="Estado">
              <b-input v-model="address.state" placeholder="ES"></b-input>
            </b-field>
          </div>
          <div class="info-fourth">
            <b-field label="CEP">
              <b-input v-model="address.postal_code" placeholder="CEP"></b-input>
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
          <button class="is-primary">Cancelar</button>
          <button class="is-primary" @click="createRh">Cadastrar</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { header } from '../../../config/index.js'
export default {
  name: 'createRh',
  data () {
    return {
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
      }
    }
  },
  methods: {
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
            this.$router.push({ name: 'showRhs' })
          })
        })
      })
    }
  }
}
</script>
