import { header } from '../config/index.js'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
    }
  },
  watch: {
  },
  methods: {
    ...mapActions([
      'updateClient'
    ])
  }
}
