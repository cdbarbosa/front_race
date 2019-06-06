<template>
  <main class="details" id="serviceDetails" v-if="service">
    <h3>
      Detalhes
      <div id="edit" @click="isEditModal = true">
        <b-icon icon="edit"></b-icon>
      </div>
    </h3>
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
        <div v-if="rhInServiceSelected" id="rh">
          <article class="__display">
            <b-field label="RH">
              <b-input v-model="rhInServiceSelected.name" disabled></b-input>
            </b-field>
            <b-field label="Comepetências">
              <div class="textarea __disabled" v-html="rhInServiceSelected.competencies"></div>
            </b-field>
            <b-field label="Atividades">
              <b-input v-model="rhInServiceSelected.pivot.goal" placeholder="Atividade" disabled></b-input>
            </b-field>
          </article>
          <article>
            <b-field label="Custo por Hora Padrão">
              <money class="input" :value="rhInServiceSelected.cost" v-money="money" :masked="true" disabled></money>
            </b-field>
            <b-field label="Numero de Horas">
              <b-input :value="rhInServiceSelected.pivot.hours" disabled></b-input>
            </b-field>
            <b-field label="Custo por Hora para o Serviço">
              <money class="input" :value="rhInServiceSelected.pivot.cost" v-money="money" :masked="true" disabled></money>
            </b-field>
          </article>
          <div class="actions">
            <button class="is-primary" @click="detachRh(rhInServiceSelected.id)" v-if="isResponseble">Desassociar esse RH</button>
          </div>
        </div>
      </section>
      <section>
        <rh-table-details @filter="filterRhInService($event)" @reset="reset($event)" :rhs="rhsInService" :selectedIndex="rhInServiceSelectedIndex" @update="setRhInServiceSelected($event[0])">
          <span slot="title">RH's Responsáveis</span>
        </rh-table-details>
        <hr>
        <rh-table
          @filter="filterRhNotInService($event)"
          :resources="rhsNotInService"
          :selectedIndex="rhNotInServiceSelectedIndex"
          :create="false"
          :attach="true"
          :document="false"
          :service_id="service.id"
          :setFunction="setRhNotInServiceFilters"
          :getStore="'rhNotInServiceFilters'"
          @update="setRhNotInServiceSelected($event[0])"
          @attachRh="isAttachModalOpen = true"
          @restore="reset($event)">
          <span slot="title">RH's</span>
          <template v-slot:search>
            <b-input placeholder="Procurar por um RH" v-model="searchQueryNotInService"></b-input>
          </template>
        </rh-table>
      </section>
    </div>
    <b-modal :onCancel="restoreRhServiceFields" :active.sync="isAttachModalOpen" v-if="rhNotInServiceSelected">
      <h3>Associar RH</h3>
      <form id="attachForm" @submit.prevent="attachRhService">
        <div class="content">
          <section>
            <article>
              <b-field label="RH">
                <b-input v-model="rhNotInServiceSelected.name" disabled></b-input>
              </b-field>
              <b-field label="RH">
                <b-input v-model="rhNotInServiceSelected.id" disabled></b-input>
              </b-field>
            </article>
            <article>
              <b-field label="Objetivo">
                <b-input placeholder="Qual serviço o rh irá realizar?" v-model="rhServiceFields.goal" required></b-input>
              </b-field>
            </article>
            <article>
              <b-field label="Custo por Hora Padrão">
                <money class="input" :value="rhNotInServiceSelected.cost" v-money="money" :masked="true" disabled></money>
              </b-field>
              <b-field label="Numero de Horas">
                <b-input  v-model="rhServiceFields.hours" required></b-input>
              </b-field>
              <b-field label="Custo por Hora para o Serviço (R$)">
                <b-input type="number" step="0.01" v-model="rhServiceFields.cost" required></b-input>
              </b-field>
            </article>
          </section>
        </div>
        <button type="submit">Associar</button>
      </form>
    </b-modal>
    <b-modal :active.sync="isEditModal" :onCancel="restoreRhInServiceSelected">
      <div class="" id="editRhServiceScreen" v-if="rhInServiceSelected">
        <h3>Editar RH Associado</h3>
        <form @submit.prevent="editRhAssociated">
          <section>
            <article>
              <b-field label="RH">
                <b-input v-model="service.name" disabled></b-input>
              </b-field>
              <b-field label="RH">
                <b-input v-model="service.id" disabled></b-input>
              </b-field>
            </article>
            <article>
              <b-field label="Objetivo">
                <b-input placeholder="Qual serviço o rh irá realizar?" v-model="rhInServiceSelected.pivot.goal" required></b-input>
              </b-field>
            </article>
            <article>
              <b-field label="Custo por Hora Padrão">
                <money class="input" :value="rhInServiceSelected.cost" v-money="money" :masked="true" disabled></money>
              </b-field>
              <b-field label="Numero de Horas">
                <b-input placeholder="1" v-model="rhInServiceSelected.pivot.hours" required></b-input>
              </b-field>
              <b-field label="Custo por Hora para o Serviço (R$)">
                <b-input placeholder="10,00" v-model="rhInServiceSelected.pivot.cost" type="number" step="0.01" min="0" required></b-input>
              </b-field>
            </article>
          </section>
          <button style="background: #00466d; margin-top: 1rem;" type="submit">Editar</button>
        </form>
      </div>
    </b-modal>
  </main>
</template>
<script charset="utf-8" src="./details.js"></script>
