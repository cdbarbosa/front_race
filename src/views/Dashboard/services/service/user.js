import { mapGetters } from 'vuex'
import moment from 'moment'
moment.locale('pt-BR')
export default {
  name: 'service',
  props: ['selected'],
  data () {
    return {
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: true
      },
      radio: ''
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  beforeMount () {
    // console.log(this.selected)
  },
  methods: {
    parseDate (date) {
      return date ? moment(date).format('DD/MM/YYYY') : null
    }
  }
}
