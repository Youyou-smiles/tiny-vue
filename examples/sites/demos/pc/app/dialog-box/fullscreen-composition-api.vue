<template>
  <div>
    <tiny-button @click="boxVisibility = true">全屏弹窗</tiny-button>
    <tiny-dialog-box fullscreen v-model:visible="boxVisibility" title="消息" resize @resize="onResize">
      <span>弹窗适应整个窗口大小</span>
      <template #footer>
        <tiny-button type="primary" @click="boxVisibility = false">确 定</tiny-button>
      </template>
    </tiny-dialog-box>
  </div>
</template>

<script setup lang="jsx">
import { ref } from 'vue'
import { TinyButton, TinyDialogBox } from '@opentiny/vue'

const boxVisibility = ref(false)

function onResize(event) {
  console.log('触发了 resize 事件', event)
}
</script>
