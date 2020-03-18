<template>
  <section class="__secundary" id="detailsTable">
    <div :class="[{create: create}, 'tableContainer']">
      <header class="headerDetails">
        <h4>
          <slot name="title"></slot>
        </h4>
        <b-field>
          <b-input placeholder="Procurar" v-model="searchDetail"></b-input>
        </b-field>
        <span @click="resetFilters">
          <i class="fas fa-backspace"></i>
        </span>
        <div id="edit" v-if="filters" @click="isFilterModalActive = true">
          <b-icon icon="cog"></b-icon>
        </div>
      </header>
      <b-table :data="rhs ? rhs : []" :paginated="true" :selected.sync="selected" :per-page="5" @update:selected="$emit('update', [$event, true])" focusable style="padding-top: 1rem">
        <template slot-scope="props">
          <b-table-column field="name" label="NOME" sortable>
            {{ props.row.name }}
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
      <b-modal :active.sync="isModalActive">
        <component :is="parseModal()" @rhCreated="rhCreated = true" @creationFailed="rhCreated = false"></component>
      </b-modal>
    </div>
    <b-modal :active.sync="isFilterModalActive">
      <div class="content" style="padding: 1rem">
        <section>
          <h3>Fitros Básicos</h3>
          <div class="box basic-filter" v-for="(filter, index) in userFilters" :key="filter.key">
            <b-checkbox @input="parseFilters([index, 'userFilters', 'active',  $event])" :value="filter.active">
              {{ filter.label }}
            </b-checkbox>
            <span v-if="filter.active" >
              <b-switch v-if="filter.key === 'active'" :value="filter.value" @input="parseFilters([index, 'userFilters', 'value', $event])">{{ filter.value ? 'Ativo' : 'Inativo' }}</b-switch>
              <b-input  v-else placeholder="Text here..." :value="filter.value" @input="parseFilters([index, 'userFilters', 'value', $event])"></b-input>
            </span>
          </div>
          <div class="box basic-filter" v-for="(filter, index) in rhFilters" :key="filter.key">
            <b-checkbox @input="parseFilters([index, 'rhFilters', 'active',  $event])" :value="filter.active">
              {{ filter.label }}
            </b-checkbox>
            <span v-if="filter.active" >
              <b-input placeholder="Text here..." :value="filter.value" @input="parseFilters([index, 'rhFilters', 'value', $event])"></b-input>
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
        </section>
        <section>
          <h3>Fitros Acadêmicos</h3>
          <div class="box academic-filter" v-for="(filter, index) in academicFilters" :key="index">
            <b-checkbox @input="parseFilters([index, 'academicFilters', 'active',  $event])" :value="filter.active">
              {{ filter.label }}
            </b-checkbox>
            <span v-if="filter.active">
              <b-input placeholder="Text here..." :value="filter.value" @input="parseFilters([index, 'academicFilters', 'value', $event])"></b-input>
            </span>
          </div>
          <div class="bottonFilter">
            <button @click="filter(searchRh); isFilterModalActive = false">Ok</button>
            <button @click="$emit('restore'); isFilterModalActive = false">Resetar</button>
          </div>
        </section>
      </div>
    </b-modal>
    <b-modal :active.sync="isAttachModalOpen" v-if="selected">
      <div class="" id="attachScreen">
        <h3>Associar RH</h3>
        <section>
          <article>
            <b-field label="RH">
              <b-input v-model="selected.name" disabled></b-input>
            </b-field>
            <b-field label="RH">
              <b-input v-model="selected.id" disabled></b-input>
            </b-field>
          </article>
          <article>
            <b-field label="Objetivo">
              <b-input placeholder="Qual serviço o rh irá realizar?" v-model="rhServiceFields.goal"></b-input>
            </b-field>
          </article>
          <article>
            <b-field label="Custo por Hora Padrão">
              <money class="input" :value="selected.cost" v-money="money" :masked="true" disabled></money>
            </b-field>
            <b-field label="Numero de Horas">
              <b-input  v-model="rhServiceFields.hours"></b-input>
            </b-field>
            <b-field label="Custo por Hora para o Serviço (R$)">
              <b-input type="number" step="0.01" v-model="rhServiceFields.cost"></b-input>
            </b-field>
          </article>
        </section>
        <button @click="$emit('attachRh', Object.assign(rhServiceFields, {rh_id: selected.id})); isAttachModalOpen = false">Associar</button>
      </div>
    </b-modal>
  </section>
