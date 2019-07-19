<template>
  <section class="__secundary">
    <div :class="[{create: create}, 'tableContainer']">
      <header>
        <h4>
          <slot name="title"></slot>
        </h4>
        <slot name="search"></slot>
        <b-input v-if="document" placeholder="Procurar por documento" v-mask="['###.###.###-##','##.###.###/####-##']" v-model="searchDocument"></b-input>
        <span v-if="filters" @click="$emit('restore')">
          <i class="fas fa-backspace"></i>
        </span>
        <div :class="{ __filterActive: filterActive }" id="filter" v-if="filters" @click="isFilterModalActive = true">
          <b-icon icon="cog"></b-icon>
        </div>
      </header>
      <b-table :row-class="(row, index) => row.completed == true && '__completed'" :current-page.sync="currentPage" :per-page="perPage" :data="resources" :paginated="true" :selected.sync="selected" @update:selected="$emit('update', [$event, true])" focusable style="padding-top: 1rem">
        <template slot-scope="props">
          <b-table-column field="name" label="NOME" sortable>
            {{ props.row.name }}
          </b-table-column>
          <b-table-column v-if="mode === 'neutral'" field="user.document" label="CPF/CNPJ">
            {{ props.row.user.document }}
          </b-table-column>
          <b-table-column v-if="mode !== 'in'" field="user.email" label="Email">
            <a :href="`mailto:${props.row.user.email}`" target="_blank">{{ props.row.user.email }}</a>
          </b-table-column>
          <b-table-column field="phone" label="Telefone">
            {{ props.row.phone }}
          </b-table-column>
          <b-table-column v-if="mode !== 'in'" field="cost" label="Custo">
            {{ props.row.cost ? 'R$' + parseFloat(props.row.cost) : 'Não informado' }}
          </b-table-column>
          <b-table-column v-else field="pivot.cost" label="Custo">
            R$ {{ parseFloat(props.row.pivot.cost) }}
          </b-table-column>
          <b-table-column field="completed" :title="props.row.completed ? 'Completo' : 'Incompleto'" width="" centered>
            <span :class="[{ __completed: props.row.completed }, 'signal']"></span>
          </b-table-column>
        </template>
        <template slot="empty">
          <section class="section">
            <div class="empty has-text-grey has-text-centered">
              <p>
                <b-icon icon="frown" size="is-large"></b-icon>
              </p>
              <p>Nenhum RH.</p>
            </div>
          </section>
        </template>
        <template slot="bottom-left">
          <slot name="action"></slot>
        </template>
      </b-table>
      <b-modal :active.sync="isModalActive">
        <component :is="parseModal()" @rhCreated="rhCreated = true" @creationFailed="rhCreated = false"></component>
      </b-modal>
    </div>
    <b-modal :active.sync="isFilterModalActive">
      <div class="content" style="padding: 1rem">
        <section>
          <h3>Básicos</h3>
          <div class="box basic-filter">
            <b-checkbox @input="parseFilters([2, 'rhFilters', 'active',  $event])" :value="statusFilter.active">
              {{ statusFilter.label }}
            </b-checkbox>
            <span v-if="statusFilter.active">
              <b-field v-if="statusFilter.key === 'completed'">
                <b-radio @input="parseFilters([2, 'rhFilters', 'value', $event])" :value="statusFilter.value" :native-value="1">
                  Completo
                </b-radio>
                <b-radio @input="parseFilters([2, 'rhFilters', 'value', $event])" :value="statusFilter.value" :native-value="0">
                  Incompleto
                </b-radio>
              </b-field>
            </span>
          </div>
          <div class="box basic-filter" v-for="(filter, index) in userFilters" :key="filter.key">
            <b-checkbox @input="parseFilters([index, 'userFilters', 'active',  $event])" :value="filter.active">
              {{ filter.label }}
            </b-checkbox>
            <span v-if="filter.active" >
              <b-field v-if="filter.key === 'active'" >
                <b-radio @input="parseFilters([index, 'userFilters', 'value', $event])" :value="filter.value" :native-value="1">
                  Ativo
                </b-radio>
                <b-radio @input="parseFilters([index, 'userFilters', 'value', $event])" :value="filter.value" :native-value="0">
                  Inativo
                </b-radio>
              </b-field>
              <!-- <b&#45;switch v&#45;if="filter.key === 'completed'" :value="filter.value" @input="parseFilters([index, 'userFilters', 'value', $event])">{{ filter.value ? 'Ativo' : 'Inativo' }}</b&#45;switch> -->
              <b-input  v-else placeholder="Text here..." :value="filter.value" @input="parseFilters([index, 'userFilters', 'value', $event])"></b-input>
            </span>
          </div>
          <div class="box basic-filter" v-for="(filter, index) in rhFilters" :key="filter.key">
            <b-checkbox @input="parseFilters([index, 'rhFilters', 'active',  $event])" :value="filter.active">
              {{ filter.label }}
            </b-checkbox>
            <span v-if="filter.active">
              <!-- <b&#45;checkbox @input="" :value="filter.value">{{ filter.value ? 'Completo' : 'Incompleto' }}</b&#45;checkbox> -->
              <b-input placeholder="Text here..." :value="filter.value" @input="parseFilters([index, 'rhFilters', 'value', $event])"></b-input>
            </span>
          </div>
          <div class="box basic-filter" v-for="(filter, index) in addressFilters" :key="filter.key">
            <b-checkbox @input="parseFilters([index, 'addressFilters', 'active',  $event])" :value="filter.active">
              {{ filter.label }}
            </b-checkbox>
            <span v-if="filter.active">
              <b-input placeholder="Text here..." :value="filter.value" @input="parseFilters([index, 'addressFilters', 'value', $event])"></b-input>
            </span>
          </div>
        </section>
        <section>
          <h3>Acadêmicos</h3>
          <div class="box academic-filter" v-for="(filter, index) in academicFilters" :key="index">
            <b-checkbox @input="parseFilters([index, 'academicFilters', 'active',  $event])" :value="filter.active">
              {{ filter.label }}
            </b-checkbox>
            <span v-if="filter.active">
              <b-input placeholder="Text here..." :value="filter.value" @input="parseFilters([index, 'academicFilters', 'value', $event])"></b-input>
            </span>
          </div>
          <div class="bottonFilter">
            <button @click="filter(searchRh); isFilterModalActive = false">Ok</button>
            <button @click="$emit('restore'); isFilterModalActive = false">Resetar</button>
          </div>
        </section>
      </div>
    </b-modal>
  </section>
</template>
<script src="./rhTable.js"></script>
