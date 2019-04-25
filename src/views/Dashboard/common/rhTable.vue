<template>
  <section class="__secundary">
    <div :class="[{create: create}, 'tableContainer']">
      <header>
        <h4>
          <slot name="title"></slot>
        </h4>
        <button v-if="create" class="buttons is-primary" @click="isModalActive = true">Cadastrar novo Rh</button>
        <b-field>
          <b-input placeholder="Procurar" v-model="searchRh"></b-input>
        </b-field>
        <span @click="searchRh = ''">
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
          <b-table-column field="user.email" label="Email">
            {{ props.row.user.email }}
          </b-table-column>
          <b-table-column field="cost" label="Custo" sortable>
            {{'R$ ' + props.row.cost }}
          </b-table-column>
        </template>
        <template slot="empty">
          <section class="section">
            <div class="empty has-text-grey has-text-centered">
              <p>
                <b-icon icon="frown" size="is-large"></b-icon>
              </p>
              <p>Nothing here.</p>
            </div>
          </section>
        </template>
      </b-table>
      <button v-if="attach" @click="isAttachModalOpen = true">Associar esse RH</button>
      <b-modal :active.sync="isModalActive">
        <component :is="parseModal()" @rhCreated="rhCreated = true" @creationFailed="rhCreated = false"></component>
      </b-modal>
    </div>
    <b-modal :active.sync="isFilterModalActive">
      <div class="content" style="padding: 1rem">
        <section>
          <h3>Fitros Básicos</h3>
          <div class="box basic-filter" v-for="(filter, index) in basicFilter" :key="index">
            <b-checkbox v-model="filter.active" :native-value="filter.key">
              {{ filter.label }}
            </b-checkbox>
            <b-input placeholder="Text here..." v-if="filter.active === true" v-model="filter.value"></b-input>
            <b-select v-if="filter.active && filter.key == 'cost'" v-model="filter.operator">
              <option
                v-for="option in operator"
                :value="option"
                :key="option">
              {{ option }}
              </option>
            </b-select>
          </div>
        </section>
        <section>
          <h3>Fitros Acadêmicos</h3>
          <div class="box academic-filter" v-for="(filter, index) in academicFilter" :key="index">
            <b-checkbox v-model="filter.active" :native-value="filter.key">
              {{ filter.label }}
            </b-checkbox>
            <b-input placeholder="Text here..." v-if="filter.active === true" v-model="filter.value"></b-input>
          </div>
          <div class="bottonFilter">
            <button @click="filter(searchRh); isFilterModalActive = false">Ok</button>
            <button @click="resetFilters; isFilterModalActive = false">Resetar</button>
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
              <b-input v-model="rhServiceFields.cost"></b-input>
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
import createRh from '../rhs/create.vue'
import success from './create-messages/success'
import error from './create-messages/error'
import _ from 'lodash'
import { mapActions } from 'vuex'
import { header } from '../../../config/index.js'
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
      searchRh: null,
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
          key: 'activity',
          label: 'Atividades',
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
        cost: null,
        hours: null,
        goal: null
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
    }
  },
  watch: {
    searchRh: _.debounce(function (newVal, oldVal) {
      this.rhSelected = undefined
      if (newVal === '' && newVal === oldVal) {
        this.getRhs(this).then(rhs => {
          this.setRhs(rhs)
        })
      } else {
        this.filter(newVal)
      }
    }, 500)
  },
  methods: {
    ...mapActions([
      'setRhs',
      'getRhs',
      'changeRh'
    ]),
    parseDate (date) {
      return moment(date).format('DD/MM/YYYY')
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
      this.basicFilter.forEach(function (item, index) {
        item.active = false
        item.value = undefined
        item.operator = null
      })
      this.academicFilter.forEach(function (item, index) {
        item.active = false
        item.value = undefined
      })
      this.getRhs(this)
      console.log(this.rhs)
      this.rhSelected = this.rhs[0]
    },
    filter (title) {
      let data = {
        search: title,
        basicFilter: this.basicFilter.filter(f => f.active),
        academicFilter: this.academicFilter.filter(f => f.active)
      }
      this.$emit('filter', data)
    },
    search (title) {
      let data = {
        search: title,
        basicFilter: this.basicFilter.filter(f => f.active),
        academicFilter: this.academicFilter.filter(f => f.active)
      }
      this.$http.post(this.$api({ target: 'rh' }), data, {
        headers: header()
      }).then(response => {
        console.log(response)
        this.rhs = response.data // can't be. Have to do something else
        this.changeRh(response.data)
        this.isFilterModalActive = false
        console.log(this.rhs)
      })
    }
  },
  components: {
    createRh,
    success,
    error
  }
}
</script>
