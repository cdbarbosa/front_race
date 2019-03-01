<template>
  <div id="receipt">
    <div class="content" style="margin-bottom: 0" v-if="serviceSelected !== undefined">
      <div class="infoClient">
        <h1>Recebimento</h1>
        <div class="client">
          <b-field label="Serviço">
            <b-input v-model="serviceSelected.name" placeholder="Jessica Miles"></b-input>
          </b-field>
          <b-field label="ID">
            <b-input v-model="serviceSelected.id"></b-input>
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
              <b-input v-model="receiptSelec.date" v-mask="'##/##/####'" placeholder="DD/MM/YYYY"></b-input>
            </b-field>
            <button @click="createReceipt">Adicionar recebimento</button>
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
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
      }
    }
  },
  computed: {
  },
  beforeMount () {
    this.$http.get(this.$api({ target: `service/${this.$route.params.id}` }), {
      headers: header()
    }).then(response => {
      console.log(response)
      this.serviceSelected = response.data
      this.serviceReceipts = response.data.service_receipts
    })
  },
  methods: {
    parseDate (date) {
      return moment().format('DD/MM/YYYY')
    },
    createReceipt () {
      let data = {
        service_id: this.$route.params.id,
        receipt: this.receiptSelec
      }
      this.$http.post(this.$api({ target: 'receipts' }), data, {
        headers: header()
      }).then(() => {
        this.$http.get(this.$api({ target: `service/${this.$route.params.id}` }), {
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