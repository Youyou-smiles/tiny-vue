<template>
  <div class="demo-input">
    <tiny-input disabled></tiny-input>
  </div>
</template>

<script>
import { TinyInput } from '@opentiny/vue'

export default {
  components: {
    TinyInput
  }
}
</script>

<style scoped>
.demo-input .tiny-input {
  width: 250px;
}
</style>
