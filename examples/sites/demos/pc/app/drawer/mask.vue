<template>
  <div>
    <tiny-button @click="openDrawer" type="primary"> 关闭遮罩层 </tiny-button>
    <tiny-drawer title="标题" :visible="visible" :mask="false" @update:visible="visible = $event">
      <div>左侧遮罩层已隐藏</div>
    </tiny-drawer>
  </div>
</template>

<script>
import { TinyDrawer, TinyButton } from '@opentiny/vue'

export default {
  components: {
    TinyDrawer,
    TinyButton
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    openDrawer() {
      this.visible = true
    }
  }
}
</script>
