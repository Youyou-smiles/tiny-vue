<template>
  <div class="mt-10">
    <tiny-slider v-model="value2" @stop="stop"></tiny-slider>
  </div>
</template>

<script>
import { TinySlider, TinyNotify } from '@opentiny/vue'

export default {
  components: {
    TinySlider
  },
  data() {
    return {
      value2: 40
    }
  },
  methods: {
    stop(val) {
      TinyNotify({
        title: '触发停止滑动事件',
        message: `停止后值为${val}`,
        offset: 150
      })
    }
  }
}
</script>
