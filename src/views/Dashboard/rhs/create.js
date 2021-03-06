import { header } from '../../../config/index.js'
import { mapActions } from 'vuex'
import userCreate from '../../../mixins/userCreate'
import { VueEditor } from 'vue2-editor'
import moment from 'moment'
moment.locale('pt-BR')
export default {
  name: 'create-rh',
  props: ['open'],
  mixins: [userCreate],
  data () {
    return {
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }]
      ],
      months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      days: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
      rh: {
        name: null,
        phone: null,
        cost: null,
        competencies: null,
        observations: null,
        experience: null,
        lattes_perfil: null,
        academic: {
          area: null,
          titulation: null
        },
        activity: null
      },
      money: {
        decimal: '.',
        thousands: ',',
        prefix: 'R$ ',
        precision: 2
      }
    }
  },
  watch: {
    'user.type_id' () {
      this.rh.academic.area = null
      this.rh.academic.titulation = null
    }
  },
  computed: {
  },
  methods: {
    ...mapActions([
      'getRhs',
      'setRhs'
    ]),
    parseDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    createRh () {
      // if (this.rh.cost) this.rh.cost = parseFloat(this.rh.cost.split(' ')[1])
      this.$Progress.start()
      this.createUser().then(userId => {
        let data = {
          user_id: userId,
          rh: this.rh
        }
        this.$http.post(this.$api({
          target: 'rhs',
          conn: this.$store.getters.conn
        }), data, {
          headers: header()
        }).then(() => {
          this.$Progress.finish()
          this.$toasted.success('Perfil do RH criado com sucesso!', {
            theme: 'bubble',
            position: 'top-center',
            duration: 1000,
            onComplete: () => {
              this.$emit('rhCreated')
            }
          })
          // this.getRhs(this).then(rhs => {
          //   this.setRhs(rhs)
          // })
        }).catch(err => {
          this.$Progress.fail()
          this.$emit('creationFailed')
          console.log(err)
        })
      }).catch(err => {
        this.$Progress.fail()
        this.$emit('creationFailed', err.response.data)
        console.log(err)
      })
    }
  },
  components: {
    VueEditor
  }
}
