<template>
  <main id="rhs" v-if="selected !== undefined">
    <h3>
      RH's
      <div id="edit" @click="isEditActive = true">
        <b-icon icon="edit"></b-icon>
      </div>
    </h3>
    <div class="content">
      <generic-user :person="selected"></generic-user>
      <section>
        <b-field label="Competências">
          <div class="textarea __disabled" v-html="selected.competencies" disabled></div>
          <!-- <textarea placeholder="Analise de dados" v&#45;html="selected.competencies" name="" id="" cols="40" rows="4"></textarea> -->
        </b-field>
        <b-field label="Experiência">
          <div class="textarea __disabled" v-html="selected.experience"></div>
        </b-field>
        <b-field label="Observações">
          <textarea v-model="selected.observations" name="" id="" cols="40" rows="4" disabled></textarea>
        </b-field>
      </section>
    </div>
    <div class="content __display">
      <rh-table :create="true" :rhs="rhs" @update="table($emit)">
        <span slot="title">Rhs</span>
      </rh-table>
    </div>
    <b-modal :active.sync="isModalActive">
      <component :is="parseModal()" @rhCreated="rhCreated = true" @creationFailed="rhCreated = false"></component>
    </b-modal>
    <b-modal :active.sync="isEditActive">
      <edit-rh :rh="selected" :selectedIndex="selectedIndex" @updateRh="rhSelected = rhs[selectedIndex]"></edit-rh>
    </b-modal>
  </main>
</template>
<script>
import { mapActions } from 'vuex'
import createRh from './rh/create.vue'
import editRh from './rh/edit.vue'
import rhTable from './common/rhTable.vue'
import genericUser from './common/genericUser.vue'
import success from './common/create-messages/success'
import error from './common/create-messages/error'
import moment from 'moment'
import { header } from '../../config/index.js'
import _ from 'lodash'
export default {
  name: 'rhs',
  data () {
    return {
      isEditActive: false,
      rhCreated: undefined,
      isModalActive: false,
      rhSelected: undefined,
      searchQuery: undefined
    }
  },
  computed: {
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
      this.$router.push({ name: 'rh', params: { rh_id: newVal.id } })
    }
  },
  activated () {
    if (this.selected) {
      if (this.rhSelected) this.$router.push({ name: 'rh', params: { rh_id: this.rhSelected.id } })
      else this.$router.push({ name: 'rh', params: { rh_id: this.selected.id } })
    }
  },
  beforeMount () {
    this.getRhs(this)
    // console.log(this.rhs[0].academics)
  },
  methods: {
    ...mapActions([
      'getRhs',
      'changeRh',
      'updateRh'
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
    searchRh (name) {
      this.$http.get(this.$api({ target: 'rh' }), {
        headers: header(),
        params: {
          search: name
        }
      }).then(response => {
        this.changeRh(response.data)
      })
    },
    table (e) {
      console.log(e)
      this.rhSelected = e[0]
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
