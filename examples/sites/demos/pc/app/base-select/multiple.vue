<template>
  <div>
    <br />
    <div>场景 1：多选</div>
    <br />
    <tiny-base-select v-model="value1" multiple searchable>
      <tiny-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"> </tiny-option>
    </tiny-base-select>
    <br />
    <br />
    <br />
    <div>场景 2：必选</div>
    <br />
    <tiny-base-select v-model="value2" multiple>
      <tiny-option
        v-for="item in options2"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :required="item.required"
      >
      </tiny-option>
    </tiny-base-select>
    <br />
    <br />
    <br />
    <div>场景 3：配置式必选</div>
    <br />
    <tiny-base-select v-model="value3" multiple :options="options2"> </tiny-base-select>
    <br />
    <br />
    <br />
    <div>场景 4：多选个数限制</div>
    <br />
    <tiny-base-select v-model="value4" multiple :multiple-limit="2" show-limit-text>
      <tiny-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"> </tiny-option>
    </tiny-base-select>
    <br />
    <br />
    <br />
    <div>场景 5：自定义图标 + 自定义样式</div>
    <br />
    <tiny-base-select
      v-model="value4"
      multiple
      :dropdown-icon="iconPopup"
      :drop-style="{ width: '200px', 'min-width': '200px' }"
    >
      <tiny-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"> </tiny-option>
    </tiny-base-select>
    <br />
  </div>
</template>

<script>
import { TinyBaseSelect, TinyOption } from '@opentiny/vue'
import { iconPopup } from '@opentiny/vue-icon'

export default {
  components: {
    TinyBaseSelect,
    TinyOption
  },
  data() {
    return {
      options1: [
        { value: '选项 1', label: '北京' },
        { value: '选项 2', label: '上海' },
        { value: '选项 3', label: '天津' },
        { value: '选项 4', label: '重庆' },
        { value: '选项 5', label: '深圳' },
        { value: '选项 6', label: '南京' },
        { value: '选项 7', label: '成都' }
      ],
      options2: [
        { value: '选项 1', label: '北京' },
        { value: '选项 2', label: '上海' },
        { value: '选项 3', label: '天津' },
        { value: '选项 4', label: '重庆' },
        { value: '选项 5', label: '深圳', required: true },
        { value: '选项 6', label: '南京' },
        { value: '选项 7', label: '成都' }
      ],
      value1: ['选项 1', '选项 2'],
      value2: ['选项 1', '选项 2'],
      value3: ['选项 1', '选项 2'],
      value4: [],
      iconPopup: iconPopup()
    }
  }
}
</script>

<style lang="less" scoped>
.tiny-base-select {
  width: 280px;
}
</style>
