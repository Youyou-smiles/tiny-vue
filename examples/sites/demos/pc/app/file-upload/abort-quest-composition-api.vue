<template>
  <div class="content">
    <tiny-file-upload ref="uploadRef" :action="action">
      <tiny-button size="small"> 点击上传 </tiny-button>
    </tiny-file-upload>
    <br />
    <tiny-button @click="cancelUpload" type="primary"> 取消上传 </tiny-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { TinyFileUpload, TinyButton, TinyModal } from '@opentiny/vue'

const action = ref('http://localhost:3000/api/upload')
const uploadRef = ref()

function cancelUpload() {
  TinyModal.message({ message: '手动取消上传', status: 'info' })
  uploadRef.value.abort()
}
</script>
