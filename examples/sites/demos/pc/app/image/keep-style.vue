<template>
  <div class="demo-image__keep-style">
    <tiny-image :src="url" :preview-src-list="srcList" keep-style></tiny-image>
  </div>
</template>

<script>
import { TinyImage } from '@opentiny/vue'

export default {
  components: {
    TinyImage
  },
  data() {
    return {
      url: `${import.meta.env.VITE_APP_BUILD_BASE_URL}static/images/mountain.png`,
      srcList: [
        `${import.meta.env.VITE_APP_BUILD_BASE_URL}static/images/mountain.png`,
        `${import.meta.env.VITE_APP_BUILD_BASE_URL}static/images/house.jpg`,
        `${import.meta.env.VITE_APP_BUILD_BASE_URL}static/images/bridge.jpg`
      ]
    }
  }
}
</script>

<style scoped>
.demo-image__keep-style {
  width: 200px;
  height: 200px;
}
</style>
