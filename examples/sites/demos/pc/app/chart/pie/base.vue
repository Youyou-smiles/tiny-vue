<template>
  <div>
    <tiny-pie :options="options"></tiny-pie>
  </div>
</template>

<script lang="jsx">
import { TinyHuichartsPie } from '@opentiny/vue-huicharts'

export default {
  components: {
    TinyPie: TinyHuichartsPie
  },
  data() {
    return {
      options: {
        type: 'pie',
        selectedMode: 'multipe',
        data: [
          { value: 100, name: 'VPC' },
          { value: 90, name: 'IM' },
          { value: 49, name: 'EIP' },
          { value: 14, name: 'SG' }
        ]
      }
    }
  }
}
</script>
