<template>
  <div class="rhScreen" id="updateRh">
    <form @keyup.enter.ctrl="updateFunction" @submit.prevent="updateFunction" v-if="ready">
      <div v-if="!probation" id="probation">
        <h4>Perfil em processo de aprovação!</h4>
        <div>
          <b-radio class="__default" v-model="approved" :native-value="0">
            Aprovação pendente
          </b-radio>
          <b-radio v-model="approved" :native-value="1">
            Aprovado
          </b-radio>
          <b-radio class="__danger" v-model="approved" :native-value="2">
            Aprovação negada
          </b-radio>
        </div>
        <b-field label="Mensagem adicional" v-if="approved === 2">
          <b-input v-model="customMessage" maxlength="200" type="textarea"></b-input>
        </b-field>

        <!-- <b&#45;checkbox v&#45;model="approved"> -->
        <!--   {{ approved ? 'Perfil Aprovado': 'Aprovação pendente' }} -->
        <!-- </b&#45;checkbox> -->
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
          <button type="submit">Atualizar</button>
        </edit-generic>
        <div class="competencias">
            <b-field label="Perfil do Lattes">
              <b-input v-model="lattes_perfil" name="lattes_perfil" placeholder="http://lattes.cnpq.br/4259409970128066" :disabled="rh.user.type_id == '1'"></b-input>
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
    </form>
  </div>
</template>
<script src="./edit.js"></script>
