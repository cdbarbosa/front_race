<template id="">
  <main id="master">
    <h3>
      RH's
      <div id="edit" @click="isEditActive = true" v-if="rhSelected">
        <b-icon icon="edit"></b-icon>
      </div>
    </h3>
    <div class="content" v-if="rhSelected">
      <generic-user :person="rhSelected"></generic-user>
      <section>
        <b-field label="Custo por Hora">
          <money class="input" :value="rhSelected.cost" v-money="money" :masked="true" disabled></money>
          <!-- <div class="textarea __disabled" v&#45;html="selected.cost" disabled></div> -->
          <!-- <textarea placeholder="Analise de dados" v&#45;html="selected.competencies" name="" id="" cols="40" rows="4"></textarea> -->
        </b-field>
        <b-field label="Competências">
          <div class="textarea __disabled" v-html="rhSelected.competencies" disabled></div>
          <!-- <textarea placeholder="Analise de dados" v&#45;html="selected.competencies" name="" id="" cols="40" rows="4"></textarea> -->
        </b-field>
        <b-field label="Experiência">
          <div class="textarea __disabled" v-html="rhSelected.experience"></div>
        </b-field>
        <b-field label="Observações">
          <div class="textarea __disabled" v-html="rhSelected.observations"></div>
        </b-field>
      </section>
    </div>
    <div class="content" v-else>
      <h2>RH não cadastrado ou não encontrado</h2>
    </div>
    <div class="content __display">
      <rh-table :create="true" :rhs="rhs" @update="setRhSelected($event[0])" @filter="filter($event)" @reset="reset($event)">
        <span slot="title">RH's</span>
      </rh-table>
    </div>
    <b-modal :active.sync="isModalActive">
      <component :is="parseModal()" @rhCreated="rhCreated = true" @creationFailed="rhCreated = false">
        <template slot="message">
          <h2>{{ rhCreated ? 'Sucesso ao cadastrar um RH' : 'Algo de errado aconteceu' }}</h2>
        </template>
      </component>
    </b-modal>
    <b-modal :active.sync="isEditActive">
      <edit-rh :rh="selected" :selectedIndex="selectedIndex" @updateRh="rhSelected = rhs[selectedIndex]"></edit-rh>
    </b-modal>
  </main>
</template>
<script charset="utf-8">
import { mapActions } from 'vuex'
import createRh from './create.vue'
import editRh from './edit.vue'
import rhTable from '../common/rhTable.vue'
import genericUser from '../common/genericUser.vue'
import success from '../common/create-messages/success'
import error from '../common/create-messages/error'
import moment from 'moment'
import { header } from '../../../config/index.js'
import _ from 'lodash'
export default {
  name: 'masterRh',
  data () {
    return {
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: true
      },
      isEditActive: false,
      rhCreated: undefined,
      isModalActive: false,
      searchQuery: undefined
    }
  },
  computed: {
    rhSelected: {
      get () {
        return this.$store.getters.rhSelected
      },
      set (newVal) {
        this.setRhSelected(newVal)
      }
    },
    rhs: {
      get () {
        return this.$store.getters.rhs
      },
      set (newVal) {
        this.changeRh(this)
      }
    },
    selected: {
      get () {
        return this.rhSelected ? this.rhSelected : this.rhs[0]
      },
      set (newVal, oldVal) {
        this.rhSelected = newVal
      }
    },
    selectedIndex () {
      return this.rhs.findIndex(rh => rh.id === this.selected.id)
    },
    area: {
      get () {
        return this.selected.academics.length > 0 ? this.selected.academics[0].area : undefined
      }
    },
    degree: {
      get () {
        return this.selected.academics.length > 0 ? this.selected.academics[0].degree : undefined
      }
    }
  },
  watch: {
    isModalActive (newVal) {
      if (!newVal) {
        this.rhCreated = undefined
      }
    },
    searchQuery: _.debounce(function (newQuery, oldQuery) {
      console.log(newQuery)
      this.rhSelected = undefined
      if (newQuery === '' && newQuery === oldQuery) {
        this.getRhs(this)
      } else {
        this.searchRh(newQuery)
      }
    }, 500),
    selected (newVal) {
      if (this.rhs.length > 0) {
        this.$router.push({ name: 'rh', params: { rh_id: newVal.id } })
      }
    }
  },
  activated () {
    if (this.selected) {
      if (this.rhSelected) this.$router.push({ name: 'rh', params: { rh_id: this.rhSelected.id } })
      else this.$router.push({ name: 'rh', params: { rh_id: this.selected.id } })
    }
  },
  beforeMount () {
    this.getRhs(this).then(rhs => {
      this.setRhs(rhs)
    })
    // console.log(this.rhs[0].academics)
  },
  methods: {
    ...mapActions([
      'getRhs',
      'setRhs',
      'changeRh',
      'updateRh',
      'setRhSelected'
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
    table (e) {
    },
    filter (e) {
      this.$http.post(this.$api({ target: 'rh' }), e, {
        headers: header()
      }).then(response => {
        console.log(response.data)
        this.changeRh(response.data)
        this.isFilterModalActive = false
        // console.log(this.rhs)
      })
    },
    reset (e) {
      this.getRhs(this).then(rhs => {
        this.setRhs(rhs)
      })
      this.rhSelected = this.rhs[0]
    }
  },
  components: {
    rhTable,
    createRh,
    genericUser,
    editRh,
    success,
    error
  }
}
</script>
