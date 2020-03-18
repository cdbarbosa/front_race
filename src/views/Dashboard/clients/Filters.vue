<template>
  <div id="filterClient" style="padding: 1rem">
    <h3>Básicos</h3>
    <section class="content">
      <section>
        <div class="box basic-filter">
          <b-checkbox @input="parseFilters([2, 'clientFilters', 'active',  $event])" :value="statusFilter.active">
            {{ statusFilter.label }}
          </b-checkbox>
          <span v-if="statusFilter.active">
              <b-field>
                <b-radio @input="parseFilters([2, 'clientFilters', 'value', $event])" :value="statusFilter.value" :native-value="1">
                  Completo
                </b-radio>
                <b-radio @input="parseFilters([2, 'clientFilters', 'value', $event])" :value="statusFilter.value" :native-value="0">
                  Incompleto
                </b-radio>
              </b-field>
          </span>
        </div>
        <div class="box basic-filter" v-for="(filter, index) in userFilters" :key="filter.key">
          <b-checkbox @input="parseFilters([index, 'userFilters', 'active',  $event])" :value="filter.active">
            {{ filter.label }}
          </b-checkbox>
          <span v-if="filter.active" >
            <b-field v-if="filter.key === 'active'" >
              <b-radio @input="parseFilters([index, 'userFilters', 'value', $event])" :value="filter.value" :native-value="1">
                Ativo
              </b-radio>
              <b-radio @input="parseFilters([index, 'userFilters', 'value', $event])" :value="filter.value" :native-value="0">
                Inativo
              </b-radio>
            </b-field>
            <!-- <b&#45;switch :value="filter.value" @input="parseFilters([index, 'userFilters', 'value', $event ? 1 : 0])">{{ filter.value ? 'Ativo' : 'Inativo' }}</b&#45;switch> -->
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
          <b-checkbox @input="parseFilters([index, 'clientFilters', 'active',  $event])" :value="filter.active" >
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
    statusFilter () {
      return this.$store.getters.clientFilters.clientFilters[2]
    },
    userFilters () {
      return this.$store.getters.clientFilters.userFilters
    },
    addressFilters () {
      return this.$store.getters.clientFilters.addressFilters
    },
    clientFilters () {
      let b = this.$store.getters.clientFilters.clientFilters
      return b.slice(0, 2)
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
