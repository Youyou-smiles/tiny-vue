<template>
  <tiny-select v-model="value" placeholder="请选择" :dropdown-icon="IconPopup" title="标题">
    <tiny-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </tiny-option>
  </tiny-select>
</template>

<script>
import { TinySelect, TinyOption } from '@opentiny/vue'
import { IconPopup } from '@opentiny/vue-icon'

export default {
  components: {
    TinySelect,
    TinyOption
  },
  data() {
    return {
      IconPopup: IconPopup(),
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: ''
    }
  }
}
</script>
