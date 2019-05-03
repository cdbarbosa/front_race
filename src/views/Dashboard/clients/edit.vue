<template>
  <main class="clientScreen" id="updateClient">
    <div class="content">
      <edit-generic :person="client" :title="'Cliente'" @change="updateClientSelected($event)"></edit-generic>
      <div class="others">
        <b-field label="Observações">
          <vue-editor :editorToolbar="customToolbar" v-model="observations" placeholder="Analise de dados"></vue-editor>
        </b-field>
        <b-field label="Atividade">
          <b-input v-model="activity" placeholder="Produçaõ de PANIC"></b-input>
        </b-field>
      </div>
      <button @click="updateFunction">Atualizar</button>
    </div>
  </main>
</template>
<script src="./edit.js"></script>
