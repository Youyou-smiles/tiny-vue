<template>
  <tiny-chart-line :options="options" :grid="grid" :visual-map="visualMap"></tiny-chart-line>
</template>

<script setup lang="jsx">
import { ref } from 'vue'
import { TinyHuichartsLine as TinyChartLine } from '@opentiny/vue-huicharts'

const options = ref({
  padding: [50, 30, 50, 20],
  legend: {
    show: true,
    icon: 'line'
  },
  data: [
    { Month: 'Jan', Domestics: 33, Abroad: 37 },
    { Month: 'Feb', Domestics: 27, Abroad: 39 },
    { Month: 'Mar', Domestics: 31, Abroad: 20 },
    { Month: 'Apr', Domestics: 30, Abroad: 15 },
    { Month: 'May', Domestics: 37, Abroad: 13 },
    { Month: 'Jun', Domestics: 36, Abroad: 17 },
    { Month: 'Jul', Domestics: 42, Abroad: 22 },
    { Month: 'Aug', Domestics: 22, Abroad: 12 },
    { Month: 'Sep', Domestics: 17, Abroad: 30 },
    { Month: 'Oct', Domestics: 40, Abroad: 33 },
    { Month: 'Nov', Domestics: 42, Abroad: 22 },
    { Month: 'Dec', Domestics: 32, Abroad: 11 }
  ],
  xAxis: {
    data: 'Month'
  },
  yAxis: {
    name: 'precentage(%)'
  }
})
const visualMap = ref([
  {
    type: 'piecewise',
    splitNumber: 5,
    min: 0,
    max: 60,
    right: 0,
    top: '50%'
  }
])
const grid = ref({
  right: 60
})
</script>
