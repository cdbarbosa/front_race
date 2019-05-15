<template>
  <main id="master">
    <h3>
      Serviços
      <div id="edit" @click="isEditActive = true" v-if="serviceSelected">
        <b-icon icon="edit"></b-icon>
      </div>
      <button id="createService" class="buttons is-primary" @click="log">Criar novo serviço</button>
    </h3>
    <div class="content" id="table">
      <section class="__secundary">
        <div class="tableContainer">
          <header>
            <h4>Serviços</h4>
            <b-input placeholder="Procurar..." v-model="searchQuery"></b-input>
            <span @click="searchQuery = ''">
              <i class="fas fa-backspace"></i>
            </span>
          </header>
        </div>
        <b-table :current-page.sync="currentPage" :data="services ? services : []" :selected.sync="selected" @update:selected="setServiceSelected($event)" :paginated="true" :per-page="perPage" focusable style="padding-top: 1rem">
          <template slot-scope="props">
            <b-table-column field="name" label="Titulo" sortable>
              {{ props.row.name }}
            </b-table-column>
            <b-table-column field="name" label="Cliente">
              {{ props.row == undefined ? undefined : props.row.client.name }}
            </b-table-column>
            <b-table-column field="created_at" label="Registro" sortable>
              {{ parseDate(props.row.created_at) }}
            </b-table-column>
            <b-table-column field="created_at" label="Previsão">
              {{ parseDate(props.row.forecast) }}
            </b-table-column>
            <b-table-column field="name" label="Situação" sortable>
              {{ props.row.status.abbreviation }}
            </b-table-column>
          </template>
          <template slot="empty">
            <section class="section">
              <div class="empty has-text-grey has-text-centered">
                <p>
                  <b-icon icon="frown" size="is-large"></b-icon>
                </p>
                <p>Nenhum serviço cadastrado.</p>
              </div>
            </section>
          </template>
        </b-table>
      </section>
    </div>
    <service :selected="serviceSelected"  v-if="serviceSelected"></service>
    <div class="content" v-else>
       <h2>Nenhum cliente cadastrado ou encontrado</h2>
    </div>
    <b-modal :active.sync="isServiceModalActive">
      <component :is="parseModal()" @serviceCreated="serviceCreated = true" @creationFailed="serviceCreated = false">
        <template v-slot:message>
          <h2>{{ serviceCreated ? 'Sucesso ao cadastrar um serviço' : 'Algo de errado aconteceu' }}</h2>
        </template>
      </component>
    </b-modal>
    <b-modal :onCancel="restoreServiceSelected" :active.sync="isEditActive">
      <service-edit :service="serviceSelected" :selectedIndex="selectedIndex" @updated="isEditActive = false"></service-edit>
    </b-modal>
  </main>
</template>
<script src="./vmaster.js"></script>
