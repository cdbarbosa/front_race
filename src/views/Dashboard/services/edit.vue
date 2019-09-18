<script>
const user = () => ({
  component: import('./edit/user.vue')
})
const admin = () => ({
  component: import('./edit/admin.vue')
})

const tj = () => ({
  component: import('./edit/tj.vue')
})

const tm = () => ({
  component: import('./edit/tm.vue')
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
  props: ['service', 'selectedIndex'],
  render (h) {
    return h(SERVICE[this.$store.getters.user.role.name], {
      props: {
        service: this.service,
        selectedIndex: this.selectedIndex
      }
    })
  }
}
</script>
