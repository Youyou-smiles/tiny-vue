<template>
  <div>
    <tiny-select v-model="value" placeholder="请选择" value-key="val" title="标题">
      <tiny-option v-for="item in options" :key="item.obj.id" :label="item.text" :value="item.obj"> </tiny-option>
    </tiny-select>
    {{ value }}
  </div>
</template>

<script>
import { TinySelect, TinyOption } from '@opentiny/vue'

export default {
  components: {
    TinySelect,
    TinyOption
  },
  data() {
    return {
      options: [
        {
          obj: { val: '选项1', id: 1 },
          text: '黄金糕'
        },
        {
          obj: { val: '选项2', id: 2 },
          text: '双皮奶'
        },
        {
          obj: { val: '选项3', id: 3 },
          text: '蚵仔煎'
        },
        {
          obj: { val: '选项4', id: 4 },
          text: '龙须面'
        },
        {
          obj: { val: '选项5', id: 5 },
          text: '北京烤鸭'
        }
      ],
      value: { val: '选项3', id: 3 }
    }
  }
}
</script>
