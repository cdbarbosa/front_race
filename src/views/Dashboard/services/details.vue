<template>
  <div id="vueDetails">
    <div class="details-information" v-if="serviceSelected !== undefined">
      <div class="description-service">
        <h2>Detalhes</h2>
        <div class="info-service">
          <b-field label="Serviço">
            <b-input v-model="serviceSelected.name"></b-input>
          </b-field>
          <b-field label="ID">
            <b-input v-model="serviceSelected.id"></b-input>
          </b-field>
        </div>
        <hr>
        <div class="rhOfService" v-if="selected !== undefined" >
          <div class="infoRh">
            <b-field label="RH">
              <b-input v-model="selected.name" placeholder="Lorem ipsum dolor sit amet"></b-input>
            </b-field>
            <b-field label="ID">
              <b-input v-model="selected.id" placeholder="2"></b-input>
            </b-field>
          </div>
          <b-field label="Especificidade e Serviço">
            <textarea v-model="selected.observations" name="" id="" cols="55" rows="4"></textarea>
          </b-field>
          <div class="hours">
            <b-field label="Custo">
              <b-input v-model="selected.cost" placeholder="ORCA - Orçamento (em aberto)"></b-input>
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
    <createRh :open.sync="isCreateModalActive"></createRh>
  </div>
</template>
<script>
import createRh from '../rh/create.vue'
import { header } from '../../../config/index.js'
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
export default {
  name: 'vueDetails',
  data () {
    return {
      radio: '',
      data: [],
      rh_id: '',
      detachRh_id: '',
      isModalDesactive: false,
      isModalActive: false,
      isCreateModalActive: false,
      serviceSelected: undefined,
      rhsService: undefined,
      rhSelected: undefined
    }
  },
  computed: {
    ...mapGetters([
      'rhs'
    ]),
    selected: {
      get () {
        return this.rhSelected ? this.rhSelected : this.rhsService[0]
      },
      set (newValue) {
        this.rhSelected = newValue
      }
    }
  },
  beforeMount () {
    this.getRhs(this)
    this.$http.get(this.$api({ target: `service/${this.$route.params.id}` }), {
      headers: header()
    }).then(response => {
      console.log(response)
      this.serviceSelected = response.data
      this.rhsService = this.serviceSelected.rhs
      // console.log(this.rhsService)
    })
  },
  methods: {
    ...mapActions([
      'getRhs'
    ]),
    parseDate (date) {
      return moment().format('DD/MM/YYYY')
    },
    getRhService () {
      this.$http.get(this.$api({ target: `service/${this.$route.params.id}` }), {
        headers: header()
      }).then(response => {
        this.serviceSelected = response.data
        this.rhsService = this.serviceSelected.rhs
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
      this.isCreateModalActive = false
      this.isModalActive = true
    },
    attachRhService () {
      if (this.rh_id !== '') {
        let data = {
          rh_id: this.rh_id,
          service_id: this.serviceSelected.id
        }
        this.$http.post(this.$api({ target: 'rhservice' }), data, {
          headers: header()
        }).then(() => {
          this.getRhService()
          this.$router.push({ name: 'vueDetails', params: { id: this.serviceSelected.id } })
        })
        this.isCreateModalActive = false
        this.isModalActive = false
      }
    },
    detachRh (id) {
      let data = {
        rh_id: id,
        service_id: this.serviceSelected.id
      }
      this.$http.post(this.$api({ target: 'rhsservice' }), data, {
        headers: header()
      }).then(() => {
        this.getRhService()
        this.$router.push({ name: 'vueDetails', params: { id: this.serviceSelected.id } })
      })
      this.isModalDesactive = false
    }
  },
  components: {
    createRh
  }
}
</script>
