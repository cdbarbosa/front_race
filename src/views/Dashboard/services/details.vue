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
        <div class="infoRh">
          <b-field label="RH">
            <b-input v-model="rhsService[0].name" placeholder="Lorem ipsum dolor sit amet"></b-input>
          </b-field>
          <b-field label="ID">
            <b-input v-model="rhsService[0].id" placeholder="2"></b-input>
          </b-field>
        </div>
        <b-field label="Especificidade e Serviço">
          <textarea v-model="rhsService[0].observations" name="" id="" cols="55" rows="4"></textarea>
        </b-field>
        <div class="hours">
          <b-field label="Custo">
            <b-input v-model="rhsService[0].cost" placeholder="ORCA - Orçamento (em aberto)"></b-input>
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
          <button class="is-primary">Desassociar esse RH</button>
        </div>
      </div>
      <div class="description">
        <div class="serviceTable">
          <div class="headerTable">
            <h4>RHs responsáveis</h4>
            <button class="buttons is-primary" @click="getRhNotService">Adicionar novo RH ao serviço</button>
          </div>
          <b-table :data="rhsService" :paginated="true" :per-page="5" focusable style="padding-top: 1rem">
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
        <button class="buttons is-primary" @click="attachRhService()">Adicionar</button>
      </div>
    </b-modal>
  </div>
</template>
<script>
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
      isModalActive: false,
      serviceSelected: undefined,
      rhsService: undefined,
      allRhs: undefined
    }
  },
  computed: {
    ...mapGetters([
      'rhs'
    ]),
    selected: {
      get () {
        return this.allRhs ? this.allRhs : this.rhs[0]
      },
      set (newValue) {
        console.log(newValue)
      }
    }
  },
  beforeMount () {
    this.getRhs(this)
    this.$http.get(this.$api({ target: `service/${this.$route.params.id}` }), {
      headers: header()
    }).then(response => {
      this.serviceSelected = response.data
      this.rhsService = this.serviceSelected.rhs
    })
  },
  methods: {
    ...mapActions([
      'getRhs'
    ]),
    parseDate (date) {
      return moment().format('DD/MM/YYYY')
    },
    getRhNotService () {
      let diferent = []
      let rh = []
      this.rhsService.forEach(function each (item, index, array) {
        rh.push(item.name)
      })
      this.rhs.forEach(function each (item, index, array) {
        rh.includes(item.name) ? diferent = [] : diferent.push(item)
      })
      this.data = diferent
      this.isModalActive = true
    },
    attachRhService () {
      let data = {
        rh_id: this.rh_id,
        service_id: this.serviceSelected.id
      }
      this.$http.post(this.$api({ target: 'rhservice' }), data, {
        headers: header()
      }).then(() => {
        this.$router.push({ name: 'vueDetails', params: { id: this.serviceSelected.id } })
      })
      this.isModalActive = false
    }
  }
}
</script>
