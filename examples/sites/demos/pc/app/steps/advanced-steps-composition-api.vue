<template>
  <div class="demo-steps">
    <tiny-steps :data="data" :active="advancedActive" @click="advancedClick"></tiny-steps>
    <br /><br />

    <p>通过 <code>advanced</code> 属性启用高级向导功能：</p>
    <br />
    <tiny-steps advanced :data="data" :active="advancedActive" @click="advancedClick"></tiny-steps>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { TinySteps, TinyModal } from '@opentiny/vue'

const advancedActive = ref(1)
const data = ref([
  { name: 'Basic Info', count: 3, status: 'done' },
  { name: 'BOQ Info', count: 0, status: 'doing' },
  { name: 'Involved Parties', count: 10, status: 'error' },
  { name: 'Billing', count: 0, status: 'disabled' },
  { name: 'Appraise', count: 3 }
])

const advancedClick = (index, node) => {
  advancedActive.value = index

  TinyModal.message({ message: `节点 index: ${index}; 节点信息：${JSON.stringify(node)}`, status: 'info' })
}
</script>
