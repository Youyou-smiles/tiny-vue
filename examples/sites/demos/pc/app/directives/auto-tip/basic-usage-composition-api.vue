<template>
  <div class="auto-tip" v-auto-tip>超出省略隐藏，鼠标移入是会有 ToolTip 提示</div>
</template>

<script setup>
import { AutoTip } from '@opentiny/vue-directive'

const VAutoTip = AutoTip
</script>

<style scoped>
.auto-tip {
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
