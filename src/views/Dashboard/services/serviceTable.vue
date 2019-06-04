<template>
    <div class="content" id="table">
      <section class="__secundary">
        <div class="tableContainer">
          <header>
            <h4>Serviços</h4>
            <b-input placeholder="Procurar..." v-model="searchQuery"></b-input>
            <!-- <b-input placeholder="Procurar por documento" v-model="searchDocument"></b-input> -->
            <span @click="searchQuery = ''">
              <i class="fas fa-backspace"></i>
            </span>
            <div id="edit" @click="isFilterModal = true">
              <b-icon icon="cog"></b-icon>
            </div>
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
</template>

<script>
export default{
  name: 'serviceTable'
}
</script>