</template>
<script>
import moment from 'moment'
import createRh from '../../rhs/create.vue'
import success from '../../common/create-messages/success'
import error from '../../common/create-messages/error'
import _ from 'lodash'
import { mapActions } from 'vuex'
moment.locale('pt-BR')
export default {
  name: 'rhTable',
  props: {
    rhs: {
      required: true,
      type: Array
    },
    create: {
      default: true
    },
    filters: {
      default: true
    },
    attach: {
      default: false
    },
    service_id: Number
  },
  data () {
    return {
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: true
      },
      operator: [
        '>',
        '<',
        '='
      ],
      isAttachModalOpen: false,
      isModalActive: false,
      rhSelected: undefined,
      rhCreated: undefined,
      isCost: false,
      isCity: false,
      isExperience: false,
      searchDetail: null,
      basicFilter: [
        {
          key: 'cost',
          label: 'Custo',
          value: null,
          active: false,
          operator: null
        },
        {
          key: 'competencies',
          label: 'Competências',
          value: null,
          active: false,
          operator: null
        },
        {
          key: 'experience',
          label: 'Experiências',
          value: null,
          active: false,
          operator: null
        },
        {
          key: 'active',
          label: 'Ativo',
          value: null,
          active: false,
          operator: null
        }
      ],
      academicFilter: [
        {
          key: 'area',
          label: 'Área',
          value: null,
          active: false
        },
        {
          key: 'titulation',
          label: 'Titulação',
          value: null,
          active: false
        }
      ],
      isFilterModalActive: false,
      rhServiceFields: {
        cost: undefined,
        hours: undefined,
        goal: undefined
      }
    }
  },
  computed: {
    selected: {
      get () {
        return this.rhSelected ? this.rhSelected : this.rhs[0]
      },
      set (newVal) {
        this.rhSelected = newVal
      }
    },
    userFilters () {
      return this.$store.getters.rhFilters.userFilters
    },
    rhFilters () {
      return this.$store.getters.rhFilters.rhFilters
    },
    addressFilters () {
      return this.$store.getters.rhFilters.addressFilters
    },
    academicFilters () {
      return this.$store.getters.rhFilters.academicFilters
    }
  },
  watch: {
    searchDetail: _.debounce(function (newVal, oldVal) {
      this.rhSelected = undefined
      if (newVal === '') {
        console.log(newVal)
        this.resetFilters()
      } else {
        this.filter(newVal)
      }
    }, 500)
  },
  methods: {
    ...mapActions([
      'getRhs',
      'changeRh'
    ]),
    filter (name) {
      let data = {
        name: name,
        userFilters: this.userFilters.filter(f => f.active),
        rhFilters: this.rhFilters.filter(f => f.active),
        addressFilters: this.addressFilters.filter(f => f.active),
        academicFilters: this.academicFilters.filter(f => f.active)
      }
      this.$emit('filter', data)
    },
    parseDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    parseFilters (payload) {
      this.setRhFilters(payload)
    },
    parseModal () {
      if (this.rhCreated === undefined) {
        return 'createRh'
      } else if (this.rhCreated === true) {
        return 'success'
      }
      return 'error'
    },
    resetFilters () {
      if (this.isFilterModalActive === false) {
        this.searchDetail = ''
      } else {
        this.basicFilter.forEach(function (item, index) {
          item.active = false
          item.value = undefined
        })
        this.academicFilter.forEach(function (item, index) {
          item.active = false
          item.value = undefined
        })
        this.isFilterModalActive = false
      }
      this.$emit('reset', 'service')
    }
  },
  components: {
    createRh,
    success,
    error
  }
}
</script>
