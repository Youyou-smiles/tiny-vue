<template>
  <div>
    <tiny-chart-gauge :options="options"></tiny-chart-gauge>
  </div>
</template>

<script setup lang="jsx">
import { ref } from 'vue'
import { TinyHuichartsGauge as TinyChartGauge } from '@opentiny/vue-huicharts'

const options = ref({
  data: [
    {
      value: 71,
      name: 'Utilization rate'
    }
  ]
})
</script>
