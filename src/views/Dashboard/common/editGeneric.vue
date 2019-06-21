<template>
  <div :class="[title.toLowerCase()]">
    <section>
      <article>
        <b-field label="Nome">
          <b-input v-model="name" placeholder="Nome"></b-input>
        </b-field>
      <b-field label="Ativo">
        <b-checkbox v-model="userActive"></b-checkbox>
      </b-field>
        <b-field label="ID">
          <b-input v-model="person.id" placeholder="23" disabled></b-input>
        </b-field>
      </article>
      <article class="info-second">
        <b-field label="Cadastro">
          <b-input :value="parseDate(person.created_at)" v-mask="'##/##/####'" disabled></b-input>
        </b-field>
        <b-field label="Telefone">
          <b-input v-model="phone" v-mask="['(##) ####-####', '(##) #####-####']" placeholder="Telefone"></b-input>
        </b-field>
      </article>
      <article class="info-second">
        <b-field label="Email">
          <b-input v-model="email" type="email" placeholder="example@example.com" ></b-input>
        </b-field>
        <b-field label="Tipo">
          <div class="control block">
            <b-radio v-model="userType" native-value="1" >
              Jurídica
            </b-radio>
            <b-radio v-model="userType" native-value="2" >
              Física
            </b-radio>
          </div>
        </b-field>
        <!-- <div class="block"> -->
        <!--   <b&#45;radio v&#45;model="userType" native&#45;value="1" > -->
        <!--     Jurídica -->
        <!--   </b&#45;radio> -->
        <!--   <b&#45;radio v&#45;model="userType" native&#45;value="2" > -->
        <!--     Física -->
        <!--   </b&#45;radio> -->
        <!-- </div> -->
      </article>
      <article v-if="userType == 2">
        <b-field label="CPF/CNPJ">
          <b-input v-model="document" v-mask="[ userType == '1' ? '##.###.###/####-##' : '###.###.###-##']" placeholder="Documento" ></b-input>
        </b-field>
        <b-field label="Data (nascimento)">
          <b-datepicker v-model="birthdate" :date-formatter="(date) => date.toLocaleDateString('pt-BR')" name="date"></b-datepicker>
        </b-field>
      </article>
      <article v-else>
        <b-field label="CPF/CNPJ">
          <b-input v-model="document" v-mask="[ userType == '1' ? '##.###.###/####-##' : '###.###.###-##']" placeholder="Documento" ></b-input>
        </b-field>
        <b-field label="Data (nascimento)">
          <b-datepicker  v-model="birthdate" :date-formatter="(date) => date.toLocaleDateString('pt-BR')" name="date" disabled></b-datepicker>
        </b-field>
      </article>
      <address class="address">
        <h3>Endereço</h3>
        <article>
          <b-field label="Rua">
            <b-input v-model="address" placeholder="Rua"></b-input>
          </b-field>
          <b-field label="Estado">
            <b-input v-model="state" placeholder="ES"></b-input>
          </b-field>
        </article>
        <article>
          <b-field label="CEP">
            <b-input v-model="postal_code" v-mask="'#####-###'" placeholder="CEP"></b-input>
          </b-field>
          <b-field label="Bairro">
            <b-input v-model="neighborhood" placeholder="Bairro"></b-input>
          </b-field>
          <b-field label="Cidade">
            <b-input v-model="city" placeholder="Cidade"></b-input>
          </b-field>
        </article>
        <slot></slot>
      </address>
    </section>
  </div>
</template>
<script src="./editGeneric.js"></script>
