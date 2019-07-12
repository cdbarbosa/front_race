<template>
  <main id="rhs" v-if="selected !== undefined">
    <h3>
      Perfil
      <div id="edit" @click="isEditActive = true">
        <b-icon icon="edit"></b-icon>
      </div>
    </h3>
    <div class="content perfil_user">
      <generic-user :person="selected"></generic-user>
      <!-- <section>
        <b-field label="Competências">
          <div class="textarea __disabled" v-html="selected.competencies" disabled></div>
        </b-field>
        <b-field label="Experiência">
          <div class="textarea __disabled" v-html="selected.experience"></div>
        </b-field>
        <b-field label="Observações">
          <textarea v-model="selected.observations" name="" id="" cols="40" rows="4" disabled></textarea>
        </b-field>
      </section> -->
    </div>
    <b-modal :active.sync="isEditActive">
      <edit-rh :rh="rhSelected" :selectedIndex="0" @updated="getPerfil"></edit-rh>
    </b-modal>
  </main>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import editRh from './edit.vue'
import genericUser from '../common/genericUser.vue'
import moment from 'moment'
import { header } from '../../../config/index.js'
moment.locale('pt-BR')
export default {
  name: 'perfil',
  data () {
    return {
      isEditActive: false,
      rhCreated: undefined,
      isModalActive: false,
      // rhSelected: undefined,
      searchQuery: undefined,
      selected: undefined
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'rhSelected'
    ]),
    rhs: {
      get () {
        return this.$store.getters.rh
      },
      set (newVal) {
        this.changeRh(this)
      }
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
    this.getPerfil()
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'getRhs',
      'updateRh',
      'setRhSelected'
    ]),
    parseDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    getPerfil () {
      this.$http.get(this.$api({ target: `rh/${this.$store.getters.user.id}` }), {
        headers: header()
      }).then(response => {
        this.selected = response.data
        this.setRhSelected(response.data)
        if (!response.data.approved) this.$router.push({ name: 'approvedCheck' })
      })
    }
  },
  components: {
    genericUser,
    editRh
  }
}
</script>
