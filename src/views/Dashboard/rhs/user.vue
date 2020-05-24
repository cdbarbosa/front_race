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
      <section>
        <b-field label="Custo (hora)">
          <money v-if="selected.cost" class="input" :value="parseFloat(selected.cost)" v-money="money" :masked="true" disabled></money>
          <div v-else class="textarea __disabled" disabled></div>
        </b-field>
        <b-field label="Competências">
          <div class="textarea __disabled" v-html="selected.competencies" disabled></div>
        </b-field>
        <b-field label="Experiência">
          <div class="textarea __disabled" v-html="selected.experience"></div>
        </b-field>
      </section>
    </div>
    <b-modal :onCancel="restorePerfil" :active.sync="isEditActive">
      <edit-rh :rh="rhSelected" :selectedIndex="0" @updated="getPerfil"></edit-rh>
    </b-modal>
    <b-modal :active.sync="critical">
      <h2>Aviso</h2>
      Algumas informações sobre a sua identidade estão pendentes. Favor informa-lás para que seu perfil seja elegível para participações em nossa rede colaborativa.
      <h3>Informações Críticas</h3>
      <h4><span class="__danger">Atenção!</span> As informações criticas abaixo não podem ser alteradas uma vez enviadas. Caso seja necessário uma alteração, entrar em contato!</h4>
      <ol>
        <li v-if="!selected.user.document">Documentação</li>
        <li v-if="!selected.user.birthday && selected.user.type_id == 2">Data de nascimento</li>
      </ol>
      <h3>Informações Adicionais</h3>
      <ol>
        <li v-if="!selected.cost">Custo</li>
        <li v-if="!selected.user.address.country">País</li>
        <li v-if="!selected.user.address.state">Estado</li>
        <li v-if="!selected.user.address.city">Cidade</li>
        <li v-if="!selected.user.address.neighborhood">Bairro</li>
        <li v-if="!selected.user.address.address">Logradouro</li>
        <li v-if="!selected.user.address.postal_code">CEP</li>
      </ol>
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
      critical: false,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: true
      },
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
    selected () {
      this.critical = this.checkCritical()
    }
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
      this.$http.get(this.$api({
        target: `rh/${this.$store.getters.user.id}`,
        conn: this.$store.getters.conn
      }), {
        headers: header()
      }).then(response => {
        this.selected = response.data
        this.setRhSelected(response.data)
        if (!response.data.approved) this.$router.push({ name: 'approvedCheck' })
      })
    },
    restorePerfil () {
      this.$http.get(this.$api({
        target: `rh/${this.$store.getters.user.id}`,
        conn: this.$store.getters.conn
      }), {
        headers: header()
      }).then(response => {
        this.selected = response.data
        this.setRhSelected(response.data)
      })
    },
    checkCritical () {
      // let rh = this.selected
      let user = this.selected.user
      console.log(user)
      if (!user.document) {
        console.log('missing document')
        return true
      }
      if (user.type_id === 2) {
        if (!user.birthdate) {
          console.log('missing birthday')
          return true
        }
      }
      return false
    }
  },
  components: {
    genericUser,
    editRh
  }
}
</script>
