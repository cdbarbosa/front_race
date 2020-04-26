<template>
  <div class="content" id="accounts">
    <h3 :class="{}">
      Contas
      <button id="createAccount" @click="isCreateActive = true">Criar conta</button>
      <div @click="isEditActive = true">
        <b-icon icon="edit"></b-icon>
      </div>
    </h3>
    <section class="__secundary">
      <div class="tableContainer">
        <header>
          <h4>Contas</h4>
          <!-- <slot name="search"></slot> -->
          <!-- <span @click="$emit('restore')" v&#45;if="options.search"> -->
          <!--   <i class="fas fa&#45;backspace"></i> </span> -->
          <!-- <!&#45;&#45; <div v&#38;#45;if="filters" @click="isFilterModalActive = true"> &#45;&#45;> -->
          <!-- <!&#45;&#45;   <b&#38;#45;icon icon="cog"></b&#38;#45;icon> &#45;&#45;> -->
          <!-- <!&#45;&#45; </div> &#45;&#45;> -->
          <!-- <div :class="{ __filterActive: filterActive }" id="filter" @click="$emit('filter')" v&#45;if="options.filter &#38;&#38; $store.getters.user.role_id === 1"> -->
          <!--   <b&#45;icon icon="cog"></b&#45;icon> -->
          <!-- </div> -->
        </header>
      </div>
      <b-table
        :data="accounts"
        :paginated="false"
        :selected.sync="account"
        :hoverable="true"
        focusable>
        <template slot-scope="props">
          <b-table-column field="email" label="Email" sortable>
            {{ props.row.email }}
          </b-table-column>
          <b-table-column field="role" label="Tipo de Conta">
            {{ props.row.role.description }}
          </b-table-column>
          <b-table-column label="Ativo" field="active" :title="props.row.active ? 'Ativo' : 'Inativo'"  width="" centered>
            <span :class="[{ __completed: props.row.active }, 'signal']"></span>
          </b-table-column>
        </template>
        <template slot="empty">
          <section class="section">
            <div class="empty has-text-grey has-text-centered">
              <p>
              <b-icon icon="frown" size="is-large"></b-icon>
              </p>
              <p>Nenhuma conta encontrada.</p>
            </div>
          </section>
        </template>
      </b-table>
    </section>
    <b-modal :active.sync="isCreateActive" @close="accountCreated = undefined; creationErros = []">
      <component :is="parseModal()" @create="create">
        <template v-slot:message>
          <h2>{{ accountCreated ? 'Sucesso ao cadastrar uma conta' : 'Algo de errado aconteceu' }}</h2>
          <span class="error" v-for="(err, index) in creationErros" :key="index">
            {{ err[0] }}
          </span>
        </template>
      </component>
    </b-modal>
    <!-- <b&#45;modal :active.sync="isCreateActive"> -->
    <!--   <d&#45;control&#45;account&#45;create @create="create($event); isCreateActive = false"></d&#45;control&#45;account&#45;create> -->
    <!-- </b&#45;modal> -->
    <b-modal :active.sync="isEditActive">
      <d-control-account-edit :account="account" @update="edit"></d-control-account-edit>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import dControlAccountEdit from './d-control-account-edit.vue'
import dControlAccountCreate from './d-control-account-create.vue'
import success from '../common/create-messages/success'
import error from '../common/create-messages/error'
export default {
  name: 'accounts',
  data () {
    return {
      isCreateActive: false,
      isEditActive: false,
      accountCreated: undefined,
      creationErros: []
    }
  },
  computed: {
    ...mapGetters('accountStore', [
      'accounts'
    ]),
    account: {
      get () {
        return this.$store.getters['accountStore/account']
      },
      set (newVal) {
        this.$store.dispatch('accountStore/setAccountIndex', newVal)
      }
    }
  },
  beforeMount () {
    this.index(this)
  },
  methods: {
    ...mapActions('accountStore', [
      'index',
      'store',
      'update'
    ]),
    create (account) {
      this.store([this, account]).then(response => {
        this.accountCreated = true
        this.index(this)
      }).catch(err => {
        this.accountCreated = false
        this.creationErros = err.response.data
      })
    },
    edit (user) {
      this.update([this, user]).then(() => {
        this.$toasted.success('Conta atualizada com sucesso!', {
          theme: 'bubble',
          position: 'top-center',
          duration: 1000,
          onComplete: () => {
            this.isEditActive = false
          }
        })
      })
    },
    parseModal () {
      if (this.accountCreated === undefined) {
        return 'dControlAccountCreate'
      } else if (this.accountCreated === true) {
        return 'success'
      }
      return 'error'
    }
  },
  components: {
    dControlAccountEdit,
    dControlAccountCreate,
    success,
    error
  }
}
</script>
