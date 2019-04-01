<script>
const user = () => ({
  component: import('./service/user.vue')
})
const admin = () => ({
  component: import('./service/admin.vue')
})
const SERVICE = {
  user: user,
  admin: admin
}
export default {
  render (h) {
    return h(this.$store.getters.user.role_id === 1 ? SERVICE.admin : SERVICE.user)
  }
}
</script>
