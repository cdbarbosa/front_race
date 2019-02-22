<template>
  <main v-if="clients.length" id="clients" >
    <div class="information">
      <div class="client">
        <h3>Cliente</h3>
        <div class="info-first">
          <b-field label="Nome">
            <b-input v-model="selected.name" placeholder="Nome"></b-input>
          </b-field>
          <b-field label="ID">
            <b-input v-model="selected.id" placeholder="23"></b-input>
          </b-field>
        </div>
        <div class="info-second">
          <b-field label="Cadastro">
            <b-input :value="parseDate(selected.created_at)" disabled></b-input>
          </b-field>
          <b-field label="Telefone">
            <b-input v-model="selected.phone" placeholder="Telefone"></b-input>
          </b-field>
        </div>
        <div class="info-second">
          <b-field label="Email">
            <b-input v-model="selected.user.email" placeholder="example@example.com"></b-input>
          </b-field>
          <div class="block">
            <b-radio v-model="selected.user.type.name" native-value="Fisico">
              Fisico
            </b-radio>
            <b-radio v-model="selected.user.type.name" native-value="legal">
              Juridico
            </b-radio>
          </div>
        </div>
        <b-field label="CPF/CNPJ">
          <b-input v-model="selected.user.document" placeholder="cpf"></b-input>
        </b-field>
        <div class="address">
          <h3>Endereço</h3>
          <div class="info-three">
            <b-field label="Rua">
              <b-input v-model="selected.user.address.address" placeholder="Rua"></b-input>
            </b-field>
            <b-field label="Estado">
              <b-input v-model="selected.user.address.state" placeholder="ES"></b-input>
            </b-field>
          </div>
          <div class="info-fourth">
            <b-field label="CEP">
              <b-input v-model="selected.user.address.postal_code" placeholder="CEP"></b-input>
            </b-field>
            <b-field label="Bairro">
              <b-input v-model="selected.user.address.neighborhood" placeholder="Bairro"></b-input>
            </b-field>
            <b-field label="Cidade">
              <b-input v-model="selected.user.address.city" placeholder="Cidade"></b-input>
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
        <button class="buttons is-primary">Cadastrar novo serviço</button>
      </div>
    </div>
    <div class="tableClients">
      <div class="headerTable">
        <h4>Clientes</h4>
        <button class="buttons is-primary">Cadastrar novo cliente</button>
        <b-input placeholder="Procurar..."></b-input>
      </div>
      <b-table :data="clients" :selected.sync="selected" :paginated="true" :per-page="5" focusable>
        <template slot-scope="props">
          <b-table-column field="name" label="NOME" sortable>
            {{ props.row.name }}
          </b-table-column>
          <b-table-column field="created_at" label="CADASTRO">
            {{ parseDate(props.row.created_at) }}
          </b-table-column>
          <b-table-column field="user.email" label="EMAIL">
            {{ props.row.user.email }}
          </b-table-column>
          <b-table-column field="phone" label="TELEFONE">
            {{ props.row.phone }}
          </b-table-column>
        </template>
      </b-table>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
export default {
  name: 'clients',
  data () {
    return {
      radio: '',
      userSelected: undefined
    }
  },
  computed: {
    ...mapGetters([
      'clients'
    ]),
    selected: {
      get () {
        return this.userSelected ? this.userSelected : this.clients[0]
      },
      set (newValue) {
        console.log(newValue)
      }
    }
  },
  beforeMount () {
    this.getClients(this)
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'getClients'
    ]),
    parseDate (date) {
      return moment().format('DD/MM/YYYY')
    }
  }
}
</script>
