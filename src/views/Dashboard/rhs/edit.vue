<template>
  <div class="rhScreen" id="updateRh">
    <div class="content">
      <edit-generic :person="rh" :title="'RH'" @change="updateRhSelected($event)">
        <!-- <article class="academics"> -->
        <!--   <b&#45;field label="Bacharelado"> -->
        <!--     <b&#45;input v&#45;model="bacharel" placeholder="Matemática"></b&#45;input> -->
        <!--   </b&#45;field> -->
        <!--   <b&#45;field label="Título"> -->
        <!--     <b&#45;input v&#45;model="titulation" placeholder="Doutorado"></b&#45;input> -->
        <!--   </b&#45;field> -->
        <!--   <b&#45;field label="Custo (R$)"> -->
        <!--     <b&#45;input v&#45;model="cost" placeholder="R$ 131,00"></b&#45;input> -->
        <!--   </b&#45;field> -->
        <!-- </article> -->
      </edit-generic>
      <div class="competencias">
        <h3>Competências</h3>
        <b-field label="Experiência">
          <b-input v-model="experience" placeholder="Analise de dados"></b-input>
        </b-field>
        <b-field label="Competências">
          <vue-editor :editorToolbar="customToolbar" v-model="competencies" placeholder="Analise de dados"></vue-editor>
        </b-field>
        <b-field label="Observações">
          <vue-editor :editorToolbar="customToolbar" v-model="observations"></vue-editor>
        </b-field>
      </div>
    <button @click="updateFunction">Atualizar</button>
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
    experience: {
      get () {
        return this.rh.experience
      },
      set: _.debounce(function (newVal, oldVal) {
        this.updateRhSelected(['experience', '', newVal])
      }, 1000)
    },
    competencies: {
      get () {
        return this.rh.competencies
      },
      set: _.debounce(function (newVal, oldVal) {
        console.log(newVal)
        // this.updateRhSelected(['competencies', '', newVal])
      }, 1000)
    },
    cost: {
      get () {
        return this.rh.cost
      },
      set: _.debounce(function (newVal, oldVal) {
        this.updateRhSelected(['cost', '', newVal])
      }, 1000)
    },
    observations: {
      get () {
        return this.rh.observations
      },
      set: _.debounce(function (newVal, oldVal) {
        this.updateRhSelected(['observations', '', newVal])
      }, 1000)
    }
    // bacharel: {
    //   get () {
    //     return this.rh.academics ? this.rh.academics[0].area : undefined
    //   },
    //   set: _.debounce(function (newVal, oldVal) {
    //     console.log(newVal)
    //     this.updateAcademics(['area', newVal, 'rh'])
    //   }, 1000)
    // },
    // titulation: {
    //   get () {
    //     return this.rh.academics ? this.rh.academics[0].titulation : undefined
    //   },
    //   set: _.debounce(function (newVal, oldVal) {
    //     this.updateAcademics(['titulation', newVal, 'rh'])
    //   }, 1000)
    // }
  },
  methods: {
    ...mapActions([
      'updateRh',
      'updateRhAddress',
      'updateRhAcademics',
      'updateRhSelected',
      'postRhSelected'
    ]),
    parseDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    updateFunction (e) {
      this.postRhSelected([this, this.rh]).then(response => {
        this.updateRh([response.data, this.selectedIndex])
        setTimeout(() => {
          this.$toasted.success('Perfil do RH atualizado com sucesso!', {
            theme: 'bubble',
            position: 'top-center',
            duration: 2000,
            onComplete: () => {
              this.$emit('updated')
            }
          })
        }, 300)
      })
      // let data = {
      //   label: e[0],
      //   value: e[1],
      //   id: e[2] === 'rh' ? this.rh.id : (e[2] === 'user' ? this.rh.user.id : this.rh.user.address.id)
      // }
      // this.$http.put(this.$api({ target: `${e[2]}` }), data, {
      //   headers: header()
      // }).then(response => {
      //   let payload = [response.data, this.selectedIndex]
      //   e[2] === 'rh' ? this.updateRh(payload) : this.updateRhAddress(payload)
      // })
    },
    updateAcademics (e) {
      let data = {
        label: e[0],
        value: e[1]
      }
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
