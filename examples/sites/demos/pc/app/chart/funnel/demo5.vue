<template>
  <div>
    <tiny-funnel :options="options"></tiny-funnel>
  </div>
</template>

<script lang="jsx">
import { TinyHuichartsFunnel } from '@opentiny/vue-huicharts'

export default {
  components: {
    TinyFunnel: TinyHuichartsFunnel
  },
  data() {
    return {
      options: {
        color: ['#fa2a2d', '#ff7500', '#ffbf00', '#41ba41'], // 自定义颜色组，循环使用该颜色组
        data: [
          { value: 100, name: 'Show' },
          { value: 75, name: 'Click' },
          { value: 50, name: 'Visit' },
          { value: 25, name: 'Order' }
        ]
      }
    }
  }
}
</script>
