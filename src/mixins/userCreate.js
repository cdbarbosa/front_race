import { header } from '../config/index.js'
import moment from 'moment'
export default {
  data () {
    return {
      user: {
        email: null,
        type_id: 1,
        document: null,
        birthdate: null
      },
      address: {
        country: null,
        state: null,
        city: null,
        neighborhood: null,
        address: null,
        postal_code: null
      },
      rules: {
        birthdate: {
          regex: /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)(((1)(9)[0-9][0-9])|((2)[0][0-9][0-9]))$/
        },
        email: {
          email: true
        },
        document: {
          regex: /^(([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2}))|([0-9]{2}.?[0-9]{3}.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2})$/
        },
        postal_code: {
          regex: /^[0-9]{2}\.?[0-9]{3}-[\d]{3}$/
        },
        date_before: {
          regex: /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)(((1)(9)[0-9][0-9])|((2)[0][0-9][0-9]))$/
        },
        number: {
          regex: /^([0-9]+)(%)$/
        }
      }
    }
  },
  watch: {
    'user.type_id' () {
      this.user.document = null
    },
    'user.birthdate' (newVal) {
      if (newVal.length === 10) {
        let year = (new Date()).getFullYear()
        let birth = parseInt(newVal.substr(newVal.length - 4))
        if (birth > year) {
          // exibir notificação de erro
          return false
        } else if ((year - birth) > 100) {
          console.log(false)
          // exibir notificação de erro
          return false
        } else {
          return true
        }
      }
    }
  },
  methods: {
    createUser () {
      this.user.birthdate = moment(this.user.birthdate).format()
      let data = {
        user: this.user
      }
      return new Promise((resolve, reject) => {
        this.$http.post(this.$api({ target: 'users' }), data, {
          headers: header()
        }).then(response => {
          let datas = {
            user_id: response.data.id,
            address: this.address
          }
          this.$http.post(this.$api({ target: 'addresses' }), datas, {
            headers: header()
          }).then(() => {
            resolve(datas.user_id)
          })
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
