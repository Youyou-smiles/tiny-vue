<template>
  <div>
    <tiny-button text="图片裁剪" @click="visible = !visible"></tiny-button>
    <tiny-button text="切换模式" @click="changeMode"></tiny-button>
    <tiny-crop
      :cropvisible="visible"
      @update:cropvisible="visible = $event"
      :src="imgUrl"
      :view-mode="num"
      :key="num"
    ></tiny-crop>
  </div>
</template>

<script lang="jsx">
import { TinyButton, TinyCrop, TinyModal } from '@opentiny/vue'

export default {
  components: {
    TinyCrop,
    TinyButton
  },
  data() {
    return {
      num: 0,
      imgUrl: `${import.meta.env.VITE_APP_BUILD_BASE_URL}static/images/mountain.png`,
      visible: false
    }
  },
  methods: {
    changeMode() {
      this.num = (this.num + 1) % 4
      TinyModal.message({ message: '模式：' + this.num })
    }
  }
}
</script>
