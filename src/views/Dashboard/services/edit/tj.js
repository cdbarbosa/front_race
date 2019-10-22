import _ from 'lodash'
import serviceEdit from '../../../../mixins/serviceEdit'
export default {
  name: 'serviceUpdate',
  mixins: [serviceEdit],
  data () {
    return {
      radio: ''
    }
  },
  watch: {
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
      }, 300)
    },
    profit: {
      get () {
        return this.service.profit
      },
      set: _.debounce(function (newVal) {
        this.updateServiceSelected(['profit', newVal])
      }, 300)
    },
    description: {
      get () {
        return this.service.description
      },
      set: _.debounce(function (newVal) {
        this.updateServiceSelected(['description', newVal])
      }, 300)
    },
    confidentiality: {
      get () {
        return this.service.confidentiality_id
      },
      set: _.debounce(function (newVal) {
        this.updateServiceSelected(['confidentiality_id', newVal])
      }, 300)
    },
    delivered: {
      get () {
        return this.service.delivered ? new Date(this.service.delivered) : null
      },
      set: _.debounce(function (newVal) {
        this.updateServiceSelected(['delivered', newVal])
      }, 300)
    },
    forecast: {
      get () {
        return isNaN(new Date(this.service.forecast)) ? null : new Date(this.service.forecast)
      },
      set: _.debounce(function (newVal, oldVal) {
        this.updateServiceSelected(['forecast', newVal])
      }, 300)
    },
    received_value: {
      get () {
        return this.service.received_value
      },
      set: _.debounce(function (newVal) {
        this.updateServiceSelected(['received_value', newVal])
      }, 300)
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
  }
}
