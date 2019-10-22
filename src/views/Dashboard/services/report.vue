<template>
  <main id="report">
    <h3>
      Relatórios
      <!-- <div id="edit" @click="isEditModal = true"> -->
      <!--   <b&#45;icon icon="edit"></b&#45;icon> -->
      <!-- </div> -->
    </h3>
    <div class="content">
      <section >
        <article>
          <b-field label="Serviço">
            <div v-html="serviceSelected.name" class="textarea __disabled"></div>
            <!-- <b&#45;input v&#45;model="serviceSelected.name" placeholder="Jessica Miles" disabled></b&#45;input> -->
          </b-field>
          <b-field label="ID">
            <b-input v-model="serviceSelected.id" disabled></b-input>
          </b-field>
        </article>
        <hr>
        <h3>
          Relatório
        </h3>
        <article v-if="selected" id="reportSelected">
          <b-field label="Arquivo" disabled>
            <div v-html="selected.file_name " class="textarea __disabled"></div>
          </b-field>
          <b-field label="Data" disabled>
            <div v-html="parseDateTime(selected.created_at)" class="textarea __disabled"></div>
          </b-field>
          <!-- <b&#45;field label="Data"> -->
          <!--   <b&#45;input :value="parseDate(selected != undefined ? selected.date : undefined)" v&#45;mask="'##/##/####'" placeholder="DD/MM/YYYY" name="date" disabled></b&#45;input> -->
          <!-- </b&#45;field> -->
          <!-- <button  class="__secundary" @click="downloadReport">Baixar relatório</button> -->
        </article>
        <article v-else>
          Nenhum relatório selecionado
        </article>
        <div id="technicalManager">
          <header>
            <h3>
              Relatório Assinado
            </h3>
            <h4>O relatório deverá ser impresso, assinado, scaneado e enviado novamente através da interface abaixo.</h4>
            <h5>Para atualizar o relatório assinado, basta enviar um novo arquivo.</h5>
          </header>
          <b-upload drag-drop @input="createChildReport" accept="application/pdf">
            <section class="section">
              <div class="content has-text-centered">
                <p>
                  <b-icon icon="upload" size="is-large"></b-icon>
                </p>
                <p>Arraste o arquivo assinado ou clique para selecionar.</p>
              </div>
            </section>
          </b-upload>
        </div>
      </section>
      <section class="__secundary">
        <div class="tableContainer">
          <header>
            <h4>
              Lista de Relatórios
            </h4>
            <button v-if="[1].indexOf($store.getters.user.role_id) !== -1" class="buttons is-primary" @click="isModalActive = true">Adicionar</button>
          </header>
          <b-table ref="table" :show-detail-icon="false" :data="serviceReports" :paginated="true" :per-page="5" :selected.sync="selected" detailed custom-detail-row detail-key="id">
            <template slot-scope="props">
              <b-table-column field="file_name" label="Arquivo">
                <span class="detailToggle" @click="toggle(props.row)">
                  {{ props.row.file_name }}
                </span>
              </b-table-column>
              <b-table-column field="created_at" label="Data">
                {{ parseDateTime(props.row.created_at) }}
              </b-table-column>
              <b-table-column field="user" label="Usuário">
                {{ props.row.user.email }}
              </b-table-column>
              <b-table-column field="created_at" centered>
                <p class="download" @click="downloadReport(props.row)">
                  <b-icon icon="download"></b-icon>
                </p>
              </b-table-column>
            </template>
            <template slot="detail" slot-scope="props">
              <div class="tableDetails">
                <h5>Relatórios assinados</h5>
                <div>
                  <thead>
                    <tr>
                      <th>Arquivo</th>
                      <th>Data</th>
                      <th>Usuário</th>
                      <th></th>
                      <!-- <th></th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in props.row.children" :key="index">
                      <td>{{ item.file_name}}</td>
                      <td>{{ parseDateTime(item.created_at) }}</td>
                      <td>{{ item.user.email }}</td>
                      <td>
                        <p @click="downloadReport(item)">
                        <b-icon icon="download" size="is-large"></b-icon>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </div>
              </div>
            </template>
            <template slot="empty">
              <section class="section">
                <div class="empty has-text-grey has-text-centered">
                  <p>
                    <b-icon icon="frown" size="is-large"></b-icon>
                  </p>
                  <p>Nenhum relatório para esse serviço.</p>
                </div>
              </section>
            </template>
          </b-table>
        </div>
      </section>
    </div>
    <b-modal :onCancel="restoreCreate" :active.sync="isModalActive">
      <main id="createReport">
        <header>
          <h3>
            Relatório
          </h3>
        </header>
        <b-upload drag-drop @input="createReport" accept="application/pdf">
          <section class="section">
            <div class="content has-text-centered">
              <p>
              <b-icon icon="upload" size="is-large"></b-icon>
              </p>
              <p>Arraste o relatório ou clique para selecionar um arquivo.</p>
            </div>
          </section>
        </b-upload>
        <!-- <form @submit.prevent="createReport"> -->
        <!--   <b&#45;upload @input="createReport"> -->
        <!--     <a class="button is&#45;primary"> -->
        <!--       <b&#45;icon icon="upload"></b&#45;icon> -->
        <!--       <span>Click to upload</span> -->
        <!--     </a> -->
        <!--   </b&#45;upload> -->
        <!--   <!&#45;&#45; <input type="file" v&#38;#45;model="file" value="" name="" id=""/> &#45;&#45;> -->
        <!--   <button type="submit">Enviar</button> -->
        <!-- </form> -->
      </main>
    </b-modal>
    <b-modal :active.sync="isEditModal">
      <main id="editReceipt">
        <header>
          <h3>
            Relatório
          </h3>
        </header>
        <form @submit.prevent="editReceipt">
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
import { saveAs } from 'file-saver'
moment.locale('pt-BR')
export default {
  name: 'serviceReports',
  data () {
    return {
      isEditModal: false,
      isModalActive: false,
      file: null,
      serviceReports: [],
      selected: null
    }
  },
  computed: {
    ...mapGetters([
      'serviceSelected'
    ])
  },
  watch: {
    '$route.params.service_id' () {
      this.getServiceReports()
    }
  },
  beforeMount () {
    this.getServiceReports()
  },
  methods: {
    ...mapActions([
    ]),
    restoreCreate () {
      // this.receipt.date = new Date()
      // this.receipt.value = null
    },
    getServiceReports () {
      this.$http.get(this.$api({
        target: `service-reports/${this.serviceSelected.id}`,
        conn: this.$store.getters.conn
      }), {
        headers: header()
      }).then(response => {
        this.serviceReports = response.data.map(s => {
          s.created_at = new Date(s.created_at)
          return s
        })
      }).then(() => {
        this.selected = this.serviceReports[0]
      })
    },
    parseDateTime (date) {
      return moment(date).format('HH:mm - D/MM/Y')
    },
    createReport (file) {
      this.toBase64(file).then(base64 => {
        let data = {
          service_id: this.$route.params.service_id,
          file: {
            file_name: file.name.split('.')[0],
            file_extension: file.name.split('.')[file.name.split('.').length - 1],
            base64: base64.split(',')[1]
          }
        }
        this.$Progress.start()
        this.$http.post(this.$api({
          target: 'service-report',
          conn: this.$store.getters.conn
        }), data, {
          headers: header()
        }).then(response => {
          this.$toasted.success('Relatório enviado com sucesso!', {
            theme: 'bubble',
            position: 'top-center',
            duration: 300,
            onComplete: () => {
              this.$Progress.finish()
              this.getServiceReports()
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
      })
    },
    createChildReport (file) {
      this.toBase64(file).then(base64 => {
        let data = {
          parent_id: this.selected.id,
          file: {
            file_name: file.name.split('.')[0],
            file_extension: file.name.split('.')[file.name.split('.').length - 1],
            base64: base64.split(',')[1]
          }
        }
        this.$Progress.start()
        this.$http.post(this.$api({
          target: 'service-child-report',
          conn: this.$store.getters.conn
        }), data, {
          headers: header()
        }).then(response => {
          this.$toasted.success('Relatório assinado enviado com sucesso!', {
            theme: 'bubble',
            position: 'top-center',
            duration: 300,
            onComplete: () => {
              this.$Progress.finish()
              this.getServiceReports()
              this.isModalActive = false
            }
          })
        })
      })
    },
    downloadReport (report) {
      this.$http.get(this.$api({
        target: `service-report/${report.id}`,
        conn: this.$store.getters.conn
      }), {
        headers: header()
      }).then(response => {
        fetch('data:application/pdf;base64,' + response.data).then(res => {
          return res.blob()
        }).then(blob => {
          saveAs(blob, `${report.file_name}.pdf`)
        })
      })
    },
    toBase64 (file) {
      return new Promise((resolve, reject) => {
        /* eslint-disable no-new */
        /* eslint-disable no-undef */
        let fr = new FileReader()
        fr.onload = e => {
          resolve(e.target.result)
        }
        fr.readAsDataURL(file)
      })
    },
    toggle (row) {
      this.$refs.table.toggleDetails(row)
    },
    editReport () {
      // let data = {
      //   id: this.$route.params.service_id,
      //   service_id: this.$route.params.service_id,
      //   receipt: {
      //     date: this.selected.date,
      //     value: this.selected.value
      //   }
      // }
      // this.$Progress.start()
      // this.$http.put(this.$api({
      //   target: 'receipt',
      //   conn: this.$store.getters.conn
      // }), data, {
      //   headers: header()
      // }).then(response => {
      //   this.$Progress.finish()
      //   this.getService()
      //   this.isEditModal = false
      // })
    }
  }
}
</script>
