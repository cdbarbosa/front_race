<template>
  <div class="rhScreen" id="updateRh">
    <form @keyup.enter.ctrl="updateFunction" @submit.prevent="updateFunction">
      <div class="content">
        <edit-generic :person="rh" :title="'RH'" @change="updateRhSelected($event)">
          <article class="academics">
            <b-field label="Bacharelado">
              <b-input v-model="area" placeholder="Matematica"></b-input>
            </b-field>
            <b-field label="Titulo">
              <b-input v-model="titulation" placeholder="Doutorado"></b-input>
            </b-field>
            <!-- <b&#45;field label="Bacharelado"> -->
          <!--     <b&#45;input v&#45;model="bacharel" placeholder="Matemática"></b&#45;input> -->
          <!--   </b&#45;field> -->
          <!--   <b&#45;field label="Título"> -->
          <!--     <b&#45;input v&#45;model="titulation" placeholder="Doutorado"></b&#45;input> -->
          <!--   </b&#45;field> -->
            <b-field label="Custo (R$)">
              <b-input v-model="cost" placeholder="R$ 131,00"></b-input>
            </b-field>
          </article>
        </edit-generic>
        <div class="competencias">
          <b-field label="Experiência">
            <b-input v-model="experience" placeholder="Analise de dados"></b-input>
          </b-field>
          <b-field label="Competências">
            <vue-editor :editorToolbar="customToolbar" v-model="competencies" placeholder="Analise de dados"></vue-editor>
          </b-field>
          <b-field label="Observações">
            <vue-editor :editorToolbar="customToolbar" v-model="observations"></vue-editor>
          </b-field>
        </div>
        <button type="submit">Atualizar</button>
      </div>
    </form>
  </div>
</template>
<script src="./edit.js"></script>
