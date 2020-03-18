import _ from 'lodash'
import { header } from '../config/index'
import { VueEditor } from 'vue2-editor'
import moment from 'moment'
import { mapActions } from 'vuex'

export default {
  props: ['service', 'selectedIndex'],
  data () {
    return {
      oldServiceStatus: null,
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
    this.oldServiceStatus = this.service.status_id
  },
  computed: {
    showJustificationBox () {
      if (this.oldServiceStatus !== 11 && this.service.status_id === 11) return true
      return false
    },
    justification: {
      get () {
        return this.$store.getters.serviceUpdateJustification
      },
      set: _.debounce(function (newVal) {
        this.setServiceUpdateJustification(newVal)
      }, 300)
    }
  },
  methods: {
    ...mapActions([
      'updateServiceSelected',
      'updateServiceSelectedTj',
      'setServiceUpdateJustification'
    ]),
    getServiceStatuses () {
      this.$http.get(this.$api({
        target: 'service-status',
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
