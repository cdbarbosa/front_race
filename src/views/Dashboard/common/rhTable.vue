<template>
  <section class="__secundary">
    <div :class="[{create: create}, 'tableContainer']">
      <header>
        <h4>
          <slot name="title"></slot>
        </h4>
        <b-input placeholder="Procurar por um RH" v-model="searchRh"></b-input>
        <b-input placeholder="Procurar por documento" v-mask="['###.###.###-##','##.###.###/####-##']" v-model="searchDocument"></b-input>
        <span @click="$emit('restore')">
          <i class="fas fa-backspace"></i>
        </span>
        <div id="edit" v-if="filters" @click="isFilterModalActive = true">
          <b-icon icon="cog"></b-icon>
        </div>
      </header>
      <b-table :current-page.sync="currentPage" :per-page="perPage" :data="resources" :paginated="true" :selected.sync="selected" @update:selected="$emit('update', [$event, true])" focusable style="padding-top: 1rem">
        <template slot-scope="props">
          <b-table-column field="name" label="NOME" sortable>
            {{ props.row.name }}
          </b-table-column>
          <b-table-column field="user.email" label="Email">
            {{ props.row.user.email }}
          </b-table-column>
          <b-table-column field="cost" label="Custo" sortable>
            {{'R$ ' + props.row.cost }}
          </b-table-column>
        </template>
        <template slot="empty">
          <section class="section">
            <div class="empty has-text-grey has-text-centered">
              <p>
                <b-icon icon="frown" size="is-large"></b-icon>
              </p>
              <p>Nenhum RH.</p>
            </div>
          </section>
        </template>
      </b-table>
      <button v-if="attach" @click="$emit('attachRh')">Associar esse RH</button>
      <b-modal :active.sync="isModalActive">
        <component :is="parseModal()" @rhCreated="rhCreated = true" @creationFailed="rhCreated = false"></component>
      </b-modal>
    </div>
    <b-modal :active.sync="isFilterModalActive">
      <div class="content" style="padding: 1rem">
        <section>
          <h3>Fitros Básicos</h3>
          <div class="box basic-filter" v-for="(filter, index) in userFilters" :key="filter.key">
            <b-checkbox @input="parseFilters([index, 'userFilters', 'active',  $event])" :value="filter.active">
              {{ filter.label }}
            </b-checkbox>
            <span v-if="filter.active" >
              <b-switch v-if="filter.key === 'active'" :value="filter.value" @input="parseFilters([index, 'userFilters', 'value', $event])">{{ filter.value ? 'Ativo' : 'Inativo' }}</b-switch>
              <b-input  v-else placeholder="Text here..." :value="filter.value" @input="parseFilters([index, 'userFilters', 'value', $event])"></b-input>
            </span>
          </div>
          <div class="box basic-filter" v-for="(filter, index) in rhFilters" :key="filter.key">
            <b-checkbox @input="parseFilters([index, 'rhFilters', 'active',  $event])" :value="filter.active">
              {{ filter.label }}
            </b-checkbox>
            <span v-if="filter.active" >
              <b-input placeholder="Text here..." :value="filter.value" @input="parseFilters([index, 'rhFilters', 'value', $event])"></b-input>
            </span>
          </div>
          <div class="box basic-filter" v-for="(filter, index) in addressFilters" :key="filter.key">
            <b-checkbox @input="parseFilters([index, 'addressFilters', 'active',  $event])" :value="filter.active">
              {{ filter.label }}
            </b-checkbox>
            <span v-if="filter.active" >
              <b-input placeholder="Text here..." :value="filter.value" @input="parseFilters([index, 'addressFilters', 'value', $event])"></b-input>
            </span>
          </div>
        </section>
        <section>
          <h3>Fitros Acadêmicos</h3>
          <div class="box academic-filter" v-for="(filter, index) in academicFilters" :key="index">
            <b-checkbox @input="parseFilters([index, 'academicFilters', 'active',  $event])" :value="filter.active">
              {{ filter.label }}
            </b-checkbox>
            <span v-if="filter.active">
              <b-input placeholder="Text here..." :value="filter.value" @input="parseFilters([index, 'academicFilters', 'value', $event])"></b-input>
            </span>
          </div>
          <div class="bottonFilter">
            <button @click="filter(searchRh); isFilterModalActive = false">Ok</button>
            <button @click="$emit('restore'); isFilterModalActive = false">Resetar</button>
          </div>
        </section>
      </div>
    </b-modal>
  </section>
</template>
<script src="./rhTable.js"></script>
