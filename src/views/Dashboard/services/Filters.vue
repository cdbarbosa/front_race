<template>
  <div id="filterService" style="padding: 1rem">
    <h3>Fitros Básicos</h3>
    <section class="content">
      <section>
        <div class="box basic-filter date" v-for="(filter, index) in serviceFilters" :key="filter.key">
          <b-checkbox @input="parseFilters([index, 'serviceFilters', 'active',  $event])" :value="filter.active">
            {{ filter.label }}
          </b-checkbox>
          <span v-if="filter.active">
            <span v-if="['created_at', 'forecast', 'delivered'].indexOf(filter.key) !== -1" class="data-style">
              <b-datepicker :value="filter.value"  @input="parseFilters([index, 'serviceFilters', 'value', $event])" :date-formatter="(date) => date.toLocaleDateString('pt-BR')" name="date" editable></b-datepicker>
              <b-select @input="parseFilters([index, 'serviceFilters', 'operator', $event])">
                <option v-for="(operator, index) in operators" :key="index"> {{ operator }}</option>
              </b-select>
            </span>
            <b-input v-else :value="filter.value" @input="parseFilters([index, 'serviceFilters', 'value', $event])"></b-input>
          </span>
        </div>
        <div class="box basic-filter" v-for="(filter, index) in clientFilters" :key="filter.key">
          <b-checkbox @input="parseFilters([index, 'clientFilters', 'active', $event])" :value="filter.active">
            {{ filter.label }}
          </b-checkbox>
          <span v-if="filter.active">
            <b-input :value="filter.value" @input="parseFilters([index, 'clientFilters', 'value', $event])"></b-input>
          </span>
        </div>
        <div class="box basic-filter" v-for="(filter, index) in statusFilters" :key="filter.key">
          <b-checkbox @input="parseFilters([index, 'statusFilters', 'active', $event])" :value="filter.active">
            {{ filter.label }}
          </b-checkbox>
          <span v-if="filter.active">
            <b-input :value="filter.value" @input="parseFilters([index, 'statusFilters', 'value', $event])"></b-input>
          </span>
        </div>
      </section>
      <!-- <section> -->
        <!-- <div class="box basic&#45;filter" v&#45;for="(filter) in clientFilters" :key="filter.key"> -->
        <!--   <b&#45;checkbox v&#45;model="filter.active" :native&#45;value="filter.key"> -->
        <!--     {{ filter.label }} -->
        <!--   </b&#45;checkbox> -->
        <!--   <b&#45;input placeholder="Text here..." v&#45;if="filter.active === true &#38;&#38; (filter.key !== 'created_at' &#38;&#38; filter.key !== 'forecast' &#38;&#38; filter.key !== 'delivered')" v&#45;model="filter.value"></b&#45;input> -->
        <!--   <b&#45;datepicker  v&#45;if="(filter.key === 'created_at' || filter.key === 'forecast' || filter.key === 'delivered') &#38;&#38; filter.active === true" v&#45;model="filter.value"  :month&#45;names="months" :day&#45;names="days" :date&#45;parser="parseDate(filter.value)" v&#45;mask="'##/##/####'"  name="date" required></b&#45;datepicker> -->
        <!-- </div> -->
        <!-- <div class="box basic&#45;filter" v&#45;for="(filter) in statusFilter" :key="filter.key"> -->
        <!--   <b&#45;checkbox v&#45;model="filter.active" :native&#45;value="filter.key"> -->
        <!--     {{ filter.label }} -->
        <!--   </b&#45;checkbox> -->
        <!--   <b&#45;input placeholder="Text here..." v&#45;if="filter.active === true &#38;&#38; (filter.key !== 'created_at' &#38;&#38; filter.key !== 'forecast' &#38;&#38; filter.key !== 'delivered')" v&#45;model="filter.value"></b&#45;input> -->
        <!--   <b&#45;datepicker  v&#45;if="(filter.key === 'created_at' || filter.key === 'forecast' || filter.key === 'delivered') &#38;&#38; filter.active === true" v&#45;model="filter.value"  :month&#45;names="months" :day&#45;names="days" :date&#45;parser="parseDate(filter.value)" v&#45;mask="'##/##/####'"  name="date" required></b&#45;datepicker> -->
        <!-- </div> -->
      <!-- </section> -->
      <!-- <section> -->
      <!--   <div class="box basic&#45;filter" v&#45;for="(filter) in serviceFilters" :key="filter.key"> -->
      <!--     <b&#45;checkbox v&#45;model="filter.active" :native&#45;value="filter.key"> -->
      <!--       {{ filter.label }} -->
      <!--     </b&#45;checkbox> -->
      <!--     <b&#45;input placeholder="Text here..." v&#45;if="filter.active === true" v&#45;model="filter.value"></b&#45;input> -->
      <!--   </div> -->
      <!-- </section> -->
    </section>
    <div class="bottonFilter" style="padding: 1rem">
      <button @click="filter" style="margin-right: 1rem">Ok</button>
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
      operators: ['<', '>', '=']
    }
  },
  computed: {
    serviceFilters () {
      return this.$store.getters.serviceFilters.serviceFilters
    },
    statusFilters () {
      return this.$store.getters.serviceFilters.statusFilters
    },
    clientFilters () {
      return this.$store.getters.serviceFilters.clientFilters
    }
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
    filter (name) {
      this.$emit('filter')
    }
  }
}
</script>
