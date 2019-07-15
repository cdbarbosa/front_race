<template id="">
  <main id="master">
    <h3>
      RH's
      <div id="edit" @click="isEditActive = true" v-if="rhSelected">
        <b-icon icon="edit"></b-icon>
      </div>
      <button id="createButtonRh" class="buttons is-primary" @click="isRhModalActive = true">Cadastrar novo RH</button>
    </h3>
    <div class="content __display">
      <rh-table v-if="rhs" :resources="rhs" :setFunction="setRhFilters" :document="true" :selectedIndex="selectedIndex" @update="setRhSelected($event[0])" @filter="filter($event)" @searchByDocument="searchUserByDocument" @restore="restoreRhs($event)">
        <span slot="title">RH's</span>
        <template v-slot:search>
          <b-input placeholder="Procurar por um RH" v-model="searchQuery"></b-input>
        </template>
      </rh-table>
    </div>
    <div class="content" v-if="rhSelected">
      <generic-user :person="rhSelected"></generic-user>
      <section>
        <b-field label="Custo (hora)">
          <money v-if="rhSelected.cost" class="input" :value="parseFloat(rhSelected.cost)" v-money="money" :masked="true" disabled></money>
          <div v-else class="textarea __disabled" disabled></div>
        </b-field>
        <b-field label="Competências">
          <div class="textarea __disabled" v-html="rhSelected.competencies" disabled></div>
        </b-field>
        <b-field label="Experiência">
          <div class="textarea __disabled" v-html="rhSelected.experience"></div>
        </b-field>
        <b-field label="Observações">
          <div class="textarea __disabled" v-html="rhSelected.observations"></div>
        </b-field>
      </section>
      <section id="academics">
        <b-field label="Perfil Lattes" >
          <b-input v-model="rhSelected.lattes_perfil" disabled></b-input>
        </b-field>
        <b-field label="Bacharelado">
          <b-input v-model="area" disabled></b-input>
        </b-field>
        <b-field label="Título">
          <b-input v-model="degree" disabled></b-input>
        </b-field>
      </section>
    </div>
    <div class="content" v-else>
      <h2>RH não cadastrado ou não encontrado</h2>
    </div>
    <b-modal :active.sync="isRhModalActive">
      <component :is="parseModal()" @rhCreated="rhCreated = true" @creationFailed="rhCreated = false">
        <template v-slot:message>
          <h2>{{ rhCreated ? 'Sucesso ao cadastrar um RH' : 'Algo de errado aconteceu' }}</h2>
        </template>
      </component>
    </b-modal>
    <b-modal :onCancel="restoreRhSelected" :active.sync="isEditActive">
      <edit-rh :rh="rhSelected" :selectedIndex="selectedIndex" @updated="isEditActive = false"></edit-rh>
    </b-modal>
  </main>
</template>
<script charset="utf-8" src="./vmaster.js"></script>
