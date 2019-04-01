<template>
  <div :class="[name.toLowerCase()]">
    <h3>{{ name }}</h3>
    <section>
      <article>
        <b-field label="Nome">
          <b-input v-model="person.name" placeholder="Nome" name="name" required></b-input>
        </b-field>
        <span>{{ errors.first('name') }}</span>
        <b-field label="Telefone">
          <b-input v-model="person.phone" v-mask="'(##) # ####-####'" placeholder="Telefone" required></b-input>
        </b-field>
        <b-field label="Data de Nascimento">
          <b-input v-model="user.birthdate" v-validate="rules.birthdate" v-mask="'##/##/####'" placeholder="10/10/1994" name="birthdate" required></b-input>
        </b-field>
        <span>{{ errors.first('birthdate') }}</span>
      </article>
      <article class="info-second">
        <b-field label="Email">
          <b-input v-model="user.email" type="email"  v-validate="rules.email" placeholder="exemplo@exemplo.com" name="Email" required></b-input>
        </b-field>
        <div class="block">
          <b-radio v-model="user.type_id" native-value="1">
            Juridico
          </b-radio>
          <b-radio v-model="user.type_id" native-value="2">
            Fisico
          </b-radio>
        </div>
      </article>
      <b-field label="CPF/CNPJ">
        <b-input v-if="user.type_id" v-model="user.document" v-validate="rules.document" v-mask="user.type_id === '2' ? '###.###.###-##' : '##.###.###/####-##'" placeholder="Documentos" name="document" required></b-input>
        <b-input v-else v-model="user.document" v-validate="rules.document" v-mask="user.type_id === '2' ? '###.###.###-##' : '##.###.###/####-##'" placeholder="Documentos" name="document" disabled></b-input>
      </b-field>
      <address class="address">
        <h3>Endereço</h3>
        <article class="info-three">
          <b-field label="Rua">
            <b-input v-model="address.address" placeholder="Rua" name="address" required></b-input>
          </b-field>
          <b-field label="Estado">
            <b-input v-model="address.state"  v-validate="'alpha'" laceholder="ES" name="state" required></b-input>
          </b-field>
        </article>
        <article class="info-fourth">
          <b-field label="CEP">
            <b-input v-model="address.postal_code" v-mask="'##.###-###'" v-validate="rules.postal_code" name="postal_code" placeholder="CEP" required></b-input>
          </b-field>
          <b-field label="Bairro">
            <b-input v-model="address.neighborhood" placeholder="Bairro"  name="neighborhood" required></b-input>
          </b-field>
          <b-field label="Cidade">
            <b-input v-model="address.city" placeholder="Cidade" required name="city"></b-input>
          </b-field>
        </article>
      </address>
    </section>
  </div>
</template>
<script>
import userCreate from '../../../mixins/userCreate.js'
export default {
  name: 'createGeneric',
  mixins: [userCreate],
  props: ['person', 'name'],
  data () {
    return {
      money: {
        decimal: '.',
        thousands: ',',
        prefix: 'R$ ',
        precision: 2
      }
    }
  },
  beforeMount () {
    // console.log(this.person)
  }
}
</script>
