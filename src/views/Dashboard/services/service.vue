<script>
const user = () => ({
  component: import('./service/user.vue')
})
const admin = () => ({
  component: import('./service/admin.vue')
})
const tj = () => ({
  component: import('./service/tj.vue')
})
const tm = () => ({
  component: import('./service/tm.vue')
})
//
const SERVICE = {
  rh: user,
  admin: admin,
  tj: tj,
  tm: tm
}
export default {
  route: {
    waitForData: true
  },
  props: ['selected'],
  render (h) {
    return h(SERVICE[this.$store.getters.user.role.name], {
      props: {
        selected: this.selected
      }
    })
  }
}
</script>
