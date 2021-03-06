<template>
  <main id="receipt">
    <h3>
      Recebimentos
      <div id="edit" @click="isEditModal = true">
        <b-icon icon="edit"></b-icon>
      </div>
    </h3>
    <div class="content">
      <section>
        <article>
          <b-field label="Serviço">
            <div v-html="serviceSelected.name" class="textarea __disabled"></div>
            <!-- <b&#45;input v&#45;model="serviceSelected.name" placeholder="Jessica Miles" disabled></b&#45;input> -->
          </b-field>
          <b-field label="ID">
            <b-input v-model="serviceSelected.id" disabled></b-input>
          </b-field>
        </article>
        <article>
          <b-field label="Valor">
            <money class="input" :value="selected != undefined ? selected.value : undefined" v-money="money" :masked="true" disabled></money>
            <!-- <b&#45;input v&#45;model="" placeholder="500"></b&#45;input> -->
          </b-field>
          <b-field label="Data">
            <b-input :value="parseDate(selected != undefined ? selected.date : undefined)" v-mask="'##/##/####'" placeholder="DD/MM/YYYY" name="date" disabled></b-input>
          </b-field>
          <span>{{ errors.first('date') }}</span>
        </article>
        <!-- <button @click="createReceipt">Adicionar recebimento</button> -->
      </section>
      <section class="__secundary">
        <div class="tableContainer">
          <header>
            <h4>
              Lista de Recebimentos
            </h4>
            <button class="buttons is-primary" @click="isModalActive = true">Adicionar</button>
          </header>
          <b-table ref="table" :data="serviceReceipts" :paginated="true" :per-page="5" :selected.sync="selected" :show-detail-icon="false" detailed custom-detail-row detail-key="id">
            <template slot-scope="props">
              <b-table-column field="value" label="Valor">
                <span class="detailToggle" @click="toggle(props.row)">
                  {{ 'R$ ' + parseFloat(props.row.value) }}
                </span>
              </b-table-column>
              <b-table-column field="created_at" label="Data">
                {{ parseDate(props.row.date) }}
              </b-table-column>
            </template>
            <template slot="detail" slot-scope="props">
              <div class="tableDetails">
                <h5>Histórico</h5>
                <thead>
                  <tr>
                    <th>Usuário</th>
                    <th>Valor anterior</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item) in props.row.history" :key="item.id">
                    <td>{{ item.user.email }}</td>
                    <td>R$ {{ item.old_value }}</td>
                    <td>{{ parseDateTime(item.created_at) }}</td>
                  </tr>
                </tbody>
              </div>
            </template>
            <template slot="empty">
              <section class="section">
                <div class="empty has-text-grey has-text-centered">
                  <p>
                    <b-icon icon="frown" size="is-large"></b-icon>
                  </p>
                  <p>Nenhum recebimento para esse serviço.</p>
                </div>
              </section>
            </template>
          </b-table>
        </div>
      </section>
    </div>
    <b-modal :onCancel="restoreCreate" :active.sync="isModalActive">
      <main id="createReceipt">
        <header>
          <h3>
            Recebimento
          </h3>
        </header>
        <form @submit.prevent="createReceipt">
          <b-field label="Data">
            <b-datepicker v-model="receipt.date" v-mask="'##/##/####'" placeholder="Data do recebimento" name="date" :date-formatter="(date) => date.toLocaleDateString('pt-BR')" required></b-datepicker>
          </b-field>
          <b-field label="Valor (R$)">
            <b-input type="number" step="0.01" v-model="receipt.value" placeholder="300,00" name="value" required></b-input>
          </b-field>
          <button type="submit">Criar</button>
        </form>
      </main>
    </b-modal>
    <b-modal :active.sync="isEditModal" v-if="selected">
      <main id="editReceipt">
        <header>
          <h3>
            Recebimento
          </h3>
        </header>
        <form @submit.prevent="editReceipt">
          <b-field label="Data">
            <b-datepicker v-model="selected.created_at" v-mask="'##/##/####'" placeholder="Data do recebimento" name="date" :date-formatter="(date) => date.toLocaleDateString('pt-BR')" required></b-datepicker>
          </b-field>
          <b-field label="Valor (R$)">
            <b-input type="number" step="0.01" v-model="selected.value" placeholder="300,00" name="date" required></b-input>
          </b-field>
          <button type="submit">Atualizar</button>
        </form>
      </main>
    </b-modal>
  </main>
