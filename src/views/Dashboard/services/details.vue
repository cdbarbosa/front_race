<template>
  <main class="details" id="serviceDetails" v-if="service">
    <h3>
      Detalhes
      <div id="edit" @click="isEditModal = true">
        <b-icon icon="edit"></b-icon>
      </div>
    </h3>
    <div class="content">
      <transition name="fade">
        <div class="userInfo" v-if="isUserInfoOpen">
          <generic-user :complete="false" :person="rhDetails"></generic-user>
          <section>
            <b-field label="Custo (hora)">
              <money v-if="rhDetails.cost" class="input" :value="parseFloat(rhDetails.cost)" v-money="money" :masked="true" disabled></money>
              <div v-else class="textarea __disabled" disabled></div>
            </b-field>
            <b-field label="Competências">
              <div class="textarea __disabled" v-html="rhDetails.competencies" disabled></div>
            </b-field>
            <b-field label="Experiência">
              <div class="textarea __disabled" v-html="rhDetails.experience"></div>
            </b-field>
            <b-field label="Observações">
              <div class="textarea __disabled" v-html="rhDetails.observations"></div>
            </b-field>
          </section>
        </div>
      </transition>
      <section>
        <article>
          <b-field label="Serviço">
            <div v-html="service.name" class="textarea __disabled"></div>
            <!-- <textarea v&#45;model="service.name" disabled></textarea> -->
            <!-- <b&#45;input v&#45;model="service.name" disabled :title="service.name"></b&#45;input> -->
          </b-field>
          <b-field label="ID">
            <b-input v-model="service.id" disabled></b-input>
          </b-field>
        </article>
        <hr>
        <div v-if="rhInServiceSelected" id="rh">
          <article class="__display">
            <b-field label="RH Associado">
              <b-input v-model="rhInServiceSelected.name" disabled></b-input>
            </b-field>
            <b-field label="Comepetências">
              <div class="textarea __disabled" v-html="rhInServiceSelected.competencies"></div>
            </b-field>
            <b-field label="Responsabilidade Técnica">
              <b-input v-model="rhInServiceSelected.pivot.goal" placeholder="Atividade" disabled></b-input>
            </b-field>
          </article>
          <article>
            <b-field label="Custo (padrão) por hora">
              <money class="input" :value="rhInServiceSelected.cost" v-money="money" :masked="true" disabled></money>
            </b-field>
            <b-field label="Demanda (hora)">
              <b-input :value="rhInServiceSelected.pivot.hours" disabled></b-input>
            </b-field>
            <b-field label="Custo (no serviço) por hora">
              <money class="input" :value="rhInServiceSelected.pivot.cost" v-money="money" :masked="true" disabled></money>
            </b-field>
          </article>
          <div class="actions">
          </div>
        </div>
      </section>
      <section>
        <rh-table
          @filter="filterRhInService($event)"
          :resources="rhsInService"
          :selectedIndex="rhInServiceSelectedIndex"
          :create="false"
          :filters="false"
          :attach="false"
          :search="false"
          :document="false"
          :service_id="service.id"
          :setFunction="setRhNotInServiceFilters"
          :getStore="'rhNotInServiceFilters'"
          :mode="'in'"
          @update="setRhInServiceSelected($event[0])"
          @attachRh="isAttachModalOpen = true"
          @restore="reset($event)">
          <span slot="title">RH's (associados)</span>
          <template v-slot:action>
            <button class="__small __primary" @click="rhDetails = rhInServiceSelected; isUserInfoOpen = !isUserInfoOpen">Detalhes do RH</button>
            <button class="__small" @click="detachRh(rhInServiceSelected.id)" v-if="isResponseble">Desassociar esse RH</button>
          </template>
        </rh-table>
        <!-- <rh&#45;table&#45;details @filter="filterRhInService($event)" @reset="reset($event)" :rhs="rhsInService" :selectedIndex="rhInServiceSelectedIndex" > -->
        <!--   <span slot="title">RH's Responsáveis</span> -->
        <!-- </rh&#45;table&#45;details> -->
        <hr>
        <rh-table
          @filter="filterRhNotInService($event)"
          :filterActive="filterActive"
          :resources="rhsNotInService"
          :selectedIndex="rhNotInServiceSelectedIndex"
          :create="false"
          :document="false"
          :service_id="service.id"
          :setFunction="setRhNotInServiceFilters"
          :getStore="'rhNotInServiceFilters'"
          :mode="'out'"
          :detailed="true"
          @update="setRhNotInServiceSelected($event[0])"
          @restore="restoreRhNotInServiceFilters">
          <span slot="title">RH's</span>
          <template v-slot:search>
            <b-input placeholder="Procurar por um RH" v-model="searchQueryNotInService"></b-input>
          </template>
          <template v-slot:action>
            <button class="__small __primary" @click="rhDetails = rhInServiceSelected; isUserInfoOpen = !isUserInfoOpen">Detalhes do RH</button>
            <button class="__small __primary" @click="isAttachModalOpen = true">Associar esse RH</button>
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
              <b-field label="Custo (padrão) por hora">
                <money class="input" :value="rhNotInServiceSelected.cost" v-money="money" :masked="true" disabled></money>
              </b-field>
              <b-field label="Demanda (hora)">
                <b-input  v-model="rhServiceFields.hours" required></b-input>
              </b-field>
              <b-field label="Custo (no serviço) por hora">
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
        <!-- <h3>Editar RH Associado</h3> -->
        <form @submit.prevent="editRhAssociated">
          <section>
            <article>
              <b-field label="RH">
                <b-input v-model="service.name" disabled></b-input>
              </b-field>
              <b-field label="ID">
                <b-input v-model="service.id" disabled></b-input>
              </b-field>
            </article>
            <article>
              <b-field label="Objetivo">
                <b-input placeholder="Qual serviço o rh irá realizar?" v-model="rhInServiceSelected.pivot.goal" required></b-input>
              </b-field>
            </article>
            <article>
              <b-field label="Custo (padrão)">
                <money class="input" :value="rhInServiceSelected.cost" v-money="money" :masked="true" disabled></money>
              </b-field>
              <b-field label="Demanda (hora)">
                <b-input placeholder="1" v-model="rhInServiceSelected.pivot.hours" required></b-input>
              </b-field>
              <b-field label="Custo (no serviço)">
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
