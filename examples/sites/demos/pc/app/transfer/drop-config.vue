<template>
  <tiny-transfer v-model="value" :data="data" :drop-config="dropConfig"></tiny-transfer>
</template>

<script lang="jsx">
import { TinyTransfer } from '@opentiny/vue'
import Sortable from 'sortablejs'

export default {
  components: {
    TinyTransfer
  },
  data() {
    const generateData = () => {
      const data = []

      for (let i = 0; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        })
      }

      return data
    }

    return {
      data: generateData(),
      value: [3, 8, 5, 6],
      dropConfig: {
        plugin: Sortable
      }
    }
  }
}
</script>
