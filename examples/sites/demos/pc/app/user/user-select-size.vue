<template>
  <div class="demo-user-class">
    <p>尺寸：medium</p>
    <tiny-user v-model="user" size="medium"></tiny-user>
    <p>尺寸：small</p>
    <tiny-user v-model="user" size="small"></tiny-user>
    <p>尺寸：mini</p>
    <tiny-user v-model="user" size="mini"></tiny-user>
  </div>
</template>

<script lang="jsx">
import { TinyUser } from '@opentiny/vue'

export default {
  components: {
    TinyUser
  },
  data() {
    return {
      user: '421000103624183'
    }
  }
}
</script>

<style scoped>
.demo-user-class {
  width: 280px;
}
p {
  font-size: 14px;
  line-height: 1.5;
  padding: 16px 0;
}
</style>
