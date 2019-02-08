<template>
  <div class="clients">
    <div class="columns" style="padding: 1rem">
      <div class="column is-half" style="margin-right: .5rem">
        <h4>Clientes</h4>
        <div class="form">
          <div class="info" style="display: flex; flex-wrap: wrap; justify-content: space-between">
            <b-field label="Nome" style="width: 566px">
              <b-input placeholder="Nome"></b-input>
            </b-field>
            <b-field label="ID" style="width: 53px">
              <b-input placeholder="23"></b-input>
            </b-field>
            <b-field label="Cadastro" style="width: 390px">
              <b-input placeholder="Cadastro"></b-input>
            </b-field>
            <b-field label="Telefone" style="width: 226px">
              <b-input placeholder="Telefone"></b-input>
            </b-field>
            <b-field label="Email" style="width: 390px">
              <b-input placeholder="example@example.com"></b-input>
            </b-field>
            <div class="block" style="margin-top: 2.75rem">
              <b-radio v-model="radio" native-value="Fisico">
                Fisico
              </b-radio>
              <b-radio v-model="radio" native-value="Juridico">
                Juridico
              </b-radio>
            </div>
          </div>
          <b-field label="CPF/CNPJ">
            <b-input placeholder="cpf"></b-input>
          </b-field>
          <div class="address">
            <h4>Endereço</h4>
            <div class="info" style="display: flex; flex-wrap: wrap; justify-content: space-between">
              <b-field label="Rua" style="width: 475px">
                <b-input placeholder="Rua"></b-input>
              </b-field>
              <b-field label="Estado" style="width: 140px">
                <b-input placeholder="ES"></b-input>
              </b-field>
              <div class="info" style="display: flex; flex-wrap: wrap">
                <b-field label="CEP" style="width: 124px; margin-right: 1rem">
                  <b-input placeholder="CEP"></b-input>
                </b-field>
                <b-field label="Bairro" style="width: 200px; margin-right: 1rem">
                  <b-input placeholder="Bairro"></b-input>
                </b-field>
                <b-field label="Cidade" style="width: 280px">
                  <b-input placeholder="Cidade"></b-input>
                </b-field>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-half outros" style="margin-left: .5rem">
        <h4>Outros</h4>
        <b-field label="Observações">
          <textarea name="" id="" cols="30" rows="13" style="width: 100%"></textarea>
        </b-field>
        <b-field label="Atividade">
          <b-input placeholder="Produçaõ de PANIC"></b-input>
        </b-field>
      </div>
    </div>
    <div class="table-client" style="background: #ccc; padding: 1rem; margin-left: .2rem">
      <div class="headerTable" style="position: relative">
        <h4>Clientes</h4>
        <b-input placeholder="Procurar..." style="position: absolute; top: 0; right: 0"></b-input>
      </div>
      <b-table :data="data" :columns="columns" style="padding-top: 1rem"></b-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'clients',
  data () {
    return {
      radio: '',
       data: [
            { 'id': 1, 'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016-10-15 13:43:27', 'gender': 'Male' },
            { 'id': 2, 'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016-12-15 06:00:53', 'gender': 'Male' },
            { 'id': 3, 'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016-04-26 06:26:28', 'gender': 'Female' },
            { 'id': 4, 'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016-04-10 10:28:46', 'gender': 'Male' },
            { 'id': 5, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female' }
        ],
      columns: [
          {
              field: 'id',
              label: 'ID',
              width: '40',
              numeric: true
          },
          {
              field: 'first_name',
              label: 'First Name',
          },
          {
              field: 'last_name',
              label: 'Last Name',
          },
          {
              field: 'date',
              label: 'Date',
              centered: true
          },
          {
              field: 'gender',
              label: 'Gender',
          }
      ]
    }
  }
}
</script>
