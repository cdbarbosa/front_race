<template>
  <main id="createRh">
    <form @submit.prevent="createRh" class="content __create">
      <section>
        <article>
          <b-field label="Nome">
            <b-input v-model="rh.name" placeholder="Nome" v-validate="'alpha'" name="name" required></b-input>
          </b-field>
        </article>
        <article>
          <b-field label="Email">
            <b-input v-model="user.email" v-validate="rules.email" type="email" placeholder="example@example.com" name="email" required></b-input>
          </b-field>
          <b-field label="Tipo">
            <div class="block">
              <b-radio v-model="user.type_id" native-value="1">
                Juridico
              </b-radio>
              <b-radio v-model="user.type_id" native-value="2">
                Fisico
              </b-radio>
            </div>
          </b-field>
        </article>
        <b-field label="CPF/CNPJ">
          <b-input v-model="user.document" v-validate="rules.document" v-mask="user.type_id == 1 ? '##.###.###/####-##' : '###.###.###-##'" placeholder="Documentos" name="document"></b-input>
        </b-field>
        <article>
          <b-field label="Telefone">
            <b-input v-model="rh.phone" v-mask="'(##) # ####-####'" placeholder="Telefone"></b-input>
          </b-field>
          <b-field label="Data (nascimento)">
            <b-datepicker  v-model="user.birthdate" name="birthdate" placeholder="Data de nascimento" :disabled="user.type_id == 1"></b-datepicker>
          </b-field>
        </article>
        <b-field label="Perfil do Lattes">
          <b-input v-model="rh.lattes_perfil" name="lattes_perfil" placeholder="http://lattes.cnpq.br/4259409970128066" :disabled="user.type_id == 1"></b-input>
        </b-field>
        <address class="address">
          <hr>
          <article>
            <b-field label="País">
              <b-input pattern="[A-Za-z ]+" name="country" v-model="address.country" placeholder="País"></b-input>
            </b-field>
            <b-field label="Estado">
              <b-input style="text-transform:uppercase" maxlength="2" pattern="[A-Za-z]{2}" name="region" autocomplete="shipping region" v-model="address.state" placeholder="ES"></b-input>
            </b-field>
          </article>
          <article class="info-three">
            <b-field label="Logradouro">
              <b-input v-model="address.address" name="street-address" autocomplete="shipping street-address" placeholder="Logradouro"></b-input>
            </b-field>
            <b-field label="Complemento">
              <b-input v-model="address.complement" placeholder="Complemento"></b-input>
            </b-field>
          </article>
          <article class="info-fourth">
            <b-field label="CEP">
              <b-input v-model="address.postal_code" name="postal-code" autocomplete="shipping postal-code" v-mask="'##.###-###'" placeholder="CEP"></b-input>
            </b-field>
            <b-field label="Bairro">
              <b-input v-model="address.neighborhood" name="neighborhood" placeholder="Bairro"></b-input>
            </b-field>
            <b-field label="Cidade">
              <b-input v-model="address.city" name="locality" autocomplete="shipping locality" placeholder="Cidade"></b-input>
            </b-field>
          </article>
        </address>
        <hr>
        <article class="course">
          <b-field label="Bacharelado">
            <b-input v-model="rh.academic.area" placeholder="Matemática" :disabled="user.type_id == '1'"></b-input>
          </b-field>
          <b-field label="Título">
            <b-input v-model="rh.academic.titulation" placeholder="Doutorado" :disabled="user.type_id == '1'"></b-input>
          </b-field>
          <b-field label="Custo">
            <b-input v-model="rh.cost" type="number" step="0.01" placeholder="R$ 131,00"></b-input>
          </b-field>
        </article>
      </section>
      <section>
        <b-field label="Experiência">
          <b-input v-model="rh.experience" placeholder="Analise de dados"></b-input>
        </b-field>
        <b-field label="Competências">
          <vue-editor :editorToolbar="customToolbar" v-model="rh.competencies" placeholder="Analise de dados"></vue-editor>
        </b-field>
        <b-field label="Observações">
          <vue-editor :editorToolbar="customToolbar" v-model="rh.observations"></vue-editor>
        </b-field>
        <div class="buttonClass">
          <button type="submit">Cadastrar</button>
        </div>
      </section>
    </form>
  </main>
</template>
<script src="./create.js"></script>
