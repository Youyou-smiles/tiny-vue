<template>
  <div class="tiny-tag-demo">
    <tiny-tag v-for="tag in tags" :key="'tiny-tag1-' + tag.name" closable :type="tag.type" @click="handleClick">
      {{ tag.name }}
    </tiny-tag>
  </div>
</template>

<script lang="jsx">
import { TinyTag, TinyModal } from '@opentiny/vue'

export default {
  components: {
    TinyTag
  },
  data() {
    return {
      tags: [
        { name: '标签一', type: '' },
        { name: '标签二', type: 'success' },
        { name: '标签三', type: 'info' },
        { name: '标签四', type: 'warning' },
        { name: '标签五', type: 'danger' }
      ]
    }
  },
  methods: {
    handleClick() {
      TinyModal.message('click 事件')
    }
  }
}
</script>

<style scoped>
.tiny-tag-demo .tiny-tag {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
