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
    <!-- <b&#45;modal :active.sync="isAttachModalOpen" v&#45;if="selected"> -->
    <!--   <div class="" id="attachScreen"> -->
    <!--     <h3>Associar RH</h3> -->
    <!--     <section> -->
    <!--       <article> -->
    <!--         <b&#45;field label="RH"> -->
    <!--           <b&#45;input v&#45;model="selected.name" disabled></b&#45;input> -->
    <!--         </b&#45;field> -->
    <!--         <b&#45;field label="RH"> -->
    <!--           <b&#45;input v&#45;model="selected.id" disabled></b&#45;input> -->
    <!--         </b&#45;field> -->
    <!--       </article> -->
    <!--       <article> -->
    <!--         <b&#45;field label="Objetivo"> -->
    <!--           <b&#45;input placeholder="Qual serviço o rh irá realizar?" v&#45;model="rhServiceFields.goal"></b&#45;input> -->
    <!--         </b&#45;field> -->
    <!--       </article> -->
    <!--       <article> -->
    <!--         <b&#45;field label="Custo por Hora Padrão"> -->
    <!--           <money class="input" :value="selected.cost" v&#45;money="money" :masked="true" disabled></money> -->
    <!--         </b&#45;field> -->
    <!--         <b&#45;field label="Numero de Horas"> -->
    <!--           <b&#45;input  v&#45;model="rhServiceFields.hours"></b&#45;input> -->
    <!--         </b&#45;field> -->
    <!--         <b&#45;field label="Custo por Hora para o Serviço (R$)"> -->
    <!--           <b&#45;input v&#45;model="rhServiceFields.cost"></b&#45;input> -->
    <!--         </b&#45;field> -->
    <!--       </article> -->
    <!--     </section> -->
    <!--     <button @click="$emit('attachRh', Object.assign(rhServiceFields, {rh_id: selected.id})); isAttachModalOpen = false">Associar</button> -->
    <!--   </div> -->
    <!-- </b&#45;modal> -->
</template>

<script src="./filters.js">
</script>
