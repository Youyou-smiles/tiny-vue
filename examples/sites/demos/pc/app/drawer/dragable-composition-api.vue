<template>
  <div>
    <tiny-button @click="openDrawer('width')" type="primary"> 宽度拖拽 </tiny-button>
    <tiny-button @click="openDrawer('height')" type="primary"> 高度拖拽 </tiny-button>

    <tiny-drawer
      :placement="placement"
      title="标题"
      dragable
      :visible="visible"
      @update:visible="visible = $event"
      @drag="drag"
      height="600px"
    >
      <div>
        <p v-if="placement === 'right'">横向拖拽左边框可改变抽屉主体宽度。</p>
        <p v-else>竖向拖拽上边框可改变抽屉主体高度。</p>
      </div>
    </tiny-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { TinyDrawer, TinyButton, TinyModal } from '@opentiny/vue'

const visible = ref(false)
const placement = ref('right')

const openDrawer = (target) => {
  visible.value = true
  placement.value = target === 'width' ? 'right' : 'bottom'
}

const drag = ({ width, height }) => {
  TinyModal.message({ message: `抽屉的宽为${width},高为${height}`, status: 'info' })
}
</script>
