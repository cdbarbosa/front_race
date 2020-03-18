<script>
const user = () => ({
  component: import('./user.vue')
})
const admin = () => ({
  component: import('./admin.vue')
})

const tj = () => ({
  component: import('./tj.vue')
})

const tm = () => ({
  component: import('./tm.vue')
})
//
const SERVICE = {
  rh: user,
  admin: admin,
  tj: tj,
  tm: tm
}
export default {
  props: ['service', 'selectedIndex'],
  route: {
    waitForData: true
  },

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
