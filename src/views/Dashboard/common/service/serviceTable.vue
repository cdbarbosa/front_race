<template>
  <div class="content" id="serviceTable">
    <section class="__secundary">
      <div class="tableContainer">
        <header>
          <h4>Serviços</h4>
          <slot name="search"></slot>
          <span @click="searchQuery = ''">
            <i class="fas fa-backspace"></i>
          </span>
          <div id="edit" @click="$emit('filter')">
            <b-icon icon="cog"></b-icon>
          </div>
        </header>
      </div>
      <b-table :current-page.sync="currentPage" :data="resources" :selected.sync="selected" :paginated="true" @update:selected="$emit('update', $event)"  :per-page="perPage" focusable style="padding-top: 1rem">
        <template slot-scope="props">
          <b-table-column field="name" label="Titulo" sortable>
            {{ props.row.name }}
          </b-table-column>
          <b-table-column v-if="props.row.client" field="name" label="Cliente">
            {{ props.row == undefined ? undefined : props.row.client.name }}
          </b-table-column>
          <b-table-column field="created_at" label="Registro" sortable>
            {{ parseDate(props.row.created_at) }}
          </b-table-column>
          <b-table-column field="created_at" label="Previsão">
            {{ parseDate(props.row.forecast) }}
          </b-table-column>
          <b-table-column field="name" label="Situação" sortable>
            {{ props.row.status.abbreviation }}
          </b-table-column>
        </template>
        <template slot="empty">
          <section class="section">
            <div class="empty has-text-grey has-text-centered">
              <p>
              <b-icon icon="frown" size="is-large"></b-icon>
              </p>
              <p>Nenhum serviço cadastrado.</p>
            </div>
          </section>
        </template>
      </b-table>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import dataTable from '../../../../mixins/dataTable.js'
export default {
  name: 'serviceTable',
  mixins: [dataTable],
  computed: {
    serviceSelected: {
      get () {
        return this.$store.getters.serviceSelected
      },
      set (service) {
        this.setServiceSelected(service)
      }
    }
  },
  watch: {
  },
  methods: {
    ...mapActions([
      'setServiceSelected'
    ])
  }
}
</script>
