<template>
  <div id="filterService" style="padding: 1rem">
    <h3>Fitros Básicos</h3>
    <section class="content">
      <section>
        <div class="box basic-filter" v-for="(filter) in clientFilters" :key="filter.key">
          <b-checkbox v-model="filter.active" :native-value="filter.key">
            {{ filter.label }}
          </b-checkbox>
          <b-input placeholder="Text here..." v-if="filter.active === true && (filter.key !== 'created_at' && filter.key !== 'forecast' && filter.key !== 'delivered')" v-model="filter.value"></b-input>
          <b-datepicker  v-if="(filter.key === 'created_at' || filter.key === 'forecast' || filter.key === 'delivered') && filter.active === true" v-model="filter.value"  :month-names="months" :day-names="days" :date-parser="parseDate(filter.value)" v-mask="'##/##/####'"  name="date" required></b-datepicker>
        </div>
        <div class="box basic-filter" v-for="(filter) in statusFilter" :key="filter.key">
          <b-checkbox v-model="filter.active" :native-value="filter.key">
            {{ filter.label }}
          </b-checkbox>
          <b-input placeholder="Text here..." v-if="filter.active === true && (filter.key !== 'created_at' && filter.key !== 'forecast' && filter.key !== 'delivered')" v-model="filter.value"></b-input>
          <b-datepicker  v-if="(filter.key === 'created_at' || filter.key === 'forecast' || filter.key === 'delivered') && filter.active === true" v-model="filter.value"  :month-names="months" :day-names="days" :date-parser="parseDate(filter.value)" v-mask="'##/##/####'"  name="date" required></b-datepicker>
        </div>
      </section>
      <section>
        <div class="box basic-filter" v-for="(filter) in serviceFilters" :key="filter.key">
          <b-checkbox v-model="filter.active" :native-value="filter.key">
            {{ filter.label }}
          </b-checkbox>
          <b-input placeholder="Text here..." v-if="filter.active === true" v-model="filter.value"></b-input>
        </div>
      </section>
      <!-- <section> -->
      <!--   <div class="box basic&#45;filter" v&#45;for="(filter, index) in serviceFilters" :key="index"> -->
      <!--     <b&#45;checkbox v&#45;model="filter.active" :native&#45;value="filter.key"> -->
      <!--       {{ filter.label }} -->
      <!--     </b&#45;checkbox> -->
      <!--     <b&#45;input placeholder="Text here..." v&#45;if="filter.active === true" v&#45;model="filter.value"></b&#45;input> -->
      <!--   <div class="box basic&#45;filter" v&#45;for="(filter, index) in serviceFilters" :key="filter.key"> -->
      <!--     <b&#45;checkbox @input="parseFilters([index, 'serviceFilters', 'active',  $event])" :value="filter.active"> -->
      <!--       {{ filter.label }} -->
      <!--     </b&#45;checkbox> -->
      <!--     <span v&#45;if="filter.active"> -->
      <!--       <b&#45;datepicker v&#45;if="['created_at', 'forecast', 'delivered'].indexOf(filter.key) !== &#45;1"  @input="parseFilters([index, 'serviceFilters', 'value', $event])" :date&#45;formatter="(date) => date.toLocaleDateString('pt&#45;BR')" placeholder="Previsão" name="date" editable></b&#45;datepicker> -->
      <!--       <b&#45;input v&#45;else placeholder="Text here..." :value="filter.value" @input="parseFilters([index, 'serviceFilters', 'value', $event])"></b&#45;input> -->
      <!--     </span> -->
      <!--   </div> -->
      <!-- </section> -->
    </section>
    <div class="bottonFilter" style="padding: 1rem">
      <button @click="searchClient(searchQuery)" style="margin-right: 1rem">Ok</button>
      <!-- <button @click="resetFilters">Resetar</button> -->
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'filterService',
  data () {
    return {
      searchQuery: null,
      months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      days: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
      clientFilters: [
        {
          key: 'client',
          label: 'Cliente',
          value: null,
          active: false
        }
      ],
      serviceFilters: [
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
        },
        {
          key: 'profit',
          label: 'Margem',
          value: null,
          active: false
        },
        {
          key: 'description',
          label: 'Observações',
          value: null,
          active: false
        }
      ],
      statusFilter: [
        {
          key: 'status',
          label: 'Situação',
          value: null,
          active: false
        }
      ]
      // days: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']
    }
  },
  computed: {
    // serviceFilters () {
    //   return this.$store.getters.serviceFilters.serviceFilters
    // }
  },
  methods: {
    ...mapActions([
      'setServiceFilters'
    ]),
    parseDate (date) {
      var data = new Date(date)
      return data.toLocaleDateString('pt-BR')
    },
    parseFilters (payload) {
      this.setServiceFilters(payload)
    },
    searchClient (name) {
      let data = {
        search: name,
        clientFilters: this.clientFilters.filter(f => f.active),
        serviceFilters: this.serviceFilters.filter(f => f.active),
        statusFilter: this.statusFilter.filter(f => f.active)
      }
      this.$emit('filter', data)
      this.isFilterModal = false
    }
  }
}
</script>
