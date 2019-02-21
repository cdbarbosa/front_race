<template>
	<div id="details">
		<h1>Detalhes</h1>
    <div class="content">
      <div class="infoService">
        <b-field label="Titulo">
          <b-input placeholder="Lorem ipsum dolor sit amet"></b-input>
        </b-field>
        <b-field label="Descrição">
          <textarea name="" id="" cols="40" rows="2"></textarea>
        </b-field>
        <b-field label="Situação">
          <b-select placeholder="Select a name">
            <option value="">Selecione</option>
            <option value="1">ORCA - Orçamento (em aberto)</option>
          </b-select>
        </b-field>
      </div>
      <div class="infoClient">
        <div class="infoRh">
          <b-field label="RH">
            <b-input placeholder="Lorem ipsum dolor sit amet"></b-input>
          </b-field>
          <b-field label="ID">
            <b-input placeholder="2"></b-input>
          </b-field>
        </div>
        <b-field label="Descrição">
          <textarea name="" id="" cols="40" rows="2"></textarea>
        </b-field>
        <div class="cost">
          <b-field label="Custo">
            <b-input placeholder="ORCA - Orçamento (em aberto)"></b-input>
          </b-field>
          <div class="field">
              <b-checkbox>Estado</b-checkbox>
          </div>
        </div>
        <div class="hours">
          <b-field label="Horas">
            <b-input placeholder="ORCA - Orçamento (em aberto)"></b-input>
          </b-field>
          <b-field label="Prazo">
            <b-input placeholder="ORCA - Orçamento (em aberto)"></b-input>
          </b-field>
        </div>
      </div>
    </div>
    <div class="serviceTable">
      <div class="headerTable">
        <h4>RHs responsáveis</h4>
        <button class="buttons is-primary">Adicionar novo RH ao serviço</button>
        <b-input placeholder="Procurar..."></b-input>
      </div>
      <b-table :data="data" :columns="columns" style="padding-top: 1rem"></b-table>
    </div>
	</div>
</template>
<script>
export default {
  name: 'VueDetails',
  data () {
    return {
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
  },
  methods: {
    //
  }
}
</script>
