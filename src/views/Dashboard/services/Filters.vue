<template>
  <div id="filterService" style="padding: 1rem">
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
          <b-input placeholder="Text here..." v-if="filter.active === true" v-model="filter.value"></b-input>
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
export default {
  name: 'filterService',
  data () {
    return {
      searchQuery: null,
      basicFilter: [
        {
          key: 'client',
          label: 'Cliente',
          value: null,
          active: false
        },
        {
          key: 'created_at',
          label: 'Data registro',
          value: null,
          active: false
        },
        {
          key: 'forecast',
          label: 'Previsão',
          value: null,
          active: false
        },
        {
          key: 'delivered',
          label: 'Entrega',
          value: null,
          active: false
        }
      ],
      filters: [
        {
          key: 'profit',
          label: 'Margem',
          value: null,
          active: false
        },
        {
          key: 'status',
          label: 'Situação',
          value: null,
          active: false
        },
        {
          key: 'observations',
          label: 'Observações',
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
