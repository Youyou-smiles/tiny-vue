<template>
  <div>
    <tiny-select v-model="value">
      <tiny-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        @click.native="clickItem(item.value)"
        :highlight-class="item._highlightClass"
      ></tiny-option>
    </tiny-select>
    <br /><br />
    <p class="cache-value">
      {{ cacheValue }}
    </p>
  </div>
</template>

<script>
import { TinySelect, TinyOption } from '@opentiny/vue'
import { Memorize } from '@opentiny/utils'

const MemorizeInstance = new Memorize({ key: 'test456' })

const options = MemorizeInstance.assemble([
  { value: '选项 1', label: '北京' },
  { value: '选项 2', label: '上海' },
  { value: '选项 3', label: '天津' },
  { value: '选项 4', label: '重庆' },
  { value: '选项 5', label: '深圳' }
])

export default {
  components: {
    TinySelect,
    TinyOption
  },
  data() {
    return {
      options,
      value: '选项 3',
      cacheValue: []
    }
  },
  methods: {
    clickItem(value) {
      MemorizeInstance.updateByKey(value)
      this.cacheValue = window.localStorage.getItem('tiny_memorize_test456')
    }
  },
  mounted() {
    window.localStorage.setItem('tiny_memorize_test456', '')
  }
}
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
