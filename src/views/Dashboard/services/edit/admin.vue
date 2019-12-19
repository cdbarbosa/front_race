<template>
  <div class="content">
    <section class="service">
      <article class="info-one">
        <b-field label="Título">
          <b-input v-model="name" maxlength="200" type="textarea" required :disabled="!service.updatable"></b-input>
          <!-- <textarea v&#45;model="name" name="" rows="4" ></textarea> -->
        </b-field>
        <b-field label="ID">
          <b-input v-model="service.id" placeholder="23" disabled></b-input>
        </b-field>
      </article>
      <article class="info-two">
        <b-field label="Cadastro">
          <b-input :value="parseDate(service.created_at)" v-mask="'##/##/####'" placeholder="data" name="register" disabled></b-input>
          <!-- <b&#45;datepicker :value="parseDate(service.delivered)"></b&#45;datepicker> -->
        </b-field>
        <b-field label="Previsão">
          <!-- <b&#45;datepicker  v&#45;model="forecast" :date&#45;formatter="(date) => date.toLocaleDateString('pt&#45;BR')" placeholder="Previsão" name="date"></b&#45;datepicker> -->
          <b-datepicker v-model="forecast" :date-formatter="(date) => date.toLocaleDateString('pt-BR')" placeholder="Previsão" name="date" :disabled="!service.updatable"></b-datepicker>
          <!-- <b&#45;input :value="parseDate(service.forecast)" v&#45;model="forecast" placeholder="Previsão" required></b&#45;input> -->
        </b-field>
        <b-field label="Entrega">
          <b-datepicker v-model="delivered" :date-formatter="(date) => date.toLocaleDateString('pt-BR')" placeholder="Entrega" :disabled="!service.updatable"></b-datepicker>
          <!-- <b-input :value="parseDate(service.delivered)" v-model="delivered" v-mask="'##/##/####'" name="delivered"></b-input> -->
        </b-field>
      </article>
      <article class="info-three">
        <b-field label="Cliente">
          <b-input v-model="service.client.name" placeholder="Cliente" disabled></b-input>
        </b-field>
      </article>
      <article class="info-four">
        <b-field label="Margem">
          <b-input type="number" step="0.1" v-model="profit" placeholder="50%" :disabled="!service.updatable"></b-input>
        </b-field>
        <b-field label="Recebido">
          <b-input v-model="received_value" placeholder="825" disabled></b-input>
        </b-field>
      </article>
      <article>
        <b-field label="Tipo de custo TJ">
          <div class="block">
            <b-radio v-model="tjType" :native-value="1" :disabled="!service.updatable">Porcentagem</b-radio>
            <b-radio v-model="tjType" :native-value="2" :disabled="!service.updatable">Valor</b-radio>
          </div>
        </b-field>
        <b-field :label="`Custo TJ (${service.tj.type_id === 1 ? '%' : 'R$'})`">
          <b-input v-model="tjCost" type="number" step="0.01" :disabled="!service.updatable"></b-input>
        </b-field>
      </article>
      <article>
        <b-field label="Situação">
          <b-select placeholder="Selecione uma situação para o serviço" v-model="status">
            <!-- <option value="">Selecione</option> -->
            <option v-for="(st, index) in serviceStatuses" :value="st.id" :key="index">{{ st.abbreviation }} - {{ st.description }}</option>
          </b-select>
        </b-field>
        <b-field label="Sigilo">
          <div class="block">
            <b-radio v-model="confidentiality" :native-value="1" :disabled="!service.updatable">Nenhum</b-radio>
            <b-radio v-model="confidentiality" :native-value="2" :disabled="!service.updatable">Parcial</b-radio>
            <b-radio v-model="confidentiality" :native-value="3" :disabled="!service.updatable">Total</b-radio>
          </div>
        </b-field>
      </article>
      <b-field label="Justificativa" v-if="showJustificationBox">
        <b-input v-model="justification" maxlength="200" type="textarea" required ></b-input>
      </b-field>

    </section>
    <section class="description">
      <b-field label="Detalhes Técnicos">
        <vue-editor :editorToolbar="customToolbar" v-model="technicalDetails" :disabled="!service.updatable"></vue-editor>
      </b-field>
      <b-field label="Observações">
        <vue-editor :editorToolbar="customToolbar" v-model="description"></vue-editor>
      </b-field>
      <b-field label="Observações privadas">
        <vue-editor :editorToolbar="customToolbar" v-model="privateDescription"></vue-editor>
      </b-field>
    </section>
  </div>
</template>
<script src="./admin.js"></script>
