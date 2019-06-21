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
            <b-input v-model="serviceSelected.name" placeholder="Jessica Miles" disabled></b-input>
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
          <b-table :data="serviceReceipts" :paginated="true" :per-page="5" :selected.sync="selected" detailed custom-detail-row detail-key="value">
            <template slot-scope="props">
              <b-table-column field="value" label="Valor">
                {{ 'R$ ' + parseFloat(props.row.value) }}
              </b-table-column>
              <b-table-column field="created_at" label="Data">
                {{ parseDate(props.row.date) }}
              </b-table-column>
            </template>
            <template slot="detail" slot-scope="props">
              <div v-if="props.row.history.length">
                <h5>Histórico</h5>
                <tr>
                  <th>Usuário</th>
                  <th>Valor anterior</th>
                  <th>Data</th>
                </tr>
                <tr v-for="(item, index) in props.row.history" :key="index">
                  <td>{{ item.user.email }}</td>
                  <td>R$ {{ item.old_value }}</td>
                  <td>{{ parseDateTime(item.created_at) }}</td>
                </tr>
              </div>
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
            <b-input type="number" step="0.01" v-model="receipt.value" placeholder="300,00" name="date" required></b-input>
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
      this.$http.get(this.$api({ target: `service-receipts/${this.serviceSelected.id}` }), {
        headers: header()
      }).then(response => {
        this.serviceReceipts = response.data.map(s => {
          s.created_at = new Date(s.created_at)
          return s
        })
      })
    },
    getService () {
      this.$http.get(this.$api({ target: `service/${this.$route.params.service_id}` }), {
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
      this.$http.post(this.$api({ target: 'receipts' }), data, {
        headers: header()
      }).then(response => {
        this.getService()
        this.isModalActive = false
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
      this.$http.put(this.$api({ target: 'receipt' }), data, {
        headers: header()
      }).then(response => {
        this.getService()
        this.isEditModal = false
      })
    }
  }
}
</script>
