import { header } from '../config/index'
import { VueEditor } from 'vue2-editor'
import moment from 'moment'
import { mapActions } from 'vuex'

const gets = {
  admin: 'service-status',
  tj: 'service-status-tj'
}

export default {
  props: ['service', 'selectedIndex'],
  data () {
    return {
      serviceStatuses: [],
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }]
      ]
    }
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
  methods: {
    ...mapActions([
      'updateService',
      'updateServiceSelected',
      'postServiceSelected',
      'updateServiceSelectedTj',
      'setServiceSelected'
    ]),
    getServiceStatuses () {
      this.$http.get(this.$api({
        target: gets[this.$store.getters.user.role.name],
        conn: this.$store.getters.conn
      }), {
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
    }
  },
  components: {
    VueEditor
  }
}
