<template>
  <div id="filterClient" style="padding: 1rem">
    <h3>Fitros Básicos</h3>
    <section class="content">
      <section>
        <div class="box basic-filter" v-for="(filter, index) in basicFilter" :key="index">
          <b-checkbox v-model="filter.active" :native-value="filter.key">
            {{ filter.label }}
          </b-checkbox>
          <b-input placeholder="Text here..." v-if="filter.active === true" v-model="filter.value"></b-input>
        </div>
      </section>
      <section>
        <div class="box basic-filter" v-for="(filter, index) in filters" :key="index">
          <b-checkbox v-model="filter.active" :native-value="filter.key">
            {{ filter.label }}
          </b-checkbox>
          <b-input placeholder="Text here..." v-if="filter.active === true" v-mask="filter.key == 'document' ? ['###.###.###-##', '##.###.###/####-##'] : undefined" v-model="filter.value"></b-input>
        </div>
      </section>
    </section>
    <div class="bottonFilter" style="padding: 1rem">
      <button @click="searchClient(searchQuery)" style="margin-right: 1rem">Ok</button>
      <button @click="resetFilters">Resetar</button>
    </div>
  </div>
</template>
<script>
import { header } from '../../../config/index.js'
export default {
  name: 'filterClient',
  data () {
    return {
      searchQuery: null,
      basicFilter: [
        {
          key: 'active',
          label: 'Ativo',
          value: null,
          active: false
        },
        {
          key: 'state',
          label: 'Estado',
          value: null,
          active: false
        },
        {
          key: 'city',
          label: 'Cidade',
          value: null,
          active: false
        }
      ],
      filters: [
        {
          key: 'observations',
          label: 'Observações',
          value: null,
          active: false
        },
        {
          key: 'activity',
          label: 'Atividades',
          value: null,
          active: false
        },
        {
          key: 'document',
          label: 'CPF/CNPJ',
          value: null,
          active: false
        }
      ]
    }
  },
  methods: {
    resetFilters () {
      this.basicFilter.forEach(function (item) {
        item.active = false
        item.value = undefined
        item.operator = null
      })
      this.$emit('reset')
    },
    searchClient (name) {
      let data = {
        search: name,
        filters: this.filters.filter(f => f.active),
        basicFilter: this.basicFilter.filter(f => f.active)
      }
      this.$emit('filter', data)
      this.isFilterModal = false
    }
  }
}
</script>
