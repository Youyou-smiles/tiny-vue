<template>
  <tiny-file-upload :action="action" :multiple="true">
    <template #trigger>
      <tiny-button>选取文件</tiny-button>
    </template>
  </tiny-file-upload>
</template>

<script setup>
import { ref } from 'vue'
import { TinyFileUpload, TinyButton } from '@opentiny/vue'

const action = ref('http://localhost:3000/api/upload')
</script>
