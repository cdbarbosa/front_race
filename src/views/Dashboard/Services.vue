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
  rh: user,
  admin: admin,
  tj: tj
}
export default {
  route: {
    waitForData: true
  },
  render (h) {
    return this.$store.getters.user ? h(SERVICE[this.$store.getters.user.role.name]) : h(SERVICE.admin)
  }
}
</script>
