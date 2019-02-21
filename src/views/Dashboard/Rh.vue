<template>
  <div id="rhs">
    <h2>RH's</h2>
    <div class="content">
      <div class="infoRh">
        <div class="info-first">
          <b-field label="Nome">
            <b-input placeholder="Nome"></b-input>
          </b-field>
          <b-field label="ID">
            <b-input placeholder="23"></b-input>
          </b-field>
        </div>
        <div class="info-second">
          <b-field label="Cadastro">
            <b-input placeholder="Cadastro"></b-input>
          </b-field>
          <b-field label="Telefone">
            <b-input placeholder="Telefone"></b-input>
          </b-field>
        </div>
        <div class="info-second">
          <b-field label="Email">
            <b-input placeholder="example@example.com"></b-input>
          </b-field>
          <div class="block">
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
          <h3>Endereço</h3>
          <div class="info-three">
            <b-field label="Rua">
              <b-input placeholder="Rua"></b-input>
            </b-field>
            <b-field label="Estado">
              <b-input placeholder="ES"></b-input>
            </b-field>
          </div>
          <div class="info-fourth">
            <b-field label="CEP">
              <b-input placeholder="CEP"></b-input>
            </b-field>
            <b-field label="Bairro">
              <b-input placeholder="Bairro"></b-input>
            </b-field>
            <b-field label="Cidade">
              <b-input placeholder="Cidade"></b-input>
            </b-field>
          </div>
        </div>
      </div>
      <div class="competencias">
        <b-field label="Competências">
          <b-input placeholder="Analise de dados"></b-input>
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
            <b-input placeholder="R$ 131,00"></b-input>
          </b-field>
        </div>
        <b-field label="Atividade">
          <b-input placeholder="Produção de PANIC"></b-input>
        </b-field>
      </div>
    </div>
    <div class="serviceTable">
      <div class="headerTable">
        <h4>RH's</h4>
        <button class="buttons is-primary">Adicionar novo RH</button>
        <b-input placeholder="Procurar..."></b-input>
      </div>
      <b-table :data="data" :columns="columns" style="padding-top: 1rem"></b-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'rhs',
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
          label: 'First Name'
        },
        {
          field: 'last_name',
          label: 'Last Name'
        },
        {
          field: 'date',
          label: 'Date',
          centered: true
        },
        {
          field: 'gender',
          label: 'Gender'
        }
      ]
    }
  }
}
</script>
