<template>
  <tiny-form :inline="true" label-suffix="：" size="small">
    <tiny-form-item label="数字">
      <tiny-numeric v-model="formData.quantity"></tiny-numeric>
    </tiny-form-item>
    <tiny-form-item label="单选">
      <tiny-radio v-model="formData.sex" label="1"> 男 </tiny-radio>
      <tiny-radio v-model="formData.sex" label="2" text="女"></tiny-radio>
    </tiny-form-item>
  </tiny-form>
</template>

<script>
import { TinyForm, TinyFormItem, TinyNumeric, TinyRadio } from '@opentiny/vue'

export default {
  components: {
    TinyForm,
    TinyFormItem,
    TinyNumeric,
    TinyRadio
  },
  data() {
    return {
      formData: {
        quantity: 0,
        sex: ''
      }
    }
  }
}
</script>

<style scoped>
.tiny-form-item {
  width: 400px;
}
</style>
