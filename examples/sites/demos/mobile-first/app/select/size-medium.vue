<template>
  <tiny-select v-model="value" placeholder="请选择" size="medium" :options="options" title="标题"></tiny-select>
</template>

<script>
import { TinySelect } from '@opentiny/vue'

export default {
  components: {
    TinySelect
  },
  data() {
    return {
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
