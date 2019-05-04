import { header } from '../../../config/index.js'
import { mapActions } from 'vuex'
import userCreate from '../../../mixins/userCreate'
import { VueEditor } from 'vue2-editor'
export default {
  name: 'create-rh',
  props: ['open'],
  mixins: [userCreate],
  data () {
    return {
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }]
      ],
      rh: {
        name: null,
        phone: null,
        cost: null,
        competencies: null,
        observations: null,
        experience: null,
        academic: {
          area: null,
          titulation: null
        },
        activity: null
      },
      money: {
        decimal: '.',
        thousands: ',',
        prefix: 'R$ ',
        precision: 2
      }
    }
  },
  watch: {
  },
  computed: {
  },
  methods: {
    ...mapActions([
      'getRhs',
      'setRhs'
    ]),
    createRh () {
      this.rh.cost = parseFloat(this.rh.cost.split(' ')[1])
      this.createUser().then(userId => {
        let data = {
          user_id: userId,
          rh: this.rh
        }
        this.$http.post(this.$api({ target: 'rhs' }), data, {
          headers: header()
        }).then(response => {
          this.getRhs(this).then(rhs => {
            this.setRhs(rhs)
            this.$emit('rhCreated')
          })
        }).catch(err => {
          this.$emit('creationFailed')
          console.log(err)
        })
      }).catch(err => {
        this.$emit('creationFailed')
        console.log(err)
      })
    }
  },
  components: {
    VueEditor
  }
}
