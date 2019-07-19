<template>
  <div class="rhScreen" id="updateRh">
    <form @keyup.enter.ctrl="updateFunction" @submit.prevent="updateFunction">
      <div v-if="!probation" id="probation">
        Perfil em processo de aprovação!
        <b-checkbox v-model="approved">
          {{ approved ? 'Perfil Aprovado': 'Aprovação pendente' }}
        </b-checkbox>
      </div>
      <div class="content">
        <edit-generic :person="rh" :title="'RH'" @change="updateRhSelected($event)">
          <article class="course" v-if="rh.user.type_id == 2">
            <b-field label="Bacharelado">
              <b-input v-model="area" placeholder="Matematica"></b-input>
            </b-field>
            <b-field label="Titulo">
              <b-input v-model="titulation" placeholder="Doutorado"></b-input>
            </b-field>
            <b-field label="Custo (R$)">
              <b-input v-model="cost" type="number" step="0.01" placeholder="R$ 131,00"></b-input>
            </b-field>
          </article>
          <article class="course" v-else>
            <b-field label="Bacharelado">
              <b-input v-model="area" placeholder="Matematica" disabled></b-input>
            </b-field>
            <b-field label="Titulo">
              <b-input v-model="titulation" placeholder="Doutorado" disabled></b-input>
            </b-field>
            <b-field label="Custo (R$)">
              <b-input v-model="cost" type="number" step="0.01" placeholder="R$ 131,00"></b-input>
            </b-field>
          </article>
        </edit-generic>
        <div class="competencias">
            <b-field label="Perfil do Lattes">
              <b-input v-model="lattes_perfil" name="lattes_perfil" placeholder="http://lattes.cnpq.br/4259409970128066" :disabled="rh.user.type_id == '1'" editable></b-input>
            </b-field>
          <b-field label="Experiência">
            <b-input v-model="experience" placeholder="Analise de dados"></b-input>
          </b-field>
          <b-field label="Competências">
            <vue-editor :editorToolbar="customToolbar" v-model="competencies" placeholder="Analise de dados"></vue-editor>
          </b-field>
          <b-field label="Observações" v-if="$store.getters.user.id !== rh.user.id">
            <vue-editor :editorToolbar="customToolbar" v-model="observations"></vue-editor>
          </b-field>
        </div>
      </div>
      <button type="submit">Atualizar</button>
    </form>
  </div>
</template>
<script src="./edit.js"></script>
