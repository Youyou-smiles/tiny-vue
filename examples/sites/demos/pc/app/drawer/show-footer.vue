<template>
  <div>
    <tiny-button type="primary" @click="openDrawer"> 显示底部 </tiny-button>

    <tiny-drawer
      :show-footer="showFooter"
      title="标题"
      :visible="visible"
      @update:visible="visible = $event"
      @confirm="confirm"
    >
      <div>内容区域</div>
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
      visible: false,
      showFooter: true
    }
  },
  methods: {
    openDrawer() {
      this.visible = true
    },
    confirm() {
      this.visible = false
    }
  }
}
</script>
