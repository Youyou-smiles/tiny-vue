<template>
  <div class="demo-split">
    <tiny-split v-model="split1" @moving="moving">
      <template #left>
        <div class="demo-split-pane">左面板</div>
      </template>
      <template #right>
        <div class="demo-split-pane">右面板</div>
      </template>
    </tiny-split>
  </div>
</template>

<script lang="jsx">
import { TinySplit, TinyModal } from '@opentiny/vue'

export default {
  components: {
    TinySplit
  },
  data() {
    return {
      split1: 0.3
    }
  },
  methods: {
    moving() {
      TinyModal.message('正在拖拽...')
    }
  }
}
</script>

<style scoped>
.demo-split {
  height: 200px;
  margin-bottom: 20px;
}

.demo-split-pane {
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100%;
}
</style>
