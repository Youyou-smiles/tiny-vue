<template>
  <div>
    <p>场景 1：多选复制单个标签</p>
    <tiny-base-select ref="selectTagSelectable" v-model="value1" multiple tag-selectable>
      <tiny-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </tiny-option>
    </tiny-base-select>
    <p>场景 2：多选一键复制所有标签</p>
    <tiny-base-select ref="selectCopyable" v-model="value2" multiple copyable>
      <tiny-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </tiny-option>
    </tiny-base-select>
    <p>场景 3：多选设置复制文本分隔符</p>
    <tiny-base-select ref="selectCopyable" v-model="value2" multiple copyable text-split="/">
      <tiny-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </tiny-option>
    </tiny-base-select>
    <p>复制到此处：</p>
    <tiny-input v-model="copyValue" class="copy-value" type="text"></tiny-input>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { TinyBaseSelect, TinyOption, TinyInput } from '@opentiny/vue'

const options = ref([
  { value: '选项 1', label: '北京' },
  { value: '选项 2', label: '上海' },
  { value: '选项 3', label: '天津' },
  { value: '选项 4', label: '重庆' },
  { value: '选项 5', label: '深圳' }
])
const value1 = ref(['选项 1'])
const value2 = ref(['选项 1', '选项 2'])
const copyValue = ref('')
</script>

<style lang="less" scoped>
.tiny-base-select {
  width: 280px;
}
p {
  font-size: 14px;
  line-height: 1.5;
  padding: 16px 0;
}
</style>
