<template>
  <div id="filterClient" style="padding: 1rem">
    <h3>Fitros Básicos</h3>
    <section class="content">
      <section>
        <div class="box basic-filter" v-for="(filter) in userFilters" :key="filter.key">
            <b-checkbox v-model="filter.active" :native-value="filter.key">
              {{ filter.label }}
            </b-checkbox>
            <span v-if="filter.active" >
              <b-switch v-if="filter.key === 'active'" v-model="filter.value">{{ filter.value ? 'Ativo' : 'Inativo' }}</b-switch>
              <b-input  v-else placeholder="Text here..." v-model="filter.value"></b-input>
            </span>
          </div>
        <div class="box basic-filter" v-for="(filter, index) in clientFilters" :key="index">
          <b-checkbox v-model="filter.active" :native-value="filter.key">
            {{ filter.label }}
          </b-checkbox>
          <b-input placeholder="Text here..." v-if="filter.active === true" v-model="filter.value"></b-input>
        </div>
      </section>
      <section>
        <div class="box basic-filter" v-for="(filter, index) in addressFilters" :key="index">
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
export default {
  name: 'filterClient',
  data () {
    return {
      searchQuery: null,
      userFilters: [
        {
          key: 'active',
          label: 'Ativo',
          value: null,
          active: false,
          operator: null
        }
      ],
      addressFilters: [
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
      clientFilters: [
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
        }
      ]
    }
  },
  methods: {
    resetFilters () {
      this.userFilters.forEach(function (item) {
        item.active = false
        item.value = undefined
        item.operator = null
      })
      this.clientFilters.forEach(function (item) {
        item.active = false
        item.value = undefined
        item.operator = null
      })
      this.addressFilters.forEach(function (item) {
        item.active = false
        item.value = undefined
        item.operator = null
      })
      this.$emit('reset')
    },
    searchClient (name) {
      let data = {
        search: name,
        addressFilters: this.addressFilters.filter(f => f.active),
        userFilters: this.userFilters.filter(f => f.active),
        clientFilters: this.clientFilters.filter(f => f.active)
      }
      this.$emit('filter', data)
      this.isFilterModal = false
    }
  }
}
</script>
