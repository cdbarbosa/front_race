<template>
  <section class="__secundary">
    <div :class="[{create: create}, 'tableContainer']">
      <header>
        <h4>
          <slot name="title"></slot>
        </h4>
        <b-field>
          <b-input placeholder="Procurar" v-model="searchRh"></b-input>
        </b-field>
        <span @click="resetFilters">
          <i class="fas fa-backspace"></i>
        </span>
        <div id="edit" v-if="filters" @click="isFilterModalActive = true">
          <b-icon icon="cog"></b-icon>
        </div>
      </header>
      <b-table :current-page.sync="currentPage" :per-page="perPage" :data="rhs ? rhs : []" :paginated="true" :selected.sync="selected" @update:selected="$emit('update', [$event, true])" focusable style="padding-top: 1rem">
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
          <div class="box basic-filter" v-for="(filter, index) in basicFilter" :key="index">
            <b-checkbox v-model="filter.active" :native-value="filter.key">
              {{ filter.label }}
            </b-checkbox>
            <b-input placeholder="Text here..." v-if="filter.active === true" v-model="filter.value" v-mask="filter.key === 'document' ? ['###.###.###-##', '###.###.###/####-##'] : null"></b-input>
          </div>
        </section>
        <section>
          <h3>Fitros Acadêmicos</h3>
          <div class="box academic-filter" v-for="(filter, index) in academicFilter" :key="index">
            <b-checkbox v-model="filter.active" :native-value="filter.key">
              {{ filter.label }}
            </b-checkbox>
            <b-input placeholder="Text here..." v-if="filter.active === true" v-model="filter.value"></b-input>
          </div>
          <div class="bottonFilter">
            <button @click="filter(searchRh); isFilterModalActive = false">Ok</button>
            <button @click="resetFilters">Resetar</button>
          </div>
        </section>
      </div>
    </b-modal>
  </section>
</template>
<script src="./rhTable.js"></script>
