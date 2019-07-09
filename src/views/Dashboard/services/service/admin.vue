<template>
  <div class="content" v-if="selected">
    <section>
      <article>
        <b-field label="Título">
          <textarea v-model="selected.name" disabled></textarea>
          <!-- <b&#45;input type="" ></b&#45;input> -->
        </b-field>
        <b-field label="ID">
          <b-input v-model="selected.id" placeholder="23" disabled></b-input>
        </b-field>
      </article>
      <article>
        <b-field label="Cliente" v-if="selected.client">
          <b-input v-model="selected.client.name" placeholder="Cliente" disabled></b-input>
        </b-field>
        <b-field label="Sigilo">
          <div class="block">
            <b-radio v-model="selected.confidentiality_id" :native-value="1" disabled>Nenhum</b-radio>
            <b-radio v-model="selected.confidentiality_id" :native-value="2" disabled>Parcial</b-radio>
            <b-radio v-model="selected.confidentiality_id" :native-value="3" disabled>Total</b-radio>
          </div>
        </b-field>
      </article>
      <article>
        <b-field label="Cadastro">
          <b-input :value="parseDate(selected.created_at)" v-mask="'##/##/####'" placeholder="data" name="register" disabled></b-input>
        </b-field>
        <b-field label="Previsão">
          <b-input v-if="selected.forecast" :value="parseDate(selected.forecast)" v-mask="'##/##/####'" placeholder="Previsão" name="date" disabled></b-input>
          <div class="__disabled" v-else></div>
        </b-field>
        <b-field label="Entrega">
          <b-input :value="parseDate(selected.delivered)" v-mask="'##/##/####'" placeholder="Entrega" name="delivered" disabled></b-input>
        </b-field>
      </article>
      <article>
        <b-field label="Margem">
          <b-input :value="selected.profit ? `${selected.profit} %` : 'Não informado'" placeholder="50%" disabled></b-input>
        </b-field>
        <b-field label="Valor">
          <money class="input" :value="selected.total_cost" v-money="money" :masked="true" disabled></money>
        </b-field>
        <b-field label="Recebido">
          <money class="input" :value="selected.received_value" v-money="money" :masked="true" disabled></money>
        </b-field>
      </article>
      <article v-if="selected.tj">
        <b-field label="Custo TJ">
          <b-input :value="selected.tj.cost ? `${selected.tj.type_id === 1 ? selected.tj.cost + ' %' : 'R$ ' + selected.tj.cost}` : 'Não informado'" disabled></b-input>
        </b-field>
        <b-field label="Situação">
          <b-input :value="`${selected.status.abbreviation} - ${selected.status.description}`" disabled></b-input>
        </b-field>
      </article>
      <!-- <div class="actions" v&#45;if="$store.getters.user.role_id === 1"> -->
      <!--   <router&#45;link tag="button" :to="{ name: 'serviceReceipts', params: { service_id: this.$route.params.service_id } }">Recebimentos</router&#45;link> -->
      <!--   <router&#45;link tag="button" :to="{ name: 'serviceDetails', params: { service_id: this.$route.params.service_id } }">Detalhes</router&#45;link> -->
      <!-- </div> -->
    </section>
    <section>
      <div class="description">
        <b-field label="Observações">
          <div class="ql-editor textarea __disabled" v-html="selected.description"></div>
        </b-field>
      </div>
    </section>
  </div>
</template>
<script src="./admin.js"></script>
