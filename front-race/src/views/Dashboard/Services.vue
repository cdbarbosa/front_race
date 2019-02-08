<template>
  <div class="service">
    <h2 style="padding: 1rem; color: black">Serviços</h2>
    <div class="columns" style="padding: 1rem">
      <div class="column" style="margin-right: .5rem">
        <div class="form">
          <div class="info" style="display: flex; flex-wrap: wrap; justify-content: space-between">
            <b-field label="Descrição">
              <textarea name="" id="" cols="45" rows="2"></textarea>
            </b-field>
            <b-field label="ID" style="width: 56px">
              <b-input placeholder="23"></b-input>
            </b-field>
            <div class="info" style="display: flex; flex-wrap: wrap; justify-content: space-between">
              <b-field label="Data de registro" style="width: 140px; margin-right: 1rem">
                <b-input placeholder="data"></b-input>
              </b-field>
              <b-field label="Previsão" style="width: 140px; margin-right: 1rem">
                <b-input placeholder="data"></b-input>
              </b-field>
              <b-field label="Prazo" style="width: 140px">
                <b-input placeholder="data"></b-input>
              </b-field>
            </div>
            <div class="info" style="display: flex; flex-wrap: wrap; justify-content: space-between">
              <b-field label="Cliente">
                <b-input placeholder="Cliente"></b-input>
              </b-field>
              <b-field label="Sigilo" style="margin-left: 2rem">
                <div class="block">
                  <b-radio v-model="radio" native-value="Nenhum">
                    Nenhum
                  </b-radio>
                  <b-radio v-model="radio" native-value="Parcial">
                    Parcial
                  </b-radio>
                  <b-radio v-model="radio" native-value="Total">
                    Total
                  </b-radio>
                </div>
              </b-field>
            </div>
            <div class="info" style="display: flex; flex-wrap: wrap; justify-content: space-between">
              <b-field label="Margem">
                <b-input placeholder="50%" style="width: 140px; margin-right: 1rem"></b-input>
              </b-field>
              <b-field label="Valor">
                <b-input placeholder="825" style="width: 140px; margin-right: 1rem"></b-input>
              </b-field>
              <b-field label="Recebido">
                <b-input placeholder="825" style="width: 140px"></b-input>
              </b-field>
            </div>
          </div>
          <b-field label="Situação">
            <b-select placeholder="Select a name" style="width: 100%">
                <option value="">Selecione</option>
                <option value="1">ORCA - Orçamento (em aberto)</option>
            </b-select>
          </b-field>
        </div>
      </div>
      <div class="column outros" style="margin-right: .5rem">
        <b-field label="Observações">
          <textarea name="" id="" cols="50" rows="15"></textarea>
        </b-field>
      </div>
    </div>
    <div class="table-service" style="background: #ccc; padding: 1rem">
      <div class="headerTable" style="position: relative">
        <h4 style="color: black">Serviços</h4>
        <b-input placeholder="Procurar..." style="position: absolute; top: 0; right: 0"></b-input>
      </div>
      <b-table :data="data" :columns="columns" style="padding-top: 1rem"></b-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'service',
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
