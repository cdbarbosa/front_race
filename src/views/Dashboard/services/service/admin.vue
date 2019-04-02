<template>
  <main id="services">
    <h3>
      Serviços
      <div id="edit" @click="isEditActive = true" v-if="selected">
        <b-icon icon="edit"></b-icon>
      </div>
    </h3>
    <service :selected="selected"  v-if="selected"></service>
    <div class="content" v-else>
       <h2>Nenhum cliente cadastrado ou encontrado</h2>
    </div>
    <div class="content" id="table">
      <section class="__secundary">
        <header>
          <h4>Serviços</h4>
          <button class="buttons is-primary" @click="log">Criar novo serviço</button>
          <b-input placeholder="Procurar..." v-model="searchQuery"></b-input>
        </header>
        <b-table :data="services ? services : []" :selected.sync="selected" :paginated="true" :per-page="5" focusable style="padding-top: 1rem">
          <template slot-scope="props">
            <b-table-column field="name" label="Titulo" sortable>
              {{ props.row.name }}
            </b-table-column>
            <b-table-column field="name" label="Cliente">
              {{ props.row == undefined ? undefined : props.row.client.name }}
            </b-table-column>
            <b-table-column field="created_at" label="Registro">
              {{ parseDate(props.row.created_at) }}
            </b-table-column>
            <b-table-column field="created_at" label="Previsão">
              {{ parseDate(props.row.created_at) }}
            </b-table-column>
            <b-table-column field="name" label="Situação">
              {{ props.row.status.abbreviation }}
            </b-table-column>
          </template>
          <template slot="empty">
            <section class="section">
              <div class="empty has-text-grey has-text-centered">
                <p>
                  <b-icon icon="frown" size="is-large"></b-icon>
                </p>
                <p>Nothing here.</p>
              </div>
            </section>
          </template>
        </b-table>
      </section>
    </div>
    <b-modal :active.sync="isServiceModalActive">
      <component :is="parseModal()" @serviceCreated="serviceCreated = true" @creationFailed="serviceCreated = false">
        <template v-slot:message>
          <h2>{{ serviceCreated ? 'Sucesso ao cadastrar um serviço' : 'Algo de errado aconteceu' }}</h2>
        </template>
      </component>
    </b-modal>
    <b-modal :active.sync="isEditActive">
      <service-edit :service="selected" :selectedIndex="selectedIndex" @update="serviceSelected = services[selectedIndex]"></service-edit>
    </b-modal>
  </main>
</template>
<script>
import { mapActions } from 'vuex'
import service from '../service'
import moment from 'moment'
import serviceEdit from '../edit.vue'
import success from '../../common/create-messages/success'
import error from '../../common/create-messages/error'
import createService from '../create.vue'
import _ from 'lodash'
import { header } from '../../../../config/index.js'
export default {
  name: 'showServices',
  data () {
    return {
      isEditActive: false,
      checkboxGroup: [],
      radio: '',
      searchQuery: undefined,
      serviceCreated: undefined,
      serviceSelected: undefined,
      isServiceModalActive: false
    }
  },
  computed: {
    services: {
      get () {
        return this.$store.getters.services
      },
      set (newVal) {
        this.changeServices(newVal)
      }
    },
    selected: {
      get () {
        return this.serviceSelected ? this.serviceSelected : this.services[0]
      },
      set (newValue) {
        this.serviceSelected = newValue
      }
    },
    selectedIndex () {
      return this.services.findIndex(service => service.id === this.selected.id)
    }
  },
  watch: {
    isModalActive (newVal) {
      if (!newVal) this.serviceCreated = undefined
    },
    searchQuery: _.debounce(function (newQuery, oldQuery) {
      this.serviceSelected = undefined
      if (newQuery === '' && newQuery === oldQuery) {
        this.getServices(this)
      } else {
        this.searchServices(newQuery)
      }
    }, 500),
    selected (newVal) {
      if (this.services.length > 0) {
        this.$router.push({ name: 'service', params: { service_id: newVal.id } })
      }
    }
  },
  activated () {
    if (this.selected) {
      if (this.serviceSelected) this.$router.push({ name: 'service', params: { service_id: this.serviceSelected.id } })
      else this.$router.push({ name: 'service', params: { service_id: this.selected.id } })
    }
  },
  beforeMount () {
    this.getServices(this).then(services => {
      this.setServices(services)
    })
  },
  methods: {
    ...mapActions([
      'getServices',
      'changeServices',
      'setServices'
    ]),
    parseModal () {
      if (this.serviceCreated === undefined) {
        return 'createService'
      } else if (this.serviceCreated === true) {
        return 'success'
      }
      return 'error'
    },
    searchServices (title) {
      this.$http.get(this.$api({ target: 'service' }), {
        headers: header(),
        params: {
          search: title
        }
      }).then(response => {
        this.changeServices(response.data)
      })
    },
    parseDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    log () {
      this.isServiceModalActive = true
      console.log('here')
    }
  },
  components: {
    service,
    createService,
    serviceEdit,
    success,
    error
  }
}
</script>
