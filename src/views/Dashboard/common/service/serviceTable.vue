<template>
  <div class="content" id="serviceTable">
    <section class="__secundary">
      <div class="tableContainer">
        <header :class="{__userService: target !== 1 }">
          <h4>Serviços </h4>
          <slot name="search"></slot>
          <span @click="$emit('restore')" v-if="options.search">
            <i class="fas fa-backspace"></i> </span>
          <!-- <div v&#45;if="filters" @click="isFilterModalActive = true"> -->
          <!--   <b&#45;icon icon="cog"></b&#45;icon> -->
          <!-- </div> -->
          <div :class="{ __filterActive: filterActive }" id="filter" @click="$emit('filter')" v-if="options.filter && $store.getters.user.role_id === 1">
            <b-icon icon="cog"></b-icon>
          </div>
        </header>
      </div>
      <b-table
        :current-page.sync="currentPage"
        :data="resources"
        :selected.sync="serviceSelected"
        :paginated="true"
        :per-page="perPage"
        style="padding-top: 1rem" focusable>
        <template slot-scope="props">
          <b-table-column field="name" label="Titulo" sortable>
            {{ props.row.name.length > 130 ? props.row.name.slice(0, 130) + ' ...' : props.row.name }}
          </b-table-column>
          <b-table-column v-if="props.row.client" field="name" label="Cliente">
            {{ props.row == undefined ? undefined : props.row.client.name }}
          </b-table-column>
          <b-table-column field="created_at" label="Registro" sortable>
            {{ parseDate(props.row.created_at) }}
          </b-table-column>
          <b-table-column field="created_at" label="Previsão">
            {{ props.row.forecast ? parseDate(props.row.forecast) :'N. I. ' }}
          </b-table-column>
          <b-table-column field="name" label="Situação" sortable>
            {{ props.row.status.abbreviation }}
          </b-table-column>
          <b-table-column field="link" label="Link" v-if="options.link">
            <router-link :to="{ name: 'service', params: { service_id: props.row.id } }">
              link
            </router-link>
          </b-table-column>
        </template>
        <template slot="empty">
          <section class="section">
            <div class="empty has-text-grey has-text-centered">
              <p>
              <b-icon icon="frown" size="is-large"></b-icon>
              </p>
              <p>Nenhum serviço encontrado.</p>
              <p v-if="filterActive">Seus filtros estão ativos.</p>
            </div>
          </section>
        </template>
      </b-table>
    </section>
  </div>
</template>

<script src="./serviceTable.js"></script>
