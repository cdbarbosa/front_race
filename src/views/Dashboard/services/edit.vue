<template>
  <main id="updateService">
    <h3>Serviços</h3>
    <form @keyup.enter.ctrl="updateFunction" @submit.prevent="updateFunction">
      <div class="content">
        <section class="service">
          <article class="info-one">
            <b-field label="Título">
              <textarea v-model="name" name="" rows="4"></textarea>
            </b-field>
            <b-field label="ID">
              <b-input v-model="service.id" placeholder="23" disabled></b-input>
            </b-field>
          </article>
          <article class="info-two">
            <b-field label="Data de registro">
              <b-input :value="parseDate(service.created_at)" v-mask="'##/##/####'" placeholder="data" name="register" disabled></b-input>
              <!-- <b&#45;datepicker :value="parseDate(service.delivered)"></b&#45;datepicker> -->
            </b-field>
            <b-field label="Previsão">
              <b-datepicker v-model="forecast" :date-formatter="(date) => date.toLocaleDateString('pt-BR')" placeholder="data" name="date"></b-datepicker>
              <!-- <b&#45;input :value="parseDate(service.forecast)" v&#45;model="forecast" placeholder="Previsão" required></b&#45;input> -->
            </b-field>
            <b-field label="Entrega">
              <b-datepicker v-model="delivered" :date-formatter="(date) => date.toLocaleDateString('pt-BR')" placeholder="Entrega"></b-datepicker>
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
              <b-input type="number" step="0.1" v-model="profit" placeholder="50%"></b-input>
            </b-field>
            <b-field label="Recebido">
              <b-input v-model="received_value" placeholder="825" disabled></b-input>
            </b-field>
          </article>
          <article>
            <b-field label="Situação">
              <b-select placeholder="Selecione um status para o cliente" v-model="status">
                <!-- <option value="">Selecione</option> -->
                <option v-for="(st, index) in serviceStatuses" :value="st.id" :key="index">{{ st.abbreviation }} - {{ st.description }}</option>
              </b-select>
            </b-field>
            <b-field label="Sigilo">
              <div class="block">
                <b-radio v-model="confidentiality" :native-value="1">Nenhum</b-radio>
                <b-radio v-model="confidentiality" :native-value="2">Parcial</b-radio>
                <b-radio v-model="confidentiality" :native-value="3">Total</b-radio>
              </div>
            </b-field>
          </article>
        </section>
        <section class="description">
          <b-field label="Observações">
            <vue-editor :editorToolbar="customToolbar" v-model="description"></vue-editor>
          </b-field>
        </section>
        <button type="submit">Atualizar</button>
      </div>
    </form>
  </main>
</template>
<script src="./edit.js"></script>
