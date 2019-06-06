<template id="">
  <main id="master">
    <h3>
      Cliente
      <div id="edit" @click="isEditActive = true" v-if="clientSelected">
        <b-icon icon="edit"></b-icon>
      </div>
      <button id="createButton" class="buttons is-primary" @click="isModalActive = true">Cadastrar novo cliente</button>
    </h3>
    <div class="content __display">
      <section class="__secundary">
        <div class="tableContainer">
          <header>
            <h4>Clientes</h4>
            <b-input placeholder="Procurar por nome" v-model="searchQuery"></b-input>
            <b-input placeholder="Procurar por documento" v-mask="['###.###.###-##','##.###.###/####-##']" v-model="searchDocument"></b-input>
            <span @click="restoreClients()">
              <i class="fas fa-backspace"></i>
            </span>
            <div id="edit" @click="isFilterModal = true">
              <b-icon icon="cog"></b-icon>
            </div>
          </header>
          <b-table :data="clients" :selected.sync="selected" @update:selected="setClientSelected($event)" :paginated="true" :per-page="perPage" :current-page.sync="currentPage" focusable>
            <template slot-scope="props">
              <b-table-column field="name" label="Nome" sortable>
                {{ props.row.name }}
              </b-table-column>
              <b-table-column field="user.document" label="CPF/CNPJ">
                {{ props.row.user.document }}
              </b-table-column>
              <b-table-column field="user.email" label="Email">
                <a :href="`mailto:${props.row.user.email}`" target="_blank">{{ props.row.user.email }}</a>
              </b-table-column>
              <b-table-column field="phone" label="Telefone">
                {{ props.row.phone }}
              </b-table-column>
            </template>
            <template slot="empty">
              <section class="section">
                <div class="empty has-text-grey has-text-centered">
                  <p>
                    <b-icon icon="frown" size="is-large"></b-icon>
                  </p>
                  <p>Nenhum cliente cadastrado.</p>
                </div>
              </section>
            </template>
          </b-table>
        </div>
      </section>
    </div>
    <div class="content" v-if="clientSelected">
      <generic-user :person="clientSelected"></generic-user>
      <section>
        <b-field label="Observações">
          <div class="ql-editor textarea __disabled" v-html="clientSelected.observations"></div>
        </b-field>
        <b-field label="Atividade">
          <div class="ql-editor textarea __disabled" v-html="clientSelected.activity"></div>
          <!-- <b&#45;input v&#45;model="clientSelected.activity" placeholder="Produçaõ de PANIC" disabled></b&#45;input> -->
        </b-field>
      </section>
    </div>
    <div class="content" v-else>
      <h2>Nenhum cliente cadastrado ou encontrado</h2>
    </div>
    <b-modal :active.sync="isModalActive">
      <component :is="parseModal()" @clientCreated="clientCreated = true" @creationFailed="clientCreated = false">
        <template v-slot:message>
          <h2>{{ clientCreated ? 'Sucesso ao cadastrar um cliente' : 'Algo de errado aconteceu' }}</h2>
        </template>
      </component>
    </b-modal>
    <b-modal :onCancel="restoreClientSelected" :active.sync="isEditActive">
      <edit-client :client="clientSelected" :selectedIndex="selectedIndex" @updated="isEditActive = false"></edit-client>
    </b-modal>
    <b-modal :active.sync="isFilterModal">
      <filters-client @restore="restoreClients(); isFilterModal = false" @filter="searchClient" @reset="resetFilters()"></filters-client>
    </b-modal>
  </main>
</template>
<script src="./vmaster.js"></script>
