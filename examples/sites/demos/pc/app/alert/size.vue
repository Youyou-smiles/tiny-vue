<template>
  <div>
    <tiny-alert size="normal" description="size 为 normal"></tiny-alert>
    <tiny-alert size="large" title="size 为 large" description="size 为 large"></tiny-alert>
  </div>
</template>

<script>
import { TinyAlert } from '@opentiny/vue'
export default {
  components: {
    TinyAlert
  }
}
</script>
