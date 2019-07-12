import { mapActions } from 'vuex'
import { header } from '../../../../config/index.js'
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
  created () {
    if (!this.service.tj) {
      this.updateServiceSelectedTj(['type_id', 1])
      this.updateServiceSelectedTj(['cost', null])
    }
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
        return this.service.delivered ? new Date(this.service.delivered) : null
      },
      set: _.debounce(function (newVal) {
        this.updateServiceSelected(['delivered', newVal])
      }, 1000)
    },
    forecast: {
      get () {
        return isNaN(new Date(this.service.forecast)) ? null : new Date(this.service.forecast)
      },
      set: _.debounce(function (newVal, oldVal) {
        console.log(newVal, oldVal)
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
    },
    tjType: {
      get () {
        return this.service.tj.type_id
      },
      set (newVal) {
        this.updateServiceSelectedTj(['type_id', newVal])
      }
    },
    tjCost: {
      get () {
        return parseFloat(this.service.tj.cost)
      },
      set (newVal) {
        this.updateServiceSelectedTj(['cost', newVal])
      }
    }
  },
  methods: {
    ...mapActions([
      'updateService',
      'updateServiceSelected',
      'postServiceSelected',
      'updateServiceSelectedTj'
    ]),
    getServiceStatuses () {
      this.$http.get(this.$api({ target: 'service-status', clerance: this.$store.getters.user.role.name }), {
        headers: header()
      }).then(response => {
        this.serviceStatuses = response.data
      })
    },
    parseDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    lockDate (status) {
      const LOCKED = [10, 14, 15]
      // 10, 14, 15
      if (LOCKED.indexOf(status.id) !== -1) return true
      return false
    },
    updateFunction () {
      this.$Progress.start()
      this.postServiceSelected([this, this.service]).then(response => {
        this.$Progress.finish()
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
