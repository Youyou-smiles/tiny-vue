<template>
  <div>
    <tiny-popconfirm :title="title" :message="message">
      <template #reference>
        <tiny-button>悬浮我提示</tiny-button>
      </template>
    </tiny-popconfirm>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { TinyPopconfirm, TinyButton } from '@opentiny/vue'

const title = ref('这是气泡标题')
const message = ref('这是气泡确认框提示内容文本描述，这是两行内容的展示样式。')
</script>
