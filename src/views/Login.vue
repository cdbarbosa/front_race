<template>
  <main class="page" id="login">
  </main>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      login: 'admin@admin.com',
      password: 'nit_admin'
    }
  },
  mounted () {
    this.getAuthToken([this, {
      username: this.login, password: this.password
    }]).then(response => {
      this.setAuthToken(response.data).then(() => {
        this.getAuthUser(this).then(response => {
          this.setAuthUser(response.data).then(status => {
            this.$router.push({ name: 'client', params: { client_id: 1 } })
          })
        })
      })
    })
  },
  methods: {
    ...mapActions([
      'getAuthToken',
      'getAuthUser',
      'setAuthToken',
      'setAuthUser'
    ])
  }
}
</script>
