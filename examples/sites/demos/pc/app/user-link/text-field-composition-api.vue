<template>
  <tiny-user-link v-model="user" text-field="userCN"></tiny-user-link>
</template>

<script setup lang="jsx">
import { ref } from 'vue'
import { TinyUserLink } from '@opentiny/vue'

const user = ref('441047913162396,421000103624183')
</script>
