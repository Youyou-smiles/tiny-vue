<template>
  <tiny-floating-button :icon="IconArrowUp"></tiny-floating-button>
</template>

<script>
import { TinyFloatingButton } from '@opentiny/vue'
import { IconArrowUp } from '@opentiny/vue-icon'

export default {
  components: {
    TinyFloatingButton
  },
  data() {
    return {
      IconArrowUp: IconArrowUp()
    }
  }
}
</script>
