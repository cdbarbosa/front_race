import { mapActions } from 'vuex'
import { header } from '../../../config/index.js'
import _ from 'lodash'
import { VueEditor } from 'vue2-editor'
import moment from 'moment'
moment.locale('pt-BR')
export default {
  name: 'serviceUpdate',
  props: ['service', 'selectedIndex'],
  data () {
    return {
      serviceStatuses: [],
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }]
      ],
      radio: ''
    }
  },
  watch: {
  },
  beforeMount () {
    this.getServiceStatuses()
  },
  mounted () {
  },
  computed: {
    name: {
      get () {
        return this.service.name
      },
      set: _.debounce(function (newVal) {
        this.updateServiceSelected(['name', newVal])
      }, 1000)
    },
    profit: {
      get () {
        return this.service.profit
      },
      set: _.debounce(function (newVal) {
        this.updateServiceSelected(['profit', newVal])
      }, 1000)
    },
    description: {
      get () {
        return this.service.description
      },
      set: _.debounce(function (newVal) {
        this.updateServiceSelected(['description', newVal])
      }, 1000)
    },
    confidentiality: {
      get () {
        return this.service.confidentiality_id
      },
      set: _.debounce(function (newVal) {
        this.updateServiceSelected(['confidentiality_id', newVal])
      }, 1000)
    },
    delivered: {
      get () {
        return this.service.delivered ? new Date(this.service.delivered) : new Date()
      },
      set: _.debounce(function (newVal) {
        this.updateServiceSelected(['delivered', newVal])
      }, 1000)
    },
    forecast: {
      get () {
        return new Date(this.service.forecast)
      },
      set: _.debounce(function (newVal) {
        this.updateServiceSelected(['forecast', newVal])
      }, 1000)
    },
    received_value: {
      get () {
        return this.service.received_value
      },
      set: _.debounce(function (newVal) {
        this.updateServiceSelected(['received_value', newVal])
      }, 1000)
    },
    status: {
      get () {
        return this.service.status_id
      },
      set: _.debounce(function (newVal) {
        this.updateServiceSelected(['status_id', newVal])
      })
    }
  },
  methods: {
    ...mapActions([
      'updateService',
      'updateServiceSelected',
      'postServiceSelected'
    ]),
    getServiceStatuses () {
      this.$http.get(this.$api({ target: 'service-status' }), {
        headers: header()
      }).then(response => {
        this.serviceStatuses = response.data
      })
    },
    parseDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    updateFunction () {
      this.postServiceSelected([this, this.service]).then(response => {
        this.updateService([response.data, this.selectedIndex])
        this.$toasted.success('Serviço atualizado com sucesso!', {
          theme: 'bubble',
          position: 'top-center',
          duration: 300,
          onComplete: () => {
            this.$emit('updated')
          }
        })
      })
    }
  },
  components: {
    VueEditor
  }
}
