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
      set: _.debounce(function (newVal) {
        this.updateRhSelected(['experience', '', newVal])
      }, 400)
    },
    competencies: {
      get () {
        return this.rh.competencies
      },
      set: _.debounce(function (newVal) {
        this.updateRhSelected(['competencies', '', newVal])
      }, 400)
    },
    cost: {
      get () {
        return this.rh.cost
      },
      set: _.debounce(function (newVal) {
        this.updateRhSelected(['cost', '', newVal])
      }, 400)
    },
    observations: {
      get () {
        return this.rh.observations
      },
      set: _.debounce(function (newVal) {
        this.updateRhSelected(['observations', '', newVal])
      }, 400)
    },
    area: {
      get () {
        return this.rh.academics.length ? this.rh.academics[0].area : null
      },
      set: _.debounce(function (newVal) {
        console.log(newVal)
        this.updateRhSelected(['area', 'academics', newVal])
      }, 400)
    },
    titulation: {
      get () {
        return this.rh.academics.length ? this.rh.academics[0].titulation : null
      },
      set: _.debounce(function (newVal) {
        console.log(newVal)
        this.updateRhSelected(['titulation', 'academics', newVal])
      }, 400)
    }
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
    updateFunction () {
      this.postRhSelected([this, this.rh]).then(response => {
        this.updateRh([response.data, this.selectedIndex])
        setTimeout(() => {
          this.$toasted.success('Perfil do RH atualizado com sucesso!', {
            theme: 'bubble',
            position: 'top-center',
            duration: 2000,
            onComplete: () => {
              this.$emit('updated', response.data)
            }
          })
        }, 300)
      })
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