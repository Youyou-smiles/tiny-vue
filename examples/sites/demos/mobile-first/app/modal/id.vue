<template>
  <tiny-button @click="btnClick" :reset-time="0">不允许重复点击</tiny-button>
</template>

<script>
import { TinyButton, TinyModal } from '@opentiny/vue'

export default {
  components: {
    TinyButton
  },
  methods: {
    btnClick() {
      TinyModal.message({ message: '不允许重复点击', id: 'unique' })
    }
  }
}
</script>
