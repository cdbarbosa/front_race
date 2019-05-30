<template>
  <div id="filterClient" style="padding: 1rem">
    <h3>Fitros Básicos</h3>
    <section class="content">
      <section>
        <div class="box basic-filter" v-for="(filter, index) in userFilters" :key="filter.key">
          <b-checkbox @input="parseFilters([index, 'userFilters', 'active',  $event])" :value="filter.active">
            {{ filter.label }}
          </b-checkbox>
          <span v-if="filter.active" >
            <b-switch v-if="filter.key === 'active'" :value="filter.value" @input="parseFilters([index, 'userFilters', 'value', $event])">{{ filter.value ? 'Ativo' : 'Inativo' }}</b-switch>
            <b-input  v-else placeholder="Text here..." :value="filter.value" @input="parseFilters([index, 'userFilters', 'value', $event])"></b-input>
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
        <div class="box basic-filter" v-for="(filter, index) in clientFilters" :key="filter.key">
          <b-checkbox @input="parseFilters([index, 'clientFilters', 'active',  $event])" :value="filter.active">
            {{ filter.label }}
          </b-checkbox>
          <span v-if="filter.active" >
            <b-input placeholder="Text here..." :value="filter.value" @input="parseFilters([index, 'clientFilters', 'value', $event])"></b-input>
          </span>
        </div>
      </section>
    </section>
    <div class="bottonFilter" style="padding: 1rem">
      <button @click="$emit('filter')" style="margin-right: 1rem">Ok</button>
      <button @click="$emit('restore')">Resetar</button>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'filterClient',
  computed: {
    userFilters () {
      return this.$store.getters.clientFilters.userFilters
    },
    addressFilters () {
      return this.$store.getters.clientFilters.addressFilters
    },
    clientFilters () {
      return this.$store.getters.clientFilters.clientFilters
    }
  },
  methods: {
    ...mapActions([
      'setClientFilters'
    ]),
    parseFilters (payload) {
      this.setClientFilters(payload)
    }
  }
}
</script>
