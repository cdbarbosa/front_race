<template>
  <div id="createService">
    <b-modal :active.sync="open">
      <div id="createService">
        <div class="service-informations" v-if="selected != undefined">
          <div class="description-service">
            <b-field label="Título">
              <textarea v-model="service.name" name=""  cols="50" rows="2"></textarea>
            </b-field>
            <div class="info-two">
              <b-field label="Previsão">
                <b-input v-model="service.forecast" v-validate="'regex: rules.date_before.regex, before: beforeTarget'" v-mask="'##/##/####'" placeholder="data" name="date" required></b-input>
              </b-field>
              <b-field label="Prazo">
                <b-input v-model="service.due_date" ref="beforeTarget" v-validate="rules.date_before" v-mask="'##/##/####'" placeholder="data" name="beforeTarget" required></b-input>
              </b-field>
            </div>
            <span>{{ errors.first('date') }}</span>
            <span>{{ errors.first('beforeTarget') }}</span>
            <div class="info-three">
              <b-field label="Cliente">
                <b-input v-model="selected.client.name" placeholder="Cliente" disabled></b-input>
              </b-field>
              <b-field label="Sigilo">
                <div class="block">
                  <b-radio v-model="radio" native-value="Nenhum">
                    Nenhum
                  </b-radio>
                  <b-radio v-model="radio" native-value="Parcial">
                    Parcial
                  </b-radio>
                  <b-radio v-model="radio" native-value="Total">
                    Total
                  </b-radio>
                </div>
              </b-field>
            </div>
            <div class="info-four">
              <b-field label="Margem">
                <b-input v-model="service.profit" placeholder="50%" v-validate="rules.number"name="margem" required></b-input>
              </b-field>
              <b-field label="Valor">
                <b-input v-model.lazy="service.value" v-money="money" placeholder="825" name="valor" required></b-input>
              </b-field>
              <b-field label="Recebido">
                <b-input placeholder="825" name="recebido" required></b-input>
              </b-field>
            </div>
            <span>{{ errors.first('margem') }}</span>
            <span>{{ errors.first('valor') }}</span>
            <span>{{ errors.first('recebido') }}</span>
            <b-field label="Situação">
              <b-select placeholder="Select a name">
                <option value="">Selecione</option>
                <option value="1">ORCA - Orçamento (em aberto)</option>
              </b-select>
            </b-field>
          </div>
          <div class="description">
            <b-field label="Observações">
              <textarea v-model="service.description" name="" id="" cols="35" rows="15"></textarea>
            </b-field>
            <div class="buttonsCreate">
              <button class="is-primary" @click="create">Cadastrar</button>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { header } from '../../../config/index.js'
export default {
  name: 'createService',
  props: ['open', 'selected.client.name', 'selected.client.id'],
  data () {
    return {
      radio: '',
      beforeTarget: '',
      service: {
        name: undefined,
        description: undefined,
        due_date: undefined,
        forecast: undefined,
        profit: undefined,
        status_id: 1,
        value: undefined
      },
      rules: {
        date_before: {
          regex: /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)(((1)(9)[0-9][0-9])|((2)[0][0-9][0-9]))$/
        },
        number: {
          regex: /^([0-9]+)(%)$/
        }
      },
      money: {
        decimal: '.',
        thousands: ',',
        prefix: 'R$ ',
        precision: 2,
        masked: false
      }
    }
  },
  computed: {
    ...mapGetters([
      'services'
    ]),
    selected: {
      get () {
        return this.serviceSelected ? this.serviceSelected : this.services[0]
      },
      set (newValue) {
        // this.serviceSelected = newValue
      }
    }
  },
  methods: {
    create () {
      this.service.value = parseFloat(this.service.value.split(' ')[1])
      let data = {
        client_id: this.selected.client.id,
        service: this.service
      }
      this.$http.post(this.$api({ target: 'services' }), data, {
        headers: header()
      }).then(response => {
        console.log(response)
        this.$router.push({ name: 'services' })
        this.$emit('update:open', false)
      })
    }
  }
}
</script>
