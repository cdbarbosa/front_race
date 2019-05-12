<template>
  <main v-if="service" id="receipt">
    <h3>
      Recebimentos
    </h3>
    <div class="content">
      <section>
        <article>
          <b-field label="Serviço">
            <b-input v-model="service.name" placeholder="Jessica Miles" disabled></b-input>
          </b-field>
          <b-field label="ID">
            <b-input v-model="service.id" disabled></b-input>
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
          <b-table :data="serviceReceipts" :paginated="true" :per-page="5" :selected.sync="selected">
            <template slot-scope="props">
              <!-- <b&#45;table&#45;column field="name" label="ID" sortable> -->
              <!--   {{ props.row.id }} -->
              <!-- </b&#45;table&#45;column> -->
              <b-table-column field="created_at" label="Valor">
                {{ 'R$ ' + parseFloat(props.row.value) }}
              </b-table-column>
              <b-table-column field="user.email" label="Data">
                {{ parseDate(props.row.date) }}
              </b-table-column>
            </template>
          </b-table>
        </div>
      </section>
    </div>
    <b-modal :active.sync="isModalActive">
      <main>
        <header>
          <h3>
            Recebimento
          </h3>
        </header>
        <form @submit.prevent="createReceipt">
          <b-field label="Data">
            <b-datepicker v-model="receipt.date" v-mask="'##/##/####'" placeholder="10/10/1994" name="date" required></b-datepicker>
          </b-field>
          <b-field label="Valor (R$)">
            <b-input v-model="receipt.value" placeholder="300,00" name="date" required></b-input>
          </b-field>
          <button type="submit">Criar</button>
        </form>
      </main>
    </b-modal>
  </main>
</template>

<script>
import moment from 'moment'
import { mapActions } from 'vuex'
import { header } from '../../../config/index.js'
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
      service: undefined,
      serviceReceipts: [],
      serviceSelected: undefined,
      client: undefined,
      receipt: {
        value: null,
        date: null
      },
      dataRegex: {
        regex: /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)(((1)(9)[0-9][0-9])|((2)[0][0-9][0-9]))$/
      }
    }
  },
  computed: {
    selected: {
      get () {
        return this.serviceSelected ? this.serviceSelected : this.serviceReceipts[0]
      },
      set (newVal) {
        this.serviceSelected = newVal
      }
    }
  },
  beforeMount () {
    this.getService()
  },
  methods: {
    ...mapActions([
      'updateService'
    ]),
    parseDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    getService () {
      this.$http.get(this.$api({ target: `service/${this.$route.params.service_id}` }), {
        headers: header()
      }).then(response => {
        console.log(response)
        this.service = response.data
        this.serviceReceipts = response.data.service_receipts
      })
    },
    parseValue () {
    },
    createReceipt () {
      let data = {
        service_id: this.$route.params.service_id,
        receipt: {
          date: this.receipt.date,
          value: this.receipt.value.split('.').join('').split(',').join('.')
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
    }
  }
}
</script>
