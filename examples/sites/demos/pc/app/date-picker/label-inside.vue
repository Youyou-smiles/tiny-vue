<template>
  <div class="demo-date-picker-wrap">
    <tiny-date-picker v-model="dateValue" label="选择日期"></tiny-date-picker>
    <tiny-date-picker v-model="dateRangeValue" label="选择日期范围" type="daterange"></tiny-date-picker>
  </div>
</template>

<script>
import { TinyDatePicker } from '@opentiny/vue'

export default {
  components: {
    TinyDatePicker
  },
  data() {
    return {
      dateValue: new Date(),
      dateRangeValue: []
    }
  }
}
</script>

<style scoped lang="less">
.demo-date-picker-wrap {
  width: 360px;

  & > * {
    margin-top: 12px;
  }
}
</style>
