<template>
  <main class="details" id="serviceDetails" v-if="service">
    <h3>
      Detalhes
      <div id="edit" @click="isEditModal = true">
        <b-icon icon="edit"></b-icon>
      </div>
    </h3>
    <div class="content">
      <section>
        <article>
          <b-field label="Serviço">
            <b-input v-model="service.name" disabled :title="service.name"></b-input>
          </b-field>
          <b-field label="ID">
            <b-input v-model="service.id" disabled></b-input>
          </b-field>
        </article>
        <hr>
        <div v-if="rhInServiceSelected" id="rh">
          <article class="__display">
            <b-field label="RH">
              <b-input v-model="rhInServiceSelected.name" disabled></b-input>
            </b-field>
            <b-field label="Comepetências">
              <div class="textarea __disabled" v-html="rhInServiceSelected.competencies"></div>
            </b-field>
            <b-field label="Atividades">
              <b-input v-model="rhInServiceSelected.pivot.goal" placeholder="Atividade" disabled></b-input>
            </b-field>
          </article>
          <article>
            <b-field label="Custo por Hora Padrão">
              <money class="input" :value="rhInServiceSelected.cost" v-money="money" :masked="true" disabled></money>
            </b-field>
            <b-field label="Numero de Horas">
              <b-input :value="rhInServiceSelected.pivot.hours" disabled></b-input>
            </b-field>
            <b-field label="Custo por Hora para o Serviço">
              <money class="input" :value="rhInServiceSelected.pivot.cost" v-money="money" :masked="true" disabled></money>
            </b-field>
          </article>
          <div class="actions">
            <button class="is-primary" @click="detachRh(rhInServiceSelected.id)" v-if="isResponseble">Desassociar esse RH</button>
          </div>
        </div>
      </section>
      <section>
        <rh-table-details @filter="filterRhInService($event)" @reset="reset($event)" :rhs="rhsInService" :selectedIndex="rhInServiceSelectedIndex" @update="setRhInServiceSelected($event[0])">
          <span slot="title">RH's Responsáveis</span>
        </rh-table-details>
        <hr>
        <rh-table
          @filter="filterRhNotInService($event)"
          :rhs="rhsNotInService"
          :selectedIndex="rhNotInServiceSelectedIndex"
          :create="false"
          :attach="true"
          :service_id="service.id"
          @update="setRhNotInServiceSelected($event[0])"
          @attachRh="isAttachModalOpen = true"
          @reset="reset($event)">
          <span slot="title">RH's</span>
        </rh-table>
      </section>
    </div>
    <b-modal :onCancel="restoreRhServiceFields" :active.sync="isAttachModalOpen" v-if="rhNotInServiceSelected">
      <h3>Associar RH</h3>
      <form id="attachForm" @submit.prevent="attachRhService">
        <div class="content">
          <section>
            <article>
              <b-field label="RH">
                <b-input v-model="rhNotInServiceSelected.name" disabled></b-input>
              </b-field>
              <b-field label="RH">
                <b-input v-model="rhNotInServiceSelected.id" disabled></b-input>
              </b-field>
            </article>
            <article>
              <b-field label="Objetivo">
                <b-input placeholder="Qual serviço o rh irá realizar?" v-model="rhServiceFields.goal"></b-input>
              </b-field>
            </article>
            <article>
              <b-field label="Custo por Hora Padrão">
                <money class="input" :value="rhNotInServiceSelected.cost" v-money="money" :masked="true" disabled></money>
              </b-field>
              <b-field label="Numero de Horas">
                <b-input  v-model="rhServiceFields.hours"></b-input>
              </b-field>
              <b-field label="Custo por Hora para o Serviço (R$)">
                <b-input type="number" step="0.01" v-model="rhServiceFields.cost"></b-input>
              </b-field>
            </article>
          </section>
        </div>
        <button type="submit">Associar</button>
      </form>
    </b-modal>
    <b-modal :active.sync="isEditModal">
      <!-- <div class="" id="editRhServiceScreen" v&#45;if="selected"> -->
      <!--   <h3>Editar RH Associado</h3> -->
      <!--   <section> -->
      <!--     <article> -->
      <!--       <b&#45;field label="RH"> -->
      <!--         <b&#45;input v&#45;model="selected.name" disabled></b&#45;input> -->
      <!--       </b&#45;field> -->
      <!--       <b&#45;field label="RH"> -->
      <!--         <b&#45;input v&#45;model="selected.id" disabled></b&#45;input> -->
      <!--       </b&#45;field> -->
      <!--     </article> -->
      <!--     <article> -->
      <!--       <b&#45;field label="Objetivo"> -->
      <!--         <b&#45;input placeholder="Qual serviço o rh irá realizar?" v&#45;model="goalRh"></b&#45;input> -->
      <!--       </b&#45;field> -->
      <!--     </article> -->
      <!--     <article> -->
      <!--       <b&#45;field label="Custo por Hora Padrão"> -->
      <!--         <money class="input" :value="selected.cost" v&#45;money="money" :masked="true" disabled></money> -->
      <!--       </b&#45;field> -->
      <!--       <b&#45;field label="Numero de Horas"> -->
      <!--         <b&#45;input placeholder="1" v&#45;model="hours"></b&#45;input> -->
      <!--       </b&#45;field> -->
      <!--       <b&#45;field label="Custo por Hora para o Serviço (R$)"> -->
      <!--         <b&#45;input placeholder="10,00" v&#45;model="cost"></b&#45;input> -->
      <!--       </b&#45;field> -->
      <!--     </article> -->
      <!--   </section> -->
      <!--   <button style="background: #00466d; margin&#45;top: 1rem;" @click="editRhAssociated(selected)">Editar</button> -->
      <!-- </div> -->
    </b-modal>
  </main>
