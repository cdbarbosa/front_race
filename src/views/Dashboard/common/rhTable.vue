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
        <div id="edit" v-if="filters" @click="isFilterModalActive = true">
          <b-icon icon="cog"></b-icon>
        </div>
      </header>
      <b-table :data="rhs" :paginated="true" :selected.sync="selected" :per-page="5" @update:selected="$emit('update', [$event, true])" focusable style="padding-top: 1rem">
        <template slot-scope="props">
          <b-table-column field="name" label="NOME" sortable>
            {{ props.row.name }}
          </b-table-column>
          <b-table-column field="created_at" label="Custo">
            {{ props.row.cost }}
          </b-table-column>
          <b-table-column field="user.email" label="Horas">
            {{ parseDate(props.row.created_at) }}
          </b-table-column>
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
            <button @click="search(searchRh)">Ok</button>
            <button @click="resetFilters">Resetar</button>
          </div>
        </section>
      </div>
    </b-modal>
  </section>
</template>
<script>
import moment from 'moment'
import createRh from '../rh/create.vue'
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
      operator: [
        '>',
        '<',
        '='
      ],
      isModalActive: false,
      rhSelected: undefined,
      rhCreated: undefined,
      isCost: false,
      isCity: false,
      isExperience: false,
      searchRh: undefined,
      basicFilter: [
        {
          key: 'cost',
          label: 'Custo',
          value: undefined,
          active: false,
          operator: undefined
        },
        {
          key: 'competencies',
          label: 'Competências',
          value: undefined,
          active: false,
          operator: undefined
        },
        {
          key: 'activity',
          label: 'Atividades',
          value: undefined,
          active: false,
          operator: undefined
        },
        {
          key: 'experience',
          label: 'Experiências',
          value: undefined,
          active: false,
          operator: undefined
        },
        {
          key: 'active',
          label: 'Ativo',
          value: undefined,
          active: false,
          operator: undefined
        }
      ],
      academicFilter: [
        {
          key: 'area',
          label: 'Área',
          value: undefined,
          active: false
        },
        {
          key: 'titulation',
          label: 'Titulação',
          value: undefined,
          active: false
        }
      ],
      isFilterModalActive: false
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
      if (newVal === '') {
        this.getRhs(this)
      } else {
        this.search(newVal)
      }
    }, 500)
  },
  methods: {
    ...mapActions([
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
      })
      this.academicFilter.forEach(function (item, index) {
        item.active = false
        item.value = undefined
      })
      this.getRhs(this)
    },
    attachRhService () {
      this.rhSelected = undefined
      let data = {
        rh_id: this.selected.id,
        service_id: this.service_id
      }
      this.$http.post(this.$api({ target: 'rhservice' }), data, {
        headers: header()
      }).then(response => {
        console.log(response)
        this.$emit('update', [true])
        // this.getRhService()
        // this.isModalActive = false
      })
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
        this.changeRh(response.data)
        this.isFilterModalActive = false
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
