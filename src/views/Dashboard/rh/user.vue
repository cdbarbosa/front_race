<template>
  <main id="rhs" v-if="selected !== undefined">
    <h3>
      RH's User
      <div id="edit" @click="isEditActive = true">
        <b-icon icon="edit"></b-icon>
      </div>
    </h3>
    <div class="content">
      <generic-user :person="selected"></generic-user>
      <section>
        <b-field label="Competências">
          <div class="textarea __disabled" v-html="selected.competencies" disabled></div>
        </b-field>
        <b-field label="Experiência">
          <div class="textarea __disabled" v-html="selected.experience"></div>
        </b-field>
        <b-field label="Observações">
          <textarea v-model="selected.observations" name="" id="" cols="40" rows="4" disabled></textarea>
        </b-field>
      </section>
    </div>
    <b-modal :active.sync="isEditActive">
      <edit-rh :rh="selected" :selectedIndex="selectedIndex" @updateRh="rhSelected = rhs[selectedIndex]"></edit-rh>
    </b-modal>
  </main>
</template>
<script>
import { mapActions } from 'vuex'
import editRh from './edit.vue'
import genericUser from '../common/genericUser.vue'
import moment from 'moment'
import { header } from '../../../config/index.js'
export default {
  name: 'rhs',
  data () {
    return {
      isEditActive: false,
      rhCreated: undefined,
      isModalActive: false,
      rhSelected: undefined,
      searchQuery: undefined
    }
  },
  computed: {
    rhs: {
      get () {
        return this.$store.getters.rhs
      },
      set (newVal) {
        this.changeRh(this)
      }
    },
    selected: {
      get () {
        return this.rhSelected ? this.rhSelected : this.rhs[0]
      },
      set (newVal, oldVal) {
        this.rhSelected = newVal
      }
    },
    selectedIndex () {
      return this.rhs.findIndex(rh => rh.id === this.selected.id)
    },
    area: {
      get () {
        return this.selected.academics.length > 0 ? this.selected.academics[0].area : undefined
      }
    },
    degree: {
      get () {
        return this.selected.academics.length > 0 ? this.selected.academics[0].degree : undefined
      }
    }
  },
  watch: {
  },
  beforeMount () {
    this.$http.get(this.$api({ target: `rh/${this.$store.getters.user.id}` }), {
      headers: header()
    }).then(response => {
      this.rhSelected = response.data
    })
  },
  methods: {
    ...mapActions([
      'getRhs',
      'updateRh'
    ]),
    parseDate (date) {
      return moment(date).format('DD/MM/YYYY')
    }
  },
  components: {
    genericUser,
    editRh
  }
}
</script>
