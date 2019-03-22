<template>
  <div id="receipt">
    <div class="content" style="margin-bottom: 0" v-if="serviceSelected !== undefined">
      <div class="infoClient">
        <h1>Recebimento</h1>
        <div class="client">
          <b-field label="Serviço">
            <b-input v-model="serviceSelected.name" placeholder="Jessica Miles" disabled></b-input>
          </b-field>
          <b-field label="ID">
            <b-input v-model="serviceSelected.id" disabled></b-input>
          </b-field>
        </div>
        <hr>
      </div>
      <div class="infoService">
        <div class="serviceTable">
          <div class="headerTable">
            <h4>Recebimentos</h4>
            <button class="buttons is-primary" @click="isModalActive = true">Adicionar novo recebimento</button>
          </div>
          <b-table :data="serviceReceipts" :paginated="true" :per-page="5" focusable style="padding-top: 1rem">
            <template slot-scope="props">
              <b-table-column field="name" label="ID" sortable>
                {{ props.row.id }}
              </b-table-column>
              <b-table-column field="created_at" label="Valor">
                {{ props.row.value }}
              </b-table-column>
              <b-table-column field="user.email" label="Data">
                {{ parseDate(props.row.date) }}
              </b-table-column>
            </template>
          </b-table>
        </div>
      </div>
    </div>
    <div class="modalCreate">
       <b-modal :active.sync="isModalActive">
        <div class="appearAdd">
          <div class="inputs">
            <b-field label="Valor">
              <b-input v-model="receiptSelec.value" placeholder="500"></b-input>
            </b-field>
            <b-field label="Date">
              <b-input v-model="receiptSelec.date" v-validate="{regex: dataRegex.regex}" v-mask="'##/##/####'" placeholder="DD/MM/YYYY" name="date"></b-input>
            </b-field>
            <span>{{ errors.first('date') }}</span>
            <button @click="createReceipt">Adicionar recebimento</button>
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapActions } from 'vuex'
import { header } from '../../../config/index.js'
export default {
  name: 'VueReceive',
  data () {
    return {
      isModalActive: false,
      serviceSelected: undefined,
      serviceReceipts: undefined,
      client: undefined,
      receiptSelec: {
        value: undefined,
        date: undefined
      },
      dataRegex: {
        regex: /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)(((1)(9)[0-9][0-9])|((2)[0][0-9][0-9]))$/
      }
    }
  },
  computed: {
  },
  beforeRouteEnter (to, from, next) {
    next($this => {
      $this.$http.get($this.$api({ target: `service/${$this.$route.params.receipt_id}` }), {
        headers: header()
      }).then(response => {
        $this.serviceSelected = response.data
        $this.serviceReceipts = response.data.service_receipts
      })
      // console.log(from)
    })
  },
  methods: {
    ...mapActions([
      'updateService'
    ]),
    parseDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    createReceipt () {
      let data = {
        service_id: this.$route.params.receipt_id,
        receipt: this.receiptSelec
      }
      this.$http.post(this.$api({ target: 'receipts' }), data, {
        headers: header()
      }).then(() => {
        this.$http.get(this.$api({ target: `service/${this.$route.params.receipt_id}` }), {
          headers: header()
        }).then(response => {
          this.serviceSelected = response.data
          this.serviceReceipts = response.data.service_receipts
          this.isModalActive = false
        })
      })
    }
  }
}
</script>
