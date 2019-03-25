<template>
  <main class="details" id="serviceDetails" v-if="service">
    <h3>Detalhes do Serviço</h3>
    <div class="content">
      <section>
        <article>
          <b-field label="Serviço">
            <b-input v-model="service.name" disabled></b-input>
          </b-field>
          <b-field label="ID">
            <b-input v-model="service.id" disabled></b-input>
          </b-field>
        </article>
        <hr>
        <div v-if="selected" id="rh">
          <article class="__display">
            <b-field label="Rh">
              <b-input v-model="selected.name" disabled></b-input>
            </b-field>
            <b-field label="Comepetências">
              <div class="textarea __disabled" v-html="selected.competencies"></div>
            </b-field>
          </article>
          <article>
            <b-field label="Custo por Hora Padrão">
              <b-input v-model="selected.cost" disabled></b-input>
            </b-field>
            <b-field label="Numero de Horas">
              <b-input></b-input>
            </b-field>
            <b-field label="Custo por Hora para o Serviço">
              <b-input v-model="selected.cost"></b-input>
            </b-field>
          </article>
          <div class="actions">
            <button class="is-primary" @click="detachRh(selected.id)">Desassociar esse RH</button>
          </div>
          
        </div>
      </section>
      <rh-table v-if="rhsService" :rhs="rhsService" @update="rhSelected = $event">
        <span slot="title">Rhs Responsáveis</span>
      </rh-table>
    </div>
    <!-- <div class="details&#45;information"> -->
    <!--   <div class="description&#45;service"> -->
    <!--     <hr> -->
    <!--     <div class="rhOfService" v&#45;if="selected !== undefined" > -->
    <!--       <div class="infoRh"> -->
    <!--         <b&#45;field label="RH"> -->
    <!--           <b&#45;input v&#45;model="selected.name" placeholder="Lorem ipsum dolor sit amet" disabled></b&#45;input> -->
    <!--         </b&#45;field> -->
    <!--         <b&#45;field label="ID"> -->
    <!--           <b&#45;input v&#45;model="selected.id" placeholder="2" disabled></b&#45;input> -->
    <!--         </b&#45;field> -->
    <!--       </div> -->
    <!--       <b&#45;field label="Especificidade e Serviço"> -->
    <!--         <textarea v&#45;model="selected.competencies" name="" id="" cols="55" rows="4" disabled></textarea> -->
    <!--       </b&#45;field> -->
    <!--       <div class="hours"> -->
    <!--         <b&#45;field label="Custo"> -->
    <!--           <b&#45;input v&#45;model="selected.cost" placeholder="ORCA &#45; Orçamento (em aberto)" disabled></b&#45;input> -->
    <!--         </b&#45;field> -->
    <!--         <b&#45;field label="Horas"> -->
    <!--           <b&#45;input placeholder="ORCA &#45; Orçamento (em aberto)"></b&#45;input> -->
    <!--         </b&#45;field> -->
    <!--         <b&#45;field label="Prazo"> -->
    <!--           <b&#45;input placeholder="ORCA &#45; Orçamento (em aberto)"></b&#45;input> -->
    <!--         </b&#45;field> -->
    <!--       </div> -->
    <!--       <div class="cost"> -->
    <!--         <div class="field"> -->
    <!--           <b&#45;checkbox>Estado</b&#45;checkbox> -->
    <!--         </div> -->
    <!--         <button class="is&#45;primary" @click="isCreateModalActive = true">Cadastrar RH</button> -->
    <!--       </div> -->
    <!--     </div> -->
    <!--   </div> -->
    <!-- <button class="is&#45;primary" @click="isCreateModalActive = true" v&#45;if="rhsService.length == 0">Cadastrar RH</button> -->
    <!-- </div> -->
    <!-- <div class="attach"> -->
    <!--   <b&#45;modal :active.sync="isModalActive"> -->
    <!--     <div class="attachRh"> -->
    <!--       <b&#45;field label="Adicionar Rh ao serviço"> -->
    <!--         <b&#45;select v&#45;model="rh_id" placeholder="Select a name"> -->
    <!--           <option -->
    <!--             v&#45;for="option in data" -->
    <!--             :value="option.id" -->
    <!--             :key="option.id"> -->
    <!--             {{ option.name }} -->
    <!--           </option> -->
    <!--         </b&#45;select> -->
    <!--       </b&#45;field> -->
    <!--       <div class="buttonCreate"> -->
    <!--         <button class="buttons is&#45;primary" @click="attachRhService()">Adicionar</button> -->
    <!--       </div> -->
    <!--     </div> -->
    <!--   </b&#45;modal> -->
    <!-- </div> -->
    <b-modal :active.sync="isSearchModalActive">
      <component></component>
    </b-modal>
  </main>
</template>
<script>
import success from '../common/create-messages/success'
import error from '../common/create-messages/error'
import createRh from '../rh/create.vue'
import { header } from '../../../config/index.js'
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import rhTable from '../common/rhTable.vue'
export default {
  name: 'serviceDetails',
  data () {
    return {
      service: undefined,
      rhsService: undefined,
      rhsNotInService: undefined,
      isSearchModalActive: false,
      data: [],
      rh_id: '',
      isModalActive: false,
      isCreateModalActive: false,
      serviceSelected: undefined,
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
    selectedIndex () {
      return this.rhs.findIndex(rh => rh.id === this.selected.id)
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
    console.log('enter')
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
    this.getRhService()
    // this.getRhNotInService()
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
    getService () {
      this.$http.get(this.$api({ target: `service/${this.$route.params.service_id}` }), {
        headers: header()
      }).then(response => {
        this.service = response.data
      })
    },
    getRhService () {
      this.$http.get(this.$api({ target: `rhs-service/${this.$route.params.service_id}` }), {
        headers: header()
      }).then(response => {
        this.rhsService = response.data
      })
    },
    getRhNotInService () {
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
      this.rhsNotInService = diferent
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
    rhTable,
    createRh,
    error,
    success
  }
}
</script>
