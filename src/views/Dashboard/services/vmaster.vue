<template>
  <main id="master">
    <h3 :class="{'__no-create': [3, 4].indexOf($store.getters.user.role_id) !== -1, '__no-edit': [3].indexOf($store.getters.user.role_id) !== -1}">
      Serviços
      <button v-if="[1, 4].indexOf($store.getters.user.role_id) !== -1" id="downloadServiceData" @click="saveFile">Baixar dados do Serviço</button>
      <button v-if="$store.getters.user.role_id === 1" id="createButtonService" @click="log">Criar novo serviço</button>
      <div id="edit" @click="isEditActive = true" v-if="serviceSelected && [1, 4].indexOf($store.getters.user.role_id) !== -1">
        <b-icon icon="edit"></b-icon>
      </div>
    </h3>
    <service-table v-if="services" :options="serviceTableOptions" :selectedIndex="selectedIndex" :resources="services" @search="searchServices($event)" @restore="restoreServices" @update="setServiceSelected($event)" @filter="isFilterModal = true">
      <template v-slot:search>
        <b-input placeholder="Procurar" v-model="searchQuery"></b-input>
        <b-select v-if="$store.getters.user.role_id === 1" :value="statusFilters[0].abbreviation" selected="0" @input="setServiceFilters([0, 'statusFilters', 'value', $event]); watchStatusFilters($event)">
          <option :value="0">Todos Status</option>
          <option v-for="(ss, index) in serviceStatuses" :key="index" :value="ss.abbreviation">{{ ss.abbreviation }} - {{ ss.description }}</option>
        </b-select>
      </template>
    </service-table>
    <service :selected="serviceSelected"  v-if="serviceSelected"></service>
    <div class="content" v-else>
       <h2>Nenhum serviço cadastrado ou encontrado</h2>
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
      <filter-service @filter="searchServices($event); isFilterModal = false" @reset="resetFilters(); isFilterModal = false"></filter-service>
    </b-modal>
  </main>
</template>
<script src="./vmaster.js"></script>
