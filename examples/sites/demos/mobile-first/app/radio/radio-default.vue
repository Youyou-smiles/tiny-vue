<template>
  <div>
    <tiny-radio v-model="value" label="1">
      <span style="color: red">选项内容一</span>
      <span>选项描述</span>
    </tiny-radio>
    <tiny-radio v-model="value" label="2">
      <span>选项内容二</span>
      <span>选项描述</span>
    </tiny-radio>
  </div>
</template>

<script>
import { TinyRadio } from '@opentiny/vue'

export default {
  components: {
    TinyRadio
  },
  data() {
    return {
      value: '1'
    }
  }
}
</script>
