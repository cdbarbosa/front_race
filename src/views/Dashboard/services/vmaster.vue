<template>
  <main id="master">
    <!--
      no-create
      no-download
      no-edit
    -->
    <h3 :class="{'__no-create': [2, 3, 4, 5].indexOf($store.getters.user.role_id) !== -1, '__no-edit': [5].indexOf($store.getters.user.role_id) !== -1, '__no-download': [5].indexOf($store.getters.user.role_id) !== -1}">
      Serviços
      <button id="showClientInfo" @click="isUserInfoOpen = !isUserInfoOpen">Dados do Cliente</button> <!--- If found, render -->
      <button v-if="[1, 4].indexOf($store.getters.user.role_id) !== -1" id="downloadServiceData" @click="saveFile">Baixar dados do Serviço</button> <!--- If found, render -->
      <button v-if="[1].indexOf($store.getters.user.role_id) !== -1" id="createButtonService" @click="isServiceModalActive = true">Criar novo serviço</button> <!--- If found, render -->
      <div @mouseenter="restoreServiceSelected()" id="edit" @click="serviceSelected ? (serviceSelected.lock ? null : isEditActive = true) : null" v-if="serviceSelected && [1, 4, 5].indexOf($store.getters.user.role_id) !== -1"> <!--- If found, render -->
        <b-tooltip v-if="serviceSelected" label="Serviço em edição" type="is-danger" :active="serviceSelected.lock === 1">
          <b-icon icon="edit"></b-icon>
        </b-tooltip>
        <b-icon v-else icon="edit"></b-icon>
      </div>
    </h3>
    <service-table
      v-if="services"
      :options="serviceTableOptions"
      :filterActive="filterActive"
      :selectedIndex="selectedIndex"
      :resources="services"
      @search="filterServices($event)"
      @restore="restoreServices"
      @filter="isFilterModal = true">
      <template v-slot:search>
        <b-input placeholder="Procurar" v-model="searchQuery"></b-input>
        <b-select v-if="[1, 4, 5].indexOf($store.getters.user.role_id) !== -1" :value="statusFilters[0].abbreviation" selected="0" @input="setServiceFilters([0, 'statusFilters', 'value', $event]); watchStatusFilters($event)">
          <option :value="0">Todos Status</option>
          <option v-for="(ss, index) in serviceStatuses" :key="index" :value="ss.abbreviation">{{ ss.abbreviation }} - {{ ss.description }}</option>
        </b-select>
      </template>
    </service-table>
    <transition name="fade">
      <div class="userInfo" v-if="isUserInfoOpen">
        <generic-user :complete="false" :person="serviceSelected.client"></generic-user>
      </div>
    </transition>
    <service :selected="serviceSelected"  v-if="serviceSelected"></service>
    <div class="content" v-else>
       <h2>Nenhum serviço cadastrado ou encontrado</h2>
    </div>
    <b-modal :active.sync="isServiceModalActive">
      <component :is="parseModal()" @serviceCreated="serviceCreated = true; get()" @creationFailed="serviceCreated = false">
        <template v-slot:message>
          <h2>{{ serviceCreated ? 'Sucesso ao cadastrar um serviço' : 'Algo de errado aconteceu' }}</h2>
        </template>
      </component>
    </b-modal>
    <b-modal :onCancel="restoreServiceSelected" :active.sync="isEditActive">
      <service-edit :service="serviceSelected" :selectedIndex="selectedIndex" @updated="isEditActive = false; get()"></service-edit>
    </b-modal>
    <b-modal :active.sync="isFilterModal">
      <filter-service @filter="filterServices($event); isFilterModal = false" @reset="resetFilters(); isFilterModal = false"></filter-service>
    </b-modal>
  </main>
</template>
<script src="./vmaster.js"></script>
