<template>
  <div>
    <tiny-chart-map
      v-if="chartSettings.mapOrigin"
      style="width: 500px"
      :data="chartData"
      :settings="chartSettings"
    ></tiny-chart-map>
  </div>
</template>

<script setup lang="jsx">
import { ref, getCurrentInstance } from 'vue'
import { TinyHuichartsMap as TinyChartMap } from '@opentiny/vue-huicharts'
import chinaData from './china.js'

const chartData = ref({
  columns: ['位置', 'GDP'],
  rows: [
    { 位置: '吉林', GDP: 123 },
    { 位置: '北京', GDP: 1223 },
    { 位置: '上海', GDP: 2123 },
    { 位置: '浙江', GDP: 4123 }
  ]
})
const chartSettings = ref({
  position: 'china',
  mapOrigin: null, // 用户自己的地图数据
  dataType: {
    GDP: 'KMB'
  }
})

const proxy = getCurrentInstance().appContext.config.globalProperties

if (window._map_china) {
  chartSettings.value.mapOrigin = window._map_china
} else if (proxy.$service?.network) {
  proxy.$service.network.get('services/mapChina').then(({ data }) => {
    chartSettings.value.mapOrigin = data
  })
} else if (chinaData) {
  chartSettings.value.mapOrigin = chinaData
}
</script>
