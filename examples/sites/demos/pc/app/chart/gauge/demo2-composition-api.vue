<template>
  <div>
    <tiny-chart-gauge :options="options"></tiny-chart-gauge>
  </div>
</template>

<script setup lang="jsx">
import { ref } from 'vue'
import { TinyHuichartsGauge as TinyChartGauge } from '@opentiny/vue-huicharts'

const options = ref({
  // 仪表盘的最小值
  min: 0,

  // 仪表盘的最大值
  max: 1000,
  pointer: true,
  data: [
    {
      value: 666,
      name: 'Utilization rate'
    }
  ]
})
</script>
