<template>
  <main id="master">
    <h3>
      Serviços
      <div id="edit" @click="isEditActive = true" v-if="serviceSelected">
        <b-icon icon="edit"></b-icon>
      </div>
      <button id="createButtonService" class="buttons is-primary" @click="log">Criar novo serviço</button>
    </h3>
    <service-table v-if="services" :selectedIndex="selectedIndex" :resources="services" @search="searchServices($event)" @restore="restoreServices" @update="setServiceSelected($event)" @filter="isFilterModal = true">
      <template v-slot:search>
        <b-input placeholder="Procurar por documento" v-model="searchQuery"></b-input>
      </template>
    </service-table>
    <service :selected="serviceSelected"  v-if="serviceSelected"></service>
    <div class="content" v-else>
       <h2>Nenhum cliente cadastrado ou encontrado</h2>
    </div>
    <b-modal :active.sync="isServiceModalActive">
      <component :is="parseModal()" @serviceCreated="serviceCreated = true" @creationFailed="serviceCreated = false">
        <template v-slot:message>
          <h2>{{ serviceCreated ? 'Sucesso ao cadastrar um serviço' : 'Algo de errado aconteceu' }}</h2>
        </template>
      </component>
    </b-modal>
    <b-modal :onCancel="restoreServiceSelected" :active.sync="isEditActive">
      <service-edit :service="serviceSelected" :selectedIndex="selectedIndex" @updated="isEditActive = false"></service-edit>
    </b-modal>
    <b-modal :active.sync="isFilterModal">
      <filter-service @filter="searchServices($event)" @reset="resetFilters()"></filter-service>
    </b-modal>
  </main>
</template>
<script src="./vmaster.js"></script>
