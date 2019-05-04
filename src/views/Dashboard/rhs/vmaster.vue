<template id="">
  <main id="master">
    <h3>
      RH's
      <div id="edit" @click="isEditActive = true" v-if="rhSelected">
        <b-icon icon="edit"></b-icon>
      </div>
    </h3>
    <div class="content" v-if="rhSelected">
      <generic-user :person="rhSelected"></generic-user>
      <section>
        <b-field label="Custo por Hora">
          <money class="input" :value="rhSelected.cost" v-money="money" :masked="true" disabled></money>
          <!-- <div class="textarea __disabled" v&#45;html="selected.cost" disabled></div> -->
          <!-- <textarea placeholder="Analise de dados" v&#45;html="selected.competencies" name="" id="" cols="40" rows="4"></textarea> -->
        </b-field>
        <b-field label="Competências">
          <div class="textarea __disabled" v-html="rhSelected.competencies" disabled></div>
          <!-- <textarea placeholder="Analise de dados" v&#45;html="selected.competencies" name="" id="" cols="40" rows="4"></textarea> -->
        </b-field>
        <b-field label="Experiência">
          <div class="textarea __disabled" v-html="rhSelected.experience"></div>
        </b-field>
        <b-field label="Observações">
          <div class="textarea __disabled" v-html="rhSelected.observations"></div>
        </b-field>
      </section>
    </div>
    <div class="content" v-else>
      <h2>RH não cadastrado ou não encontrado</h2>
    </div>
    <div class="content __display">
      <rh-table :create="true" :rhs="rhs" @createRh="isModalActive = true" :selectedIndex="selectedIndex" @update="setRhSelected($event[0])" @filter="filter($event)" @reset="reset($event)">
        <span slot="title">RH's</span>
      </rh-table>
    </div>
    <b-modal :active.sync="isRhModalActive">
      <component :is="parseModal()" @rhCreated="rhCreated = true" @creationFailed="rhCreated = false">
        <template v-slot:message>
          <h2>{{ rhCreated ? 'Sucesso ao cadastrar um rh' : 'Algo de errado aconteceu' }}</h2>
        </template>
      </component>
    </b-modal>
    <b-modal :onCancel="restoreRhSelected" :active.sync="isEditActive">
      <edit-rh :rh="rhSelected" :selectedIndex="selectedIndex" @updated="isEditActive = false"></edit-rh>
    </b-modal>
  </main>
</template>
<script charset="utf-8" src="./vmaster.js"></script>
