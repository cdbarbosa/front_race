<template>
  <div class="rhScreen" id="updateRh">
    <div class="content">
      <edit-generic :person="rh" :title="'RH'" @change="updateFunction($event)">
        <article class="academics">
          <b-field label="Bacharelado">
            <b-input v-model="bacharel" placeholder="Matemática"></b-input>
          </b-field>
          <b-field label="Título">
            <b-input v-model="titulation" placeholder="Doutorado"></b-input>
          </b-field>
          <b-field label="Custo (R$)">
            <b-input v-model="cost" placeholder="R$ 131,00"></b-input>
          </b-field>
        </article>
      </edit-generic>
      <div class="competencias">
        <h3>Competências</h3>
        <b-field label="Experiência">
          <b-input v-model="rh.experience" placeholder="Analise de dados"></b-input>
        </b-field>
        <b-field label="Competências">
          <vue-editor :editorToolbar="customToolbar" v-model="competencies" placeholder="Analise de dados"></vue-editor>
        </b-field>
        <b-field label="Observações">
          <vue-editor :editorToolbar="customToolbar" v-model="observations"></vue-editor>
        </b-field>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { header } from '../../../config/index.js'
import editGeneric from '../common/editGeneric.vue'
import _ from 'lodash'
import moment from 'moment'
import { VueEditor } from 'vue2-editor'
export default {
  name: 'updateRh',
  props: ['rh', 'selectedIndex'],
  data () {
    return {
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }]
      ],
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2
      }
    }
  },
  watch: {
  },
  mounted () {
  },
  computed: {
    competencies: {
      get () {
        return this.rh.competencies
      },
      set: _.debounce(function (newVal, oldVal) {
        this.updateFunction(['competencies', newVal, 'rh'])
      }, 1000)
    },
    cost: {
      get () {
        return this.rh.cost
      },
      set: _.debounce(function (newVal, oldVal) {
        this.updateFunction(['cost', newVal, 'rh'])
      }, 1000)
    },
    bacharel: {
      get () {
        return this.rh.academics ? this.rh.academics[0].area : undefined
      },
      set: _.debounce(function (newVal, oldVal) {
        console.log(newVal)
        this.updateAcademics(['area', newVal, 'rh'])
      }, 1000)
    },
    titulation: {
      get () {
        return this.rh.academics ? this.rh.academics[0].titulation : undefined
      },
      set: _.debounce(function (newVal, oldVal) {
        this.updateAcademics(['titulation', newVal, 'rh'])
      }, 1000)
    },
    observations: {
      get () {
        return this.rh.observations
      },
      set: _.debounce(function (newVal, oldVal) {
        this.updateFunction(['observations', newVal, 'rh'])
      }, 1000)
    }
  },
  methods: {
    ...mapActions([
      'updateRh',
      'updateRhAddress',
      'updateRhAcademics'
    ]),
    parseDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    updateFunction (e) {
      let data = {
        label: e[0],
        value: e[1],
        id: e[2] === 'rh' ? this.rh.id : (e[2] === 'user' ? this.rh.user.id : this.rh.user.address.id)
      }
      this.$http.put(this.$api({ target: `${e[2]}` }), data, {
        headers: header()
      }).then(response => {
        let payload = [response.data, this.selectedIndex]
        e[2] === 'rh' ? this.updateRh(payload) : this.updateRhAddress(payload)
        this.$emit('updated')
        this.$toasted.success('Perfil do rh atualizado com sucesso!', {
          theme: 'bubble',
          position: 'top-center',
          duration: 2000
        })
      })
    },
    updateAcademics (e) {
      let data = {
        label: e[0],
        value: e[1]
      }
      console.log(e)
      this.$http.put(this.$api({ target: 'rh-academic' }), Object.assign({ 'rh_id': this.rh.id, 'rh_academics_id': this.rh.academics[0].id }, data), {
        headers: header()
      }).then(response => {
        let payload = [response.data, this.selectedIndex]
        this.updateRh(payload)
        this.$emit('updated')
        this.$toasted.success('Perfil do rh atualizado com sucesso!', {
          theme: 'bubble',
          position: 'top-center',
          duration: 2000
        })
      })
    }
  },
  components: {
    editGeneric,
    VueEditor
  }
}
</script>
