<template>
  <div>
    <tiny-button @click="clickChange">修改</tiny-button>
    <br /><br />
    <tiny-numeric :change-compat="false" v-model="value" @change="onChange"></tiny-numeric>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TinyNumeric, TinyModal, TinyButton } from '@opentiny/vue'

const value = ref(1)

const onChange = (newVal: number, oldVal: number) => {
  TinyModal.message({
    message: '新值：' + newVal + '，旧值：' + oldVal,
    status: 'info'
  })
}

const clickChange = () => {
  value.value = 22
}
</script>
