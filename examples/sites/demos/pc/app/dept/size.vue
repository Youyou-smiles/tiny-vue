<template>
  <div class="demo-dept-class">
    <tiny-dept v-model="value" size="medium"></tiny-dept>
    <br />
    <tiny-dept v-model="value"></tiny-dept>
    <br />
    <tiny-dept v-model="value" size="small"></tiny-dept>
    <br />
    <tiny-dept v-model="value" size="mini"></tiny-dept>
  </div>
</template>

<script lang="jsx">
import { TinyDept } from '@opentiny/vue'

export default {
  components: {
    TinyDept
  },
  data() {
    return {
      value: '022471'
    }
  }
}
</script>

<style scoped>
.demo-dept-class {
  width: 280px;
}
</style>
