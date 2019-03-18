<template>
  <div id="vueDetails">
    <div class="details-information" v-if="serviceSelected !== undefined">
      <div class="description-service">
        <h2>Detalhes</h2>
        <div class="info-service">
          <b-field label="Serviço">
            <b-input v-model="title"></b-input>
          </b-field>
          <b-field label="ID">
            <b-input v-model="serviceSelected.id" disabled></b-input>
          </b-field>
        </div>
        <hr>
        <div class="rhOfService" v-if="selected !== undefined" >
          <div class="infoRh">
            <b-field label="RH">
              <b-input v-model="name" placeholder="Lorem ipsum dolor sit amet"></b-input>
            </b-field>
            <b-field label="ID">
              <b-input v-model="selected.id" placeholder="2" disabled></b-input>
            </b-field>
          </div>
          <b-field label="Especificidade e Serviço">
            <textarea v-model="competencies" name="" id="" cols="55" rows="4"></textarea>
          </b-field>
          <div class="hours">
            <b-field label="Custo">
              <b-input v-model="cost" placeholder="ORCA - Orçamento (em aberto)"></b-input>
            </b-field>
            <b-field label="Horas">
              <b-input placeholder="ORCA - Orçamento (em aberto)"></b-input>
            </b-field>
            <b-field label="Prazo">
              <b-input placeholder="ORCA - Orçamento (em aberto)"></b-input>
            </b-field>
          </div>
          <div class="cost">
            <div class="field">
              <b-checkbox>Estado</b-checkbox>
            </div>
            <button class="is-primary" @click="detachRh(selected.id)">Desassociar esse RH</button>
            <button class="is-primary" @click="isCreateModalActive = true">Cadastrar RH</button>
          </div>
        </div>
      </div>
      <div class="description">
        <div class="serviceTable">
          <div class="headerTable">
            <h4>RHs responsáveis</h4>
            <button class="buttons is-primary" @click="getRhNotService">Adicionar novo RH ao serviço</button>
          </div>
          <b-table :data="rhsService" :paginated="true" :selected.sync="selected" :per-page="5" focusable style="padding-top: 1rem">
            <template slot-scope="props">
              <b-table-column field="name" label="ID" sortable>
                {{ props.row.id }}
              </b-table-column>
              <b-table-column field="name" label="NOME" sortable>
                {{ props.row.name }}
              </b-table-column>
              <b-table-column field="created_at" label="Custo">
                {{ props.row.cost }}
              </b-table-column>
              <b-table-column field="user.email" label="Horas">
                {{ parseDate(props.row.created_at) }}
              </b-table-column>
              <b-table-column field="phone" label="Prazo">
                {{ parseDate(props.row.created_at) }}
              </b-table-column>
            </template>
          </b-table>
        </div>
        <button class="is-primary" @click="isCreateModalActive = true" v-if="rhsService.length == 0">Cadastrar RH</button>
      </div>
    </div>
    <div class="attach">
      <b-modal :active.sync="isModalActive">
        <div class="attachRh">
          <b-field label="Adicionar Rh ao serviço">
            <b-select v-model="rh_id" placeholder="Select a name">
              <option
                v-for="option in data"
                :value="option.id"
                :key="option.id">
                {{ option.name }}
              </option>
            </b-select>
          </b-field>
          <div class="buttonCreate">
            <button class="buttons is-primary" @click="attachRhService()">Adicionar</button>
          </div>
        </div>
      </b-modal>
    </div>
    <b-modal :active.sync="isCreateModalActive">
      <component :is="parseModal()" @rhCreated="rhCreated = true" @creationFailed="rhCreated = false"></component>
    </b-modal>
  </div>
</template>
<script>
import success from '../common/create-messages/success'
import error from '../common/create-messages/error'
import createRh from '../rh/create.vue'
import { header } from '../../../config/index.js'
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import _ from 'lodash'
export default {
  name: 'vueDetails',
  data () {
    return {
      data: [],
      rh_id: '',
      isModalActive: false,
      isCreateModalActive: false,
      serviceSelected: undefined,
      rhsService: undefined,
      rhSelected: undefined,
      rhCreated: undefined
    }
  },
  computed: {
    ...mapGetters([
      'rhs'
    ]),
    selected: {
      get () {
        return this.rhSelected ? this.rhSelected : (this.rhsService === undefined ? undefined : this.rhsService[0])
      },
      set (newValue) {
        this.rhSelected = newValue
      }
    },
    name: {
      get () {
        return this.selected.name
      },
      set: _.debounce(function (newVal, oldVal) {
        //
      }, 400)
    },
    title: {
      get () {
        return this.serviceSelected.name
      },
      set: _.debounce(function (newVal, oldVal) {
        //
      }, 400)
    },
    competencies: {
      get () {
        return this.selected.competencies
      },
      set: _.debounce(function (newVal, oldVal) {
        //
      }, 400)
    },
    cost: {
      get () {
        return this.selected.cost
      },
      set: _.debounce(function (newVal, oldVal) {
        //
      }, 400)
    }
  },
  watch: {
    selected (newVal) {
      this.$router.push({ name: 'vueDetails' })
    }
  },
  beforeRouteEnter (to, from, next) {
    next($this => {
      if ($this.rhSelected) next({ name: 'vueDetails', params: { rh_id: $this.rhSelected.id } })
      $this.getRhs($this)
      $this.$http.get($this.$api({ target: `service/${$this.$route.params.service_id}` }), {
        headers: header()
      }).then(response => {
        $this.serviceSelected = response.data
        $this.rhsService = $this.serviceSelected.rhs
      })
    })
  },
  methods: {
    ...mapActions([
      'getRhs',
      'updateService',
      'updateRh'
    ]),
    parseDate (date) {
      return moment().format('DD/MM/YYYY')
    },
    parseModal () {
      if (this.rhCreated === undefined) {
        return 'createRh'
      } else if (this.rhCreated === true) {
        return 'success'
      }
      return 'error'
    },
    getRhService () {
      this.$http.get(this.$api({ target: `rhServices/${this.$route.params.service_id}` }), {
        headers: header()
      }).then(response => {
        this.rhsService = response.data
      })
    },
    getRhNotService () {
      let d = []
      let diferent = []
      let rh = []
      this.rhsService.forEach(function each (item, index, array) {
        rh.push(item.name)
      })
      this.rhs.forEach(function each (item, index, array) {
        d = diferent
        rh.includes(item.name) ? diferent = d : diferent.push(item)
      })
      this.data = diferent
      this.isModalActive = true
    },
    attachRhService () {
      this.rhSelected = undefined
      if (this.rh_id !== '') {
        let data = {
          rh_id: this.rh_id,
          service_id: this.serviceSelected.id
        }
        this.$http.post(this.$api({ target: 'rhservice' }), data, {
          headers: header()
        }).then(response => {
          this.getRhService()
          this.isModalActive = false
        })
      }
    },
    detachRh (id) {
      this.rhSelected = undefined
      let data = {
        rh_id: id,
        service_id: this.serviceSelected.id
      }
      this.$http.post(this.$api({ target: 'rh-service' }), data, {
        headers: header()
      }).then(() => {
        this.getRhService()
      })
    }
  },
  components: {
    createRh,
    error,
    success
  }
}
</script>
