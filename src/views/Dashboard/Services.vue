<script>
const user = () => ({
  component: import('./services/user.vue')
})
const admin = () => ({
  component: import('./services/admin.vue')
})
const tj = () => ({
  component: import('./services/tj.vue')
})

const SERVICE = {
  user: user,
  admin: admin,
  tj: tj
}
export default {
  route: {
    waitForData: true
  },
  render (h) {
    return h(SERVICE[this.$store.getters.user.role.name])
  }
}
</script>
