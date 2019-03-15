import { header } from '../config/index.js'

const actions = {
  updateAddress (payload) {
    let that = payload[0]
    let data = payload[1]
    that.$http
      .put(that.$api({ target: 'address' }), data, {
        headers: header()
      })
      .then(response => {
        console.log(response)
      })
  }
}

export default {
  actions
}
