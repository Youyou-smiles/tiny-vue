<template>
  <div class="demo-input">
    <tiny-input placeholder="请输入内容" v-model="input">
      <template #append>.com</template>
    </tiny-input>
  </div>
</template>

<script>
import { TinyInput } from '@opentiny/vue'

export default {
  components: {
    TinyInput
  },
  data() {
    return {
      input: ''
    }
  }
}
</script>

<style scoped>
.demo-input .tiny-input {
  width: 250px;
}
</style>
