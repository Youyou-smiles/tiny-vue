<template>
  <div>
    <tiny-search v-model="value" placeholder="请输入关键词"></tiny-search>
    {{ value }}
  </div>
</template>

<script>
import { TinySearch } from '@opentiny/vue'

export default {
  components: {
    TinySearch
  },
  data() {
    return {
      value: ''
    }
  }
}
</script>
