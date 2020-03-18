<template>
  <main class="page" id="approvedCheck">
    <div class="wrapper">
      <div class="grid">
        <section>
          <img src="/img/logo.png" alt="">
        </section>
        <section class="content">
          <div>
            <h4>Perfil em processo de aprovação!</h4>
            <p>Seu perfi no momento se encontra em processo de análise.</p>
            <p>Você receberá um email, assim que seu perfil for aprovado por nossa equipe.</p>
          </div>
          <footer>
            &copy; 2019 Todos os direitos reservados. RACE é uma marca registrada pelo INPI.
          </footer>
        </section>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'approvedCheck',
  mounted () {
    setTimeout(() => {
      this.logout()
    }, 3000)
  },
  methods: {
    ...mapActions([
      'destroyUserStore',
      'destroyRhStore',
      'destroyClientStore',
      'destroyServiceStore',
      'setConn'
    ]),
    logout () {
      window.localStorage.removeItem('authTokens')
      this.$router.push({ name: 'login' })
      this.destroyUserStore()
      this.destroyClientStore()
      this.destroyRhStore()
      this.destroyServiceStore()
    }
  }
}
</script>
