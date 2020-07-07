<template id="">
  <main id="master">
    <h3>
      RH's
      <div @mouseenter="restoreRhSelected()" id="edit" @click="rhSelected ? (rhSelected.lock ? null : isEditActive = true) : null">
        <b-tooltip v-if="rhSelected" label="RH em edição" type="is-danger" :active="rhSelected.lock === 1">
          <b-icon icon="edit"></b-icon>
        </b-tooltip>
        <b-icon v-else icon="edit"></b-icon>
      </div>
      <button id="createButtonRh" class="buttons is-primary" @click="isRhModalActive = true">Cadastrar novo RH</button>
    </h3>
    <div class="content __display">
      <rh-table
        v-if="rhs"
        :resources="rhs"
        :filterActive="filterActive"
        :setFunction="setRhFilters"
        :document="true"
        :selectedIndex="selectedIndex"
        @update="setRhSelected($event[0]); restoreRhSelected()"
        @filter="get()"
        @searchByDocument="searchUserByDocument"
        @restore="restoreRhs($event)">
        <span slot="title">RH's</span>
        <template v-slot:search>
          <b-input placeholder="Procurar por um RH" v-model="searchQuery"></b-input>
        </template>
      </rh-table>
    </div>
    <div v-if="rhSelected && !rhSelected.approved" id="probation">
      Perfil em processo de aprovação!
    </div>
    <div class="content" v-if="rhSelected">
      <generic-user :person="rhSelected"></generic-user>
      <section>
        <b-field label="Custo (hora)">
          <money v-if="rhSelected.cost" class="input" :value="parseFloat(rhSelected.cost)" v-money="money" :masked="true" disabled></money>
          <div v-else class="textarea __disabled" disabled></div>
        </b-field>
        <b-field label="Competências">
          <div class="textarea __disabled" v-html="rhSelected.competencies" disabled></div>
        </b-field>
        <b-field label="Experiência">
          <div class="textarea __disabled" v-html="rhSelected.experience"></div>
        </b-field>
        <b-field label="Observações">
          <div class="textarea __disabled" v-html="rhSelected.observations"></div>
        </b-field>
      </section>
      <section id="academics">
        <b-field label="Perfil Lattes">
          <div class="textarea __disabled">
            <a :href="rhSelected.lattes_perfil" target="_blank">{{ rhSelected.lattes_perfil }}</a>
          </div>
        </b-field>
        <!-- <b&#45;field label="Perfil Lattes" > -->
        <!--   <b&#45;input v&#45;model="rhSelected.lattes_perfil" disabled></b&#45;input> -->
        <!-- </b&#45;field> -->
        <b-field label="Bacharelado">
          <b-input v-model="area" disabled></b-input>
        </b-field>
        <b-field label="Título">
          <b-input v-model="degree" disabled></b-input>
        </b-field>
      </section>
    </div>
    <div class="content" v-else>
      <h2>RH não cadastrado ou não encontrado</h2>
    </div>
    <b-modal :active.sync="isRhModalActive">
      <component :is="parseModal()" @rhCreated="rhCreated = true; isRhModalActive = false" @creationFailed="rhCreated = false; creationErros = $event">
        <template v-slot:message>
          <h2>{{ rhCreated ? 'Sucesso ao cadastrar um RH' : 'Algo de errado aconteceu' }}</h2>
          <span class="error" v-for="(err, index) in creationErros" :key="index">
            {{ err[0] }}
          </span>
        </template>
      </component>
    </b-modal>
    <b-modal :onCancel="restoreRhSelected" :active.sync="isEditActive">
      <edit-rh :rh="rhSelected" :selectedIndex="selectedIndex" @updated="isEditActive = false; get()"></edit-rh>
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
moment.locale('pt-BR')
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
      isRhModalActive: false,
      tableSelected: undefined,
      creationErros: []
    }
  },
  computed: {
    userFilters () {
      return this.$store.getters.rhFilters.userFilters
    },
    addressFilters () {
      return this.$store.getters.rhFilters.addressFilters
    },
    rhFilters () {
      return this.$store.getters.rhFilters.rhFilters
    },
    academicFilters () {
      return this.$store.getters.rhFilters.academicFilters
    },
    filterActive () {
      let ret = false
      Object.keys(this.$store.getters.rhFilters).forEach(fi => {
        if (fi !== 'name') {
          // if (this.$store.getters.rhFilters[fi]) ret = true
          if (this.$store.getters.rhFilters[fi].filter(f => f.active).length) ret = true
        }
      })
      return ret
    },
    searchQuery: {
      get () {
        return this.$store.getters.rhFilters.name
      },
      set: _.debounce(function (newQuery) {
        this.setRhQuery(newQuery)
      }, 500)
    },
    selected: {
      get () {
        return this.rhSelected ? this.rhSelected : this.rhs[0]
      },
      set (newVal) {
        this.rhSelected = newVal
      }
    },
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
      set (rhs) {
        this.setRhs(rhs)
      }
    },
    selectedIndex () {
      return this.rhs.findIndex(rh => rh.id === this.rhSelected.id)
    },
    area: {
      get () {
        return this.selected.academics.length > 0 ? this.selected.academics[0].area : undefined
      }
    },
    degree: {
      get () {
        return this.selected.academics.length > 0 ? this.selected.academics[0].titulation : undefined
      }
    },
    lastRhSelected: {
      get () {
        return this.$store.getters.lastRhSelected
      },
      set (index) {
        this.setLastRhSelected(index >= 0 ? index : 0)
      }
    }
  },
  watch: {
    isEditActive (newVal) {
      if (newVal) {
        setTimeout(() => {
          console.log('time is ticking')
          this.isEditActive = false
        }, 10 * 60 * 1000)
      }
    },
    rhCreated () {
      this.get()
    },
    isModalActive () {
      this.rhCreated = undefined
    },
    isRhModalActive () {
      this.rhCreated = undefined
    },
    searchQuery (newQuery, oldQuery) {
      if (newQuery === '' || newQuery === oldQuery) this.get()
      else this.filterRhs()
    },
    // searchQuery: _.debounce(function (newQuery, oldQuery) {
    //   this.rhSelected = undefined
    //   if (newQuery === '' && newQuery === oldQuery) {
    //     this.getRhs(this)
    //   } else {
    //     this.searchRh(newQuery)
    //   }
    // }, 500),
    selected (newVal) {
      if (this.rhs.length > 0) {
        this.$router.push({ name: 'rh', params: { rh_id: newVal.id } })
      }
    }
  },
  // activated () {
  //   if (this.selected) {
  //     if (this.rhSelected) this.$router.push({ name: 'rh', params: { rh_id: this.rhSelected.id } })
  //     else this.$router.push({ name: 'rh', params: { rh_id: this.selected.id } })
  //   }
  // },
  beforeMount () {
    this.get()
    this.currentPage = Math.ceil(this.selectedIndex / this.perPage) || 1
  },
  beforeDestroy () {
    this.lastRhSelected = this.selectedIndex
  },
  methods: {
    ...mapActions([
      'getRhs',
      'setRhs',
      'updateRh',
      'setRhSelected',
      'setLastRhSelected',
      'restoreRhFilters',
      'setRhQuery',
      'setRhFilters'
    ]),
    get () {
      if (this.filterActive || this.$store.getters.rhFilters.name) this.filterRhs()
      else this.getAllRhs()
    },
    getAllRhs () {
      this.getRhs(this).then(rhs => {
        if (rhs.length) {
          this.rhs = rhs
          this.rhSelected = rhs[this.lastRhSelected !== undefined ? this.lastRhSelected : 0]
        }
      })
    },
    filterRhs () {
      let data = {
        name: this.searchQuery,
        userFilters: this.userFilters.filter(f => f.active),
        rhFilters: this.rhFilters.filter(f => f.active),
        addressFilters: this.addressFilters.filter(f => f.active),
        academicFilters: this.academicFilters.filter(f => f.active)
      }
      this.$http.post(this.$api({
        target: 'filter-rh',
        conn: this.$store.getters.conn
      }), data, {
        headers: header()
      }).then(response => {
        this.rhs = response.data
        this.rhSelected = response.data.length ? response.data[this.lastRhSelected !== undefined ? this.lastRhSelected : 0] : null
        this.isFilterModalActive = false
      })
    },
    restoreRhSelected () {
      this.$http.get(this.$api({
        target: `rh/${this.selected.user.id}`,
        conn: this.$store.getters.conn
      }), {
        headers: header()
      }).then(response => {
        this.updateRh([response.data, this.selectedIndex])
        // this.setClientSelected(this.clients[this.selectedIndex])
      })
      // this.setRhSelected(this.rhs[this.selectedIndex])
    },
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
    restoreRhs () {
      this.restoreRhFilters()
      if (this.filterActive) {
        this.filterRhs()
      } else {
        this.getRhs(this).then(rhs => {
          if (rhs.length) {
            this.rhs = rhs
            this.rhSelected = rhs[this.lastRhSelected !== undefined ? this.lastRhSelected : 0]
          }
        })
      }
    },
    searchUserByDocument (document) {
      this.$http.post(this.$api({
        target: 'search-rh-document',
        conn: this.$store.getters.conn
      }), { document: document }, {
        headers: header()
      }).then(response => {
        this.rhs = response.data
        this.rhSelected = response.data[0]
      })
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
