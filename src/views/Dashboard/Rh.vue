<template>
  <main id="rhs" v-if="selected !== undefined">
    <div class="info">
      <div class="content">
        <div class="rh">
          <h3>
            RH's
            <div id="edit" @click="isEditActive = true">
              <b-icon icon="edit"></b-icon>
            </div>
          </h3>
          <basic-rh :person="selected"></basic-rh>
          <div class="course">
            <!-- <p>Academics</p>
            {{ selected.academics[0].area }} -->
            <!-- <b-field label="Bacharelado">
              <b-input v-model="area" placeholder="Matemática" disabled></b-input>
            </b-field>
            <b-field label="Título">
              <b-input v-model="degree" placeholder="Doutorado" disabled></b-input>
            </b-field>
            <b-field label="Custo">
              <b-input v-model="selected.cost" placeholder="R$ 131,00" disabled></b-input>
            </b-field> -->
          </div>
        </div>
        <div class="competencias">
          <h3>Outros</h3>
          <b-field label="Competências">
            <div class="textarea" v-html="selected.competencies" disabled></div>
            <!-- <textarea placeholder="Analise de dados" v&#45;html="selected.competencies" name="" id="" cols="40" rows="4"></textarea> -->
          </b-field>
          <b-field label="Experiência">
            <textarea placeholder="Analise de dados" v-model="selected.experience" name="" id="" cols="40" rows="4" disabled></textarea>
          </b-field>
          <b-field label="Observações">
            <textarea v-model="selected.observations" name="" id="" cols="40" rows="4" disabled></textarea>
          </b-field>
        </div>
      </div>
      <div class="serviceTable">
        <div class="headerTable">
          <h4>RH's</h4>
          <button class="buttons is-primary" @click="isModalActive = true">Cadastrar novo RH</button>
          <b-input placeholder="Procurar..." v-model="searchQuery"></b-input>
        </div>
         <b-table :data="rhs" :selected.sync="selected" :paginated="true" :per-page="5" focusable style="padding-top: 1rem">
          <template slot-scope="props">
            <b-table-column field="name" label="NOME" sortable>
              {{ props.row.name }}
            </b-table-column>
            <b-table-column field="created_at" label="CADASTRO">
              {{ parseDate(props.row.created_at) }}
            </b-table-column>
            <b-table-column field="user.email" label="EMAIL">
              {{ props.row.user.email }}
            </b-table-column>
            <b-table-column field="phone" label="TELEFONE">
              {{ props.row.phone }}
            </b-table-column>
          </template>
        </b-table>
      </div>
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
import BasicRh from './common/ComponentGeneric.vue'
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
  beforeRouteEnter (to, from, next) {
    next($this => {
      if ($this.rhSelected) next({ name: 'rh', params: { rh_id: $this.rhSelected.id } })
    })
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
    }
  },
  components: {
    createRh,
    BasicRh,
    editRh,
    success,
    error
  }
}
</script>
