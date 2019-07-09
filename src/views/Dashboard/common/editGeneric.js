import moment from 'moment'
import _ from 'lodash'
moment.locale('pt-BR')
export default {
  name: 'editGeneric',
  props: ['person', 'title'],
  data () {
    return {
      update: undefined
    }
  },
  methods: {
    parseDate (date) {
      return moment(date).format('DD/MM/YYYY')
    }
  },
  beforeMount () {
    this.update = this.title === 'Cliente' ? 'client' : 'rh'
  },
  computed: {
    name: {
      get () {
        return this.person.name
      },
      set: _.debounce(function (newVal) {
        this.$emit('change', ['name', '', newVal])
      }, 400)
    },
    phone: {
      get () {
        return this.person.phone
      },
      set: _.debounce(function (newVal, oldVal) {
        this.$emit('change', ['phone', '', newVal])
      }, 400)
    },
    email: {
      get () {
        return this.person.user.email
      },
      set: _.debounce(function (newVal) {
        this.$emit('change', ['email', 'user', newVal])
      }, 400)
    },
    address: {
      get () {
        return this.person.user.address.address
      },
      set: _.debounce(function (newVal) {
        this.$emit('change', ['address', 'address', newVal])
      }, 400)
    },
    state: {
      get () {
        return this.person.user.address.state
      },
      set: _.debounce(function (newVal) {
        this.$emit('change', ['state', 'address', newVal])
      }, 400)
    },
    country: {
      get () {
        return this.person.user.address.country
      },
      set: _.debounce(function (newVal) {
        this.$emit('change', ['state', 'country', newVal])
      }, 400)
    },
    postal_code: {
      get () {
        return this.person.user.address.postal_code
      },
      set: _.debounce(function (newVal) {
        this.$emit('change', ['postal_code', 'address', newVal])
      }, 400)
    },
    neighborhood: {
      get () {
        return this.person.user.address.neighborhood
      },
      set: _.debounce(function (newVal) {
        this.$emit('change', ['neighborhood', 'address', newVal])
      }, 400)
    },
    city: {
      get () {
        return this.person.user.address.city
      },
      set: _.debounce(function (newVal) {
        this.$emit('change', ['city', 'address', newVal])
      }, 400)
    },
    complement: {
      get () {
        return this.person.user.address.complement
      },
      set: _.debounce(function (newVal) {
        this.$emit('change', ['complement', 'address', newVal])
      }, 400)
    },
    userActive: {
      get () {
        return this.person.user.active === 1 || this.person.user.active
      },
      set: _.debounce(function (newVal) {
        this.$emit('change', ['active', 'user', newVal])
      }, 50)
    },
    userType: {
      get () {
        return this.person.user.type_id
      },
      set: _.debounce(function (newVal) {
        this.document = ''
        this.birthdate = ''
        this.$emit('change', ['type_id', 'user', newVal])
      }, 50)
    },
    document: {
      get () {
        return this.person.user.document
      },
      set: _.debounce(function (newVal) {
        this.$emit('change', ['document', 'user', newVal])
      }, 400)
    },
    birthdate: {
      get () {
        return this.person.user.birthdate ? new Date(this.person.user.birthdate) : null
      },
      set: _.debounce(function (newVal) {
        this.$emit('change', ['birthdate', 'user', moment(newVal).format()])
      }, 400)
    }
  }
}
