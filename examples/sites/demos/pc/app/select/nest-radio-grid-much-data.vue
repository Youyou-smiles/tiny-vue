<template>
  <tiny-select v-model="radioValue" value-field="id" text-field="city" render-type="grid" :grid-op="gridOpRadio">
  </tiny-select>
</template>

<script>
import { TinySelect } from '@opentiny/vue'

export default {
  components: {
    TinySelect
  },
  data() {
    return {
      radioValue: '',
      gridOpRadio: {
        height: 200,
        data: [],
        columns: [
          { type: 'radio', title: '' },
          { field: 'area', title: '区域', width: 90 },
          { field: 'province', title: '省份', width: 60 },
          { field: 'city', title: '城市', width: 60 }
        ]
      }
    }
  },
  mounted() {
    const arr = []

    for (let i = 0; i <= 800; i++) {
      const obj = {
        id: i,
        area: '华南区 ' + i,
        province: '广东省',
        city: '广州市'
      }
      arr.push(obj)
    }

    this.gridOpRadio.data = arr
  }
}
</script>

<style lang="less" scoped>
.tiny-select {
  width: 280px;
}
</style>
