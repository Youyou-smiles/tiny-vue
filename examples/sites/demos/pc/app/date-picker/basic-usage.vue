<template>
  <div class="demo-date-picker-wrap">
    <tiny-date-picker v-model="value" placeholder="请选择日期"></tiny-date-picker>
    <tiny-date-picker v-model="dateTimeValue" type="datetime" placeholder="请选择日期"></tiny-date-picker>
    <tiny-date-picker v-model="weekValue" type="week" placeholder="请选择周"></tiny-date-picker>
    <tiny-date-picker v-model="monthValue" type="month" placeholder="请选择月份"></tiny-date-picker>
    <tiny-date-picker v-model="quarterValue" type="quarter" placeholder="请选择季度"></tiny-date-picker>
    <tiny-date-picker v-model="yearValue" type="year" placeholder="请选择年份"></tiny-date-picker>
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
      value: '',
      dateTimeValue: '',
      weekValue: '',
      monthValue: '',
      quarterValue: '',
      yearValue: ''
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
