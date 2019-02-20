<template>
  <div id="service">
    <h2>Serviços</h2>
    <div class="service-information">
      <div class="description-service">
        <div class="info-one">
          <b-field label="Título">
            <textarea name="" id="" cols="50" rows="2"></textarea>
          </b-field>
          <b-field label="ID">
            <b-input placeholder="23"></b-input>
          </b-field>
        </div>
        <div class="info-two">
          <b-field label="Data de registro">
            <b-input placeholder="data"></b-input>
          </b-field>
          <b-field label="Previsão">
            <b-input placeholder="data"></b-input>
          </b-field>
          <b-field label="Prazo">
            <b-input placeholder="data"></b-input>
          </b-field>
        </div>
        <div class="info-three">
          <b-field label="Cliente">
            <b-input placeholder="Cliente"></b-input>
          </b-field>
          <b-field label="Sigilo">
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
        <div class="info-four">
          <b-field label="Margem">
            <b-input placeholder="50%"></b-input>
          </b-field>
          <b-field label="Valor">
            <b-input placeholder="825"></b-input>
          </b-field>
          <b-field label="Recebido">
            <b-input placeholder="825"></b-input>
          </b-field>
        </div>
        <b-field label="Situação">
          <b-select placeholder="Select a name">
            <option value="">Selecione</option>
            <option value="1">ORCA - Orçamento (em aberto)</option>
          </b-select>
        </b-field>
      </div>
      <div class="description">
        <b-field label="Observações">
          <textarea name="" id="" cols="50" rows="15"></textarea>
        </b-field>
      </div>
    </div>
    <div class="serviceTable">
      <div class="headerTable">
        <h4>Serviços</h4>
        <button class="buttons is-primary">Cadastrar Novo Serviço</button>
        <b-input placeholder="Procurar..."></b-input>
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
