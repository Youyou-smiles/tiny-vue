<template>
  <div>
    <p>场景 1：默认下拉弹框宽度由内容撑开：</p>
    <br />
    <tiny-select v-model="value">
      <tiny-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </tiny-option>
    </tiny-select>
    <br /><br />
    <p>场景 2：下拉弹框宽度与输入框一致：</p>
    <br />
    <tiny-select v-model="value" is-drop-inherit-width>
      <tiny-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </tiny-option>
    </tiny-select>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { TinySelect, TinyOption } from '@opentiny/vue'

const options = ref([
  {
    value: '选项 1',
    label: '北京北京北京北京北京北京北京北京北京北京北京北京北京北京北京北京北京'
  },
  { value: '选项 2', label: '上海' },
  { value: '选项 3', label: '天津' },
  { value: '选项 4', label: '重庆' },
  { value: '选项 5', label: '深圳' }
])
const value = ref('')
</script>

<style lang="less" scoped>
.tiny-select {
  width: 280px;
}
p {
  font-size: 14px;
  line-height: 1.5;
}
</style>
