<template>
  <tiny-tooltip content="渐隐动画" transition="custom-transition" placement="bottom">
    <button class="tiny-button tiny-button--primary">鼠标悬浮到这里</button>
  </tiny-tooltip>
</template>

<script setup lang="jsx">
import { TinyTooltip } from '@opentiny/vue'
</script>

<style>
/** 自定义动画类名要匹配 transition 属性中的值
    由于弹窗元素是插入到 body 中的，所以写在全局样式 */
.tiny-tooltip.custom-transition-enter,
.tiny-tooltip.custom-transition-enter-from,
.tiny-tooltip.custom-transition-leave-to {
  opacity: 0;
  transform-origin: center top;
}

.custom-transition-enter-active,
.custom-transition-leave-active {
  opacity: 1;
  transition: opacity 1.5s cubic-bezier(0.23, 1, 0.32, 1);
}
</style>
