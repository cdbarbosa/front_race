<template>
  <main class="details" id="serviceDetails" v-if="service">
    <h3>Detalhes do Serviço</h3>
    <div class="content">
      <section>
        <article>
          <b-field label="Serviço">
            <b-input v-model="service.name" disabled :title="service.name"></b-input>
          </b-field>
          <b-field label="ID">
            <b-input v-model="service.id" disabled></b-input>
          </b-field>
        </article>
        <hr>
        <div v-if="selected" id="rh">
          <article class="__display">
            <b-field label="RH">
              <b-input v-model="selected.name" disabled></b-input>
            </b-field>
            <b-field label="Comepetências">
              <div class="textarea __disabled" v-html="selected.competencies"></div>
            </b-field>
            <b-field label="Atividades">
              <b-input v-model="selected.pivot.goal" placeholder="Atividade"></b-input>
            </b-field>
          </article>
          <article>
            <b-field label="Custo por Hora Padrão">
              <money class="input" :value="selected.cost" :masked="true" disabled></money>
            </b-field>
            <b-field label="Numero de Horas">
              <b-input :value="selected.pivot.hours" disabled></b-input>
            </b-field>
            <b-field label="Custo por Hora para o Serviço">
              <money class="input" :value="selected.pivot.cost" v-money :masked="true" disabled></money>
            </b-field>
          </article>
          <div class="actions">
            <button class="is-primary" @click="detachRh(selected.id)" v-if="isResponseble">Desassociar esse RH</button>
            <button class="buttons is-primary" @click="attachRhService" v-if="!isResponseble">Associar este Rh</button>
          </div>
        </div>
      </section>
      <section>
        <rh-table-details @filter="filterRhInService($event)" @reset="reset($event)" :rhs="rhsInService" @update="showAttached($event)">
          <span slot="title">RH's Responsáveis</span>
        </rh-table-details>
        <hr>
        <rh-table @update="rhNotInService = $event[0]" @filter="filterRhNotInService($event)" :rhs="rhsNotInService" @reset="reset($event)">
          <span slot="title">RH's</span>
          <button slot="action" @click="isAttachModalOpen = true">Associar esse RH</button>
        </rh-table>
      </section>
    </div>
    <b-modal :active.sync="isSearchModalActive">
      <!-- <component></component> -->
    </b-modal>
    <b-modal :active.sync="isAttachModalOpen" v-if="rhNotInService">
      <div class="" id="attachScreen">
        <h3>Associar RH</h3>
        <form @submit.prevent="attachRhService">
          <section>
            <article>
              <b-field label="RH">
                <b-input v-model="rhNotInService.name" disabled></b-input>
              </b-field>
              <b-field label="RH">
                <b-input v-model="rhNotInService.id" disabled></b-input>
              </b-field>
            </article>
            <article>
              <b-field label="Objetivo">
                <b-input placeholder="Qual serviço o rh irá realizar?" v-model="rhServiceFields.goal" required></b-input>
              </b-field>
            </article>
            <article>
              <b-field label="Custo por Hora Padrão">
                <money class="input" :value="rhNotInService.cost" v-money disabled></money>
              </b-field>
              <b-field label="Numero de Horas">
                <b-input  v-model="rhServiceFields.hours" required></b-input>
              </b-field>
              <b-field label="Custo por Hora para o Serviço (R$)">
                <b-input min="0" type="number" step="0.01" v-model="rhServiceFields.cost" required></b-input>
              </b-field>
            </article>
          </section>
          <button type="submit">Associar</button>
        </form>
        <!-- <button @click="$emit('attachRh', Object.assign(rhServiceFields, {rh_id: selected.id})); isAttachModalOpen = false">Associar</button> -->
      </div>
    </b-modal>
  </main>
</template>
<script src="./details.js"></script>
