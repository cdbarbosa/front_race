import { header } from '../config/index.js'
export default {
  data () {
    return {
      birthdate: undefined,
      user: {
        email: undefined,
        type_id: undefined,
        document: undefined,
        birthdate: this.birthdate
      },
      address: {
        country: undefined,
        state: undefined,
        city: undefined,
        neighborhood: undefined,
        address: undefined,
        postal_code: undefined
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
        }
      }
    }
  },
  watch: {
    birthdate (newVal) {
      if (newVal.length === 10) {
        let year = (new Date()).getFullYear()
        let birth = parseInt(newVal.substr(newVal.length - 4))
        if (birth > year) {
          // exibir notificação de erro
          console.log('false')
          return false
        } else if ((year - birth) > 100) {
          console.log(false)
          // exibir notificação de erro
          return false
        } else {
          console.log(true)
          return true
        }
      }
    }
  },
  methods: {
    createUser () {
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
