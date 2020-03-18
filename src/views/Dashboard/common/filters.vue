<template>
    <b-modal :active.sync="isFilterModalActive">
      <div class="content" style="padding: 1rem">
        <section>
          <h3>Fitros Básicos</h3>
          <div class="box basic-filter" v-for="(filter, index) in basicFilter" :key="index">
            <b-checkbox v-model="filter.active" :native-value="filter.key">
              {{ filter.label }}
            </b-checkbox>
            <b-input placeholder="Text here..." v-if="filter.active === true"  v-mask="filter.key == 'document' ? ['###.###.###-##', '##.###.###/####-##'] : undefined" v-model="filter.value"></b-input>
            <!-- <b-select v-if="filter.active && filter.key == 'cost'" v-model="filter.operator">
              <option
                v-for="option in operator"
                :value="option"
                :key="option">
              {{ option }}
              </option>
            </b-select> -->
          </div>
        </section>
        <section>
          <h3>Fitros Acadêmicos</h3>
          <div class="box academic-filter" v-for="(filter, index) in academicFilter" :key="index">
            <b-checkbox v-model="filter.active" :native-value="filter.key">
              {{ filter.label }}
            </b-checkbox>
            <b-input placeholder="Text here..." v-if="filter.active === true" v-model="filter.value"></b-input>
          </div>
          <div class="bottonFilter">
            <button @click="filter(searchRh); isFilterModalActive = false">Ok</button>
            <button @click="resetFilters">Resetar</button>
          </div>
        </section>
      </div>
    </b-modal>
    <b-modal :active.sync="isAttachModalOpen" v-if="selected">
      <div class="" id="attachScreen">
        <h3>Associar RH</h3>
        <section>
          <article>
            <b-field label="RH">
              <b-input v-model="selected.name" disabled></b-input>
            </b-field>
            <b-field label="RH">
              <b-input v-model="selected.id" disabled></b-input>
            </b-field>
          </article>
          <article>
            <b-field label="Objetivo">
              <b-input placeholder="Qual serviço o rh irá realizar?" v-model="rhServiceFields.goal"></b-input>
            </b-field>
          </article>
          <article>
            <b-field label="Custo por Hora Padrão">
              <money class="input" :value="selected.cost" v-money="money" :masked="true" disabled></money>
            </b-field>
            <b-field label="Numero de Horas">
              <b-input  v-model="rhServiceFields.hours"></b-input>
            </b-field>
            <b-field label="Custo por Hora para o Serviço (R$)">
              <b-input v-model="rhServiceFields.cost"></b-input>
            </b-field>
          </article>
        </section>
        <button @click="$emit('attachRh', Object.assign(rhServiceFields, {rh_id: selected.id})); isAttachModalOpen = false">Associar</button>
      </div>
    </b-modal>
</template>

<script src="./filters.js">
</script>
