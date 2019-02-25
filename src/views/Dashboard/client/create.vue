<template>
  <div id="createClient">
    <div class="content">
      <div class="client">
        <h3>Cliente</h3>
        <b-field label="Nome">
          <b-input v-model="client.name" placeholder="Nome"></b-input>
        </b-field>
        <b-field label="Telefone">
          <b-input v-model="client.phone" placeholder="Telefone"></b-input>
        </b-field>
        <b-field label="Data de Nascimento">
          <b-input v-model="user.birthdate" placeholder="10/10/1994"></b-input>
        </b-field>
        <div class="info-second">
          <b-field label="Email">
            <b-input v-model="user.email" placeholder="example@example.com"></b-input>
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
</template>

<script>
import { header } from '../../../config/index.js'
export default {
  name: 'createClient',
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
      client: {
        name: undefined,
        phone: undefined
      }
    }
  },
  methods: {
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