</template>

<script>
import moment from 'moment'
import { mapGetters, mapActions } from 'vuex'
import { header } from '../../../config/index.js'
moment.locale('pt-BR')
export default {
  name: 'serviceReceipts',
  data () {
    return {
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: true
      },
      showDetailIcon: false,
      isModalActive: false,
      isEditModal: false,
      service: undefined,
      serviceReceipts: [],
      receiptSelected: undefined,
      client: undefined,
      receipt: {
        value: null,
        date: new Date()
      },
      dataRegex: {
        regex: /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)(((1)(9)[0-9][0-9])|((2)[0][0-9][0-9]))$/
      }
    }
  },
  computed: {
    ...mapGetters([
      'serviceSelected'
    ]),
    selected: {
      get () {
        return this.receiptSelected ? this.receiptSelected : this.serviceReceipts[0]
      },
      set (newVal) {
        this.receiptSelected = newVal
      }
    }
  },
  watch: {
    '$route.params.service_id' () {
      this.getServiceReceipts()
    }
  },
  beforeMount () {
    this.getServiceReceipts()
  },
  methods: {
    ...mapActions([
      'updateService'
    ]),
    parseDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    restoreCreate () {
      this.receipt.date = new Date()
      this.receipt.value = null
    },
    getServiceReceipts () {
      this.$http.get(this.$api({
        target: `service-receipts/${this.serviceSelected.id}`,
        conn: this.$store.getters.conn
      }), {
        headers: header()
      }).then(response => {
        this.serviceReceipts = response.data.map(s => {
          s.created_at = new Date(s.created_at)
          return s
        })
      })
    },
    getService () {
      this.$http.get(this.$api({
        target: `service/${this.$route.params.service_id}`,
        conn: this.$store.getters.conn
      }), {
        headers: header()
      }).then(response => {
        this.service = response.data
        return response.data.service_receipts.map(s => {
          s.created_at = new Date(s.created_at)
          return s
        })
      }).then(sr => {
        this.serviceReceipts = sr
      })
    },
    parseDateTime (date) {
      return moment(date).format('HH:mm - D/MM/Y')
    },
    parseValue () {
    },
    createReceipt () {
      let data = {
        service_id: this.$route.params.service_id,
        receipt: {
          date: this.receipt.date,
          value: this.receipt.value
        }
      }
      this.$Progress.start()
      this.$http.post(this.$api({
        target: 'receipts',
        conn: this.$store.getters.conn
      }), data, {
        headers: header()
      }).then(response => {
        this.$Progress.finish()
      }).catch(err => {
        this.$Progress.fail()
        this.$toasted.error(err.response.data, {
          theme: 'bubble',
          position: 'top-center',
          duration: 1000,
          onComplete: () => {
            this.receipt.value = null
            this.getService()
            this.isModalActive = false
          }
        })
      })
      // this.$http.post(this.$api({ target: 'receipts' }), data, {
      //   headers: header()
      // }).then(() => {
      //   this.$http.get(this.$api({ target: `service/${this.$route.params.receipt_id}` }), {
      //     headers: header()
      //   }).then(response => {
      //     this.service = response.data
      //     this.serviceReceipts = response.data.service_receipts
      //     this.isModalActive = false
      //   })
      // })
    },
    editReceipt () {
      let data = {
        id: this.$route.params.service_id,
        service_id: this.$route.params.service_id,
        receipt: {
          date: this.selected.date,
          value: this.selected.value
        }
      }
      this.$Progress.start()
      this.$http.put(this.$api({
        target: 'receipt',
        conn: this.$store.getters.conn
      }), data, {
        headers: header()
      }).then(response => {
        this.$Progress.finish()
        this.getService()
        this.isEditModal = false
      })
    },
    toggle (row) {
      this.$refs.table.toggleDetails(row)
    }
  }
}
</script>