</template>
<script charset="utf-8" src="./details.js"></script>
<!-- <script>
// import success from '../common/create-messages/success'
// import error from '../common/create-messages/error'
// import createRh from '../rh/create.vue'
import { header } from '../../../config/index.js'
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import rhTable from '../common/rhTable.vue'
import rhTableDetails from './details/rhTable.vue'
export default {
  name: 'serviceDetails',
  data () {
    return {
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: true
      },
      service: undefined,
      rhsService: undefined,
      rhsNotService: undefined,
      isSearchModalActive: false,
      isEditModal: false,
      data: [],
      rh_id: '',
      isModalActive: false,
      isCreateModalActive: false,
      serviceSelected: undefined,
      rhSelected: undefined,
      rhCreated: undefined,
      isResponseble: true,
      hoursRh: undefined,
      goal: undefined,
      costRh: undefined

    }
  },
  computed: {
    ...mapGetters([
      'rhsNotInService',
      'rhsInService'
    ]),
    rhs: {
      get () {
        return this.$store.getters.rhs
      },
      set (rhs) {
        this.setRhs(rhs)
      }
    },
    selected: {
      get () {
        return this.rhSelected ? this.rhSelected : (this.rhsService === undefined ? undefined : this.rhsService[0])
      },
      set (newValue) {
        console.log(newValue)
        this.rhSelected = newValue
      }
    },
    selectedIndex () {
      return this.rhs.findIndex(rh => rh.id === this.selected.id)
    },
    cost: {
      get () {
        return this.selected ? this.selected.pivot.cost : undefined
      },
      set (newValue) {
        console.log('Cost', newValue)
        this.costRh = newValue
      }
    },
    hours: {
      get () {
        return this.selected ? this.selected.pivot.hours : undefined
      },
      set (newValue) {
        console.log('Hours', newValue)
        this.hoursRh = newValue
      }
    },
    goalRh: {
      get () {
        return this.selected ? this.selected.pivot.goal : undefined
      },
      set (newValue) {
        console.log('Goal', newValue)
        this.goal = newValue
      }
    }
  },
  watch: {
    selected (newVal) {
      // this.$router.push({ name: 'vueDetails' })
    }
  },
  activated () {
    // if (this.selected) {
    //   if (this.serviceSelected) this.$router.push({ name: 'serviceDetails', params: { service_id: this.serviceSelected.id } })
    //   else this.$router.push({ name: 'serviceDetails', params: { service_id: this.selected.id } })
    // }
  },
  beforeRouteEnter (to, from, next) {
    next($this => {
      if ($this.$route.params.service_id) next()
      else next({ name: 'service' })
    })
  },
  // beforeRouteEnter (to, from, next) {
  //   next($this => {
  //     if ($this.rhSelected) next({ name: 'vueDetails', params: { rh_id: $this.rhSelected.id } })
  //     $this.getRhs($this)
  //     $this.$http.get($this.$api({ target: `service/${$this.$route.params.service_id}` }), {
  //       headers: header()
  //     }).then(response => {
  //       $this.serviceSelected = response.data
  //       $this.rhsService = $this.serviceSelected.rhs
  //     })
  //   })
  // },
  beforeMount () {
    this.getService()
    this.getRhInService()
    this.getRhNotInService()
  },
  methods: {
    ...mapActions([
      'getRhs',
      'updateService',
      'setRhsNotInService',
      'setRhsInService',
      'updateRh'
    ]),
    editRhAssociated (obj) {
      console.log(this.goal)
      let data = {
        rh_id: obj.pivot.rh_id,
        service_id: obj.pivot.service_id,
        cost: this.costRh === undefined ? obj.pivot.cost : this.costRh,
        hours: this.hoursRh === undefined ? obj.pivot.hours : this.hoursRh,
        goal: this.goal === undefined ? obj.pivot.goal : this.goal
      }
      this.$http.post(this.$api({ target: 'rh-service-update' }), data, {
        headers: header()
      }).then(response => {
        console.log(response)
        this.isEditModal = false
        this.getRhInService()
      })
    },
    filterRhNotInService (data) {
      this.$http.post(this.$api({ target: 'rh-not-in-service' }), Object.assign({ 'service_id': this.$route.params.service_id }, data), {
        headers: header()
      }).then(response => {
        console.log(response)
        this.setRhsNotInService(response.data)
      })
    },
    filterRhInService (data) {
      this.$http.post(this.$api({ target: 'rh-in-service' }), Object.assign({ 'service_id': this.$route.params.service_id }, data), {
        headers: header()
      }).then(response => {
        this.setRhsInService(response.data)
      })
    },
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
    getService () {
      this.$http.get(this.$api({ target: `service/${this.$route.params.service_id}` }), {
        headers: header()
      }).then(response => {
        this.service = response.data
      })
    },
    getRhInService () {
      this.$http.get(this.$api({ target: `rhs-in-service/${this.$route.params.service_id}` }), {
        headers: header()
      }).then(response => {
        this.setRhsInService(response.data)
        this.rhsService = response.data
      })
    },
    getRhNotInService () {
      this.$http.get(this.$api({ target: `rhs-not-in-service/${this.$route.params.service_id}` }), {
        headers: header()
      }).then(response => {
        // console.log('getRhNotInService', response)
        this.setRhsNotInService(response.data)
        this.rhsNotService = response.data
      })
    },
    attachRhService (values) {
      let data = {
        service_id: this.service.id
      }
      this.$http.post(this.$api({ target: 'rhs-service' }), Object.assign(values, data), {
        headers: header()
      }).then(response => {
        this.rhSelected = undefined
        this.getRhInService()
        this.getRhNotInService()
      })
    },
    showDetached (e) {
      this.rhSelected = e[0]
      this.isResponseble = !e[1]
    },
    showAttached (e) {
      this.rhSelected = e[0]
      this.isResponseble = e[1]
    },
    detachRh (id) {
      this.rhSelected = undefined
      let data = {
        rh_id: id,
        service_id: this.service.id
      }
      this.$http.post(this.$api({ target: 'rh-service' }), data, {
        headers: header()
      }).then(() => {
        this.getRhInService()
        this.getRhNotInService()
      })
    },
    reset (e) {
      if (e === 'service') {
        this.getRhInService()
      } else {
        this.getRhNotInService()
      }
    }
  },
  components: {
    rhTable,
    rhTableDetails
  }
}
</script> -->
