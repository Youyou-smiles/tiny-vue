<template>
  <tiny-user-contact :data="data"></tiny-user-contact>
</template>

<script setup lang="jsx">
import { TinyUserContact } from '@opentiny/vue'
import { reactive } from 'vue'

const data = reactive({
  imgUrl: `${import.meta.env.VITE_APP_BUILD_BASE_URL}static/images/fruit.jpg`,
  userName: '小红',
  userDescription: 'test1',
  values: [
    { text: '部门', value: '某部门' },
    { text: '邮件', value: 'example@example.com' },
    { text: '手机', value: '1234567890' }
  ]
})
</script>
