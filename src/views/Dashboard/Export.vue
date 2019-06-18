<template>
  <div class="" id="exportPdf">
    <button @click="saveFile">Salvar</button>

  </div>
</template>

<script>
import { saveAs } from 'file-saver'
import { mapGetters } from 'vuex'
export default {
  name: 'exportPdf',
  computed: {
    ...mapGetters([
      'serviceSelected'
    ])
  },
  methods: {
    saveFile () {
      const header = `
##===============================================================================
## Serviço: ${this.serviceSelected.name} 

## Descrição: ${this.stripHtml(this.serviceSelected.description)}

## Custo: R$ ${parseFloat(this.serviceSelected.total_cost).toFixed(2)}
##===============================================================================
      `
      // const serviceInfo = ''
      // const clientInfo = ''
      // const rhsInfo = ''
      // const footer = ''
      // const div = ''
      const body = `${header}`
      let blob = new Blob([body], { type: 'text/plain;charset=utf-8' })
      saveAs(blob, 'body.txt')
    },
    stripHtml (html) {
      let tmp = document.createElement('div')
      tmp.innerHTML = html
      return tmp.textContent || tmp.innerText || ''
    }
  }
}
</script>
