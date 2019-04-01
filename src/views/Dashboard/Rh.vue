<script>
const user = () => ({
  component: import('./rh/user.vue')
})
const admin = () => ({
  component: import('./rh/admin.vue')
})
const RH = {
  user: user,
  admin: admin
}

export default {
  render (h) {
    return h(this.$store.getters.user.role_id === 1 ? RH.admin : RH.user)
  }
}
</script>
