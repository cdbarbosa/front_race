import { mapActions } from 'vuex'
import service from './service'
import moment from 'moment'
import serviceEdit from './edit.vue'
import success from '../common/create-messages/success'
import error from '../common/create-messages/error'
import createService from './create.vue'
import _ from 'lodash'
import filterService from './Filters.vue'
import { header } from '../../../config/index.js'
import serviceTable from '../common/service/serviceTable.vue'
import { saveAs } from 'file-saver'
import extenso from 'extenso'

moment.locale('pt-BR')
export default {
  name: 'showServices',
  props: ['clientServices'],
  data () {
    return {
      isEditActive: false,
      isFilterModal: false,
      checkboxGroup: [],
      serviceStatuses: [],
      radio: '',
      serviceCreated: undefined,
      tableSelected: undefined,
      isServiceModalActive: false,
      serviceTableOptions: {
        filter: true,
        search: true,
        link: false
      }
    }
  },
  computed: {
    services: {
      get () {
        return this.$store.getters.services
      },
      set (newVal) {
        this.setServices(newVal)
      }
    },
    serviceSelected: {
      get () {
        return this.$store.getters.serviceSelected
      },
      set (service) {
        this.setServiceSelected(service)
      }
    },
    selectedIndex () {
      return this.serviceSelected ? this.services.findIndex(service => service.id === this.serviceSelected.id) : 0
      // return this.serviceSelected ? this.services.findIndex(service => service.id === this.serviceSelected.id) : (this.$route.params.service_id ? this.services.findIndex(this.$route.params.service_id) : 0)
    },
    serviceFilters () {
      return this.$store.getters.serviceFilters.serviceFilters
    },
    statusFilters () {
      return this.$store.getters.serviceFilters.statusFilters
    },
    clientFilters () {
      return this.$store.getters.serviceFilters.clientFilters
    },
    filterActive () {
      let ret = false
      Object.keys(this.$store.getters.serviceFilters).forEach(fi => {
        if (fi !== 'name') {
          // if (this.$store.getters.serviceFilters[fi]) ret = true
          if (this.$store.getters.serviceFilters[fi].filter(f => f.active).length) ret = true
        }
      })
      return ret
    },
    textValue () {
      return extenso(this.serviceSelected.total_cost)
    },
    searchQuery: {
      get () {
        return this.$store.getters.serviceFilters.name
      },
      set: _.debounce(function (newQuery) {
        this.setServiceQuery(newQuery)
      }, 500)
    },
    lastServiceSelected: {
      get () {
        return this.$store.getters.lastServiceSelected
      },
      set (index) {
        this.setLastServiceSelected(index >= 0 ? index : 0)
      }
    }
  },
  watch: {
    services () {
      this.tableSelected = this.services[this.selectedIndex]
    },
    selectedIndex () {
      this.$router.push({ name: 'service', params: { service_id: this.serviceSelected.id } })
    },
    isServiceModalActive (newVal) {
      if (!newVal) {
        this.serviceCreated = undefined
      }
    },
    isModalActive (newVal) {
      if (!newVal) this.serviceCreated = undefined
    },
    searchQuery (newQuery, oldQuery) {
      if (newQuery === '' || newQuery === oldQuery) this.restoreServices()
      else this.filterServices()
    },
    selected (newVal) {
      if (this.services.length > 0) {
        this.$router.push({ name: 'service', params: { service_id: newVal.id } })
      }
    }
  },
  beforeMount () {
    this.getServiceStatuses()
    this.get()
  },
  beforeDestroy () {
    this.lastServiceSelected = this.selectedIndex
  },
  methods: {
    ...mapActions([
      'getServices',
      'setServices',
      'setService',
      'setServiceSelected',
      'setLastServiceSelected',
      'setServiceQuery',
      'setServiceFilters',
      'updateService'
    ]),
    get () {
      if (this.filterActive || this.$store.getters.serviceFilters.name) this.filterServices()
      else this.getAllServices()
    },
    getAllServices () {
      this.getServices(this).then(services => {
        if (services.length) {
          this.services = services
          if (this.$route.params.service_id) {
            this.serviceSelected = this.services[this.findIndex(this.$route.params.service_id)]
          } else {
            const index = this.lastServiceSelected !== undefined ? this.lastServiceSelected : 0
            this.$router.push({ name: 'service', params: { service_id: this.services[index].id } })
            this.serviceSelected = this.services[index]
          }
        }
      })
    },
    filterServices () {
      let data = {
        name: this.searchQuery,
        clientFilters: this.clientFilters.filter(f => f.active),
        serviceFilters: this.serviceFilters.filter(f => f.active),
        statusFilter: this.statusFilters.filter(f => f.active)
      }
      this.$http.post(this.$api({
        target: 'filter-service',
        conn: this.$store.getters.conn,
        clerance: this.$store.getters.user.role.name
      }), data, {
        headers: header()
      }).then(response => {
        this.services = response.data
        this.serviceSelected = this.services.length ? this.services[this.lastServiceSelected !== undefined ? this.lastServiceSelected : 0] : null
        this.isFilterModal = false
      })
    },
    getServiceStatuses () {
      this.$http.get(this.$api({
        target: 'service-status',
        clerance: this.$store.getters.user.role.name,
        conn: this.$store.getters.conn
      }), {
        headers: header()
      }).then(response => {
        this.serviceStatuses = response.data
      })
    },
    restoreServices () {
      this.getServices(this).then(services => {
        this.services = services
        this.serviceSelected = services[this.lastServiceSelected !== undefined ? this.lastServiceSelected : 0]
      })
      this.searchQuery = ''
    },
    restoreServiceSelected () {
      this.$http.get(this.$api({
        target: `service/${this.serviceSelected.id}`,
        conn: this.$store.getters.conn
      }), {
        headers: header()
      }).then(response => {
        this.serviceSelected = response.data
        this.setService([this.selectedIndex, this.serviceSelected])
        // this.updateService([response.data, this.selectedIndex])
        // this.setClientSelected(this.clients[this.selectedIndex])
      })
      // this.setServiceSelected(this.services[this.selectedIndex])
    },
    parseModal () {
      if (this.serviceCreated === undefined) {
        return 'createService'
      } else if (this.serviceCreated === true) {
        return 'success'
      }
      return 'error'
    },
    resetFilters () {
      this.getServices(this).then(services => {
        this.services = services
      })
      this.tableSelected = this.services[0]
    },
    findIndex (id) {
      return this.services.findIndex(service => service.id === id)
    },
    parseDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    watchStatusFilters (e) {
      if (e) {
        this.setServiceFilters([0, 'statusFilters', 'active', true])
        this.filterServices()
      } else {
        this.setServiceFilters([0, 'statusFilters', 'active', false])
        this.restoreServices()
      }
    },
    log () {
      this.isServiceModalActive = true
    },
    saveFile () {
      const service = this.serviceSelected
      const client = this.serviceSelected.client
      const address = this.serviceSelected.client.user.address

      const header = `
#! RACE
##=======================================================================================
## CONTRATADA...: RACE - REDE DE ASSESSORIA E CONSULTORIA EM ESTATÍSTICA
## CNPJ.........: 28.683.999/0001-30
## ENDEREÇO.....: Rua Jacarandá, 375, Torre Sul, Apt 707, São Francisco - Ilhéus - Bahia
## REPRESENTANTE: Isabel Fernanda Da Silva Caleare
## ESTADO CIVIL.: Casada
## PROFISSÃO....: Empresária
## RG/SSP.......: 986.247.16/PR
## TELEFONE.....: 55(73)99949.8982
## CPF..........: 057.963.879-01
## EMAIL........: contato@race.srv.br
##=======================================================================================

#! SERVIÇO
##=======================================================================================
## TÍTULO..........: ${service.name} 
## PREV. DE ENTREGA: ${moment(service.forecast).format('DD/MM/YYYY', { mode: 'currency', number: { decimal: 'informal' } })}
## VALOR...........: R$ ${service.total_cost.toFixed(2).split('.').join(',')} (${extenso(service.total_cost.toFixed(2).split('.').join(','))})
##=======================================================================================

#! CLIENTE
##=======================================================================================
## NOME....: ${client.name}
## TELEFONE: ${client.phone}
## EMAIL...: ${client.user.email}
## CPF/CNPJ: ${client.user.document}
## ENDEREÇO: ${address.address}, ${address.neighborhood}, ${address.city} - ${address.state}, ${address.postal_code}
##=======================================================================================
`
      // const serviceInfo = ''
      // const clientInfo = ''
      const rhsInfo = this.serviceSelected.rhs.map(r => this.getRhInfo(r))
      // const footer = ''
      // const div = ''
      let body = header + '\n' + rhsInfo
      let blob = new Blob([body.split('##=======================================================================================,').join('##=======================================================================================')], { type: 'text/plain;charset=utf-8' })
      saveAs(blob, `${service.name} - ${new Date().valueOf()}.txt`)
    },
    getRhInfo (rh) {
      const address = rh.user.address
      return `
#! RH
##=======================================================================================
## NOME...........: ${rh.name}
## TELEFONE.......: ${rh.phone}
## EMAIL..........: ${rh.user.email}
## CPF/CNPJ.......: ${rh.user.document}
## ENDEREÇO.......: ${address.address}, ${address.neighborhood}, ${address.city} - ${address.state}, ${address.postal_code}
## RESP.TÉCNICA...: ${rh.pivot.gotal}
## NÚMERO DE HORAS: ${rh.pivot.hours}
## CUSTO POR HORA.: ${rh.pivot.cost}
## CUSTO TOTAL....: ${rh.pivot.cost * rh.pivot.hours}
##=======================================================================================`
    },
    stripHtml (html) {
      let tmp = document.createElement('div')
      tmp.innerHTML = html
      return tmp.textContent || tmp.innerText || ''
    }
  },
  components: {
    service,
    createService,
    serviceEdit,
    success,
    error,
    filterService,
    serviceTable
  }
}
