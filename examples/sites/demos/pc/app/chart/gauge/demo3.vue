<template>
  <div>
    <tiny-gauge :options="options"></tiny-gauge>
  </div>
</template>

<script lang="jsx">
import { TinyHuichartsGauge } from '@opentiny/vue-huicharts'

export default {
  components: {
    TinyGauge: TinyHuichartsGauge
  },
  data() {
    return {
      options: {
        // splitColor 分割仪表盘
        // splitColor[i][0] 的值代表整根轴线的百分比，应该 0 到 1 之间
        // splitColor[1][1] 是对应的颜色
        splitColor: [
          [0.25, '#0d9458'],
          [0.5, '#eeba18'],
          [0.75, '#ec6f1a'],
          [1, '#f43146']
        ],
        pointer: true,
        data: [
          {
            value: 71,
            name: 'Utilization rate'
          }
        ]
      }
    }
  }
}
</script>
