<template>
  <div>
    <tiny-chart-ring :options="options"></tiny-chart-ring>
  </div>
</template>

<script setup lang="jsx">
import { ref } from 'vue'
import { TinyHuichartsRing as TinyChartRing } from '@opentiny/vue-huicharts'

const options = ref({
  type: 'circle',
  data: [
    { value: 100, name: 'VPC' },
    { value: 98, name: 'IM' },
    { value: 49, name: 'EIP' },
    { value: 14, name: 'SG' }
  ]
})
</script>
