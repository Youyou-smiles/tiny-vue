<template>
  <div>
    <p>默认显示清除按钮：</p>
    <br />
    <div class="demo-date-picker-wrap">
      <tiny-date-picker v-model="value"></tiny-date-picker>
    </div>
    <br />

    <p>隐藏清除按钮：</p>
    <br />
    <div class="demo-date-picker-wrap">
      <tiny-date-picker v-model="value" :clearable="false"></tiny-date-picker>
    </div>
    <br />

    <p>自定义清除图标：</p>
    <br />
    <div class="demo-date-picker-wrap">
      <tiny-date-picker v-model="value" :clear-icon="IconClose"></tiny-date-picker>
    </div>
  </div>
</template>

<script>
import { TinyDatePicker } from '@opentiny/vue'
import { iconClose } from '@opentiny/vue-icon'

export default {
  components: {
    TinyDatePicker
  },
  data() {
    return {
      value: new Date('2023-05-24'),
      IconClose: iconClose()
    }
  }
}
</script>

<style scoped>
.demo-date-picker-wrap {
  width: 360px;
}
</style>
