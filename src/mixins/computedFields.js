// import { header } from '../config/index.js'
import _ from 'lodash'
export default {
  computed: {
    email: {
      get () {
        return this.selected.user.email
      },
      set: _.debounce(function (newVal, oldVal) {
        // let data = {
        //   lable: 'email',
        //   value: newVal,
        //   id: this.selected.user.id
        // }
      }, 400)
    },
    address: {
      get () {
        return this.selected.user.address.address
      },
      set: _.debounce(function (newVal, oldVal) {
        // let data = {
        //   label: 'address',
        //   value: newVal,
        //   id: this.selected.user.id
        // }
      })
    },
    state: {
      get () {
        return this.selected.user.address.state
      },
      set: _.debounce(function (newVal, oldVal) {
        // let data = {
        //   label: 'state',
        //   value: newVal,
        //   id: this.selected.user.id
        // }
      })
    },
    postal_code: {
      get () {
        return this.selected.user.address.postal_code
      },
      set: _.debounce(function (newVal, oldVal) {
        // let data = {
        //   label: 'postal_code',
        //   value: newVal,
        //   id: this.selected.user.id
        // }
      })
    },
    neighborhood: {
      get () {
        return this.selected.user.address.neighborhood
      },
      set: _.debounce(function (newVal, oldVal) {
        // let data = {
        //   label: 'neighborhood',
        //   value: newVal,
        //   id: this.selected.user.id
        // }
      })
    },
    city: {
      get () {
        return this.selected.user.address.city
      },
      set: _.debounce(function (newVal, oldVal) {
        // let data = {
        //   label: 'city',
        //   value: newVal,
        //   id: this.selected.user.id
        // }
      })
    }
  }
}
