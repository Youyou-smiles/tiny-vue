<template>
  <div class="demo-split">
    <tiny-split v-model="split1" mode="vertical">
      <template #top>
        <div class="demo-split-pane">自定义上面板</div>
      </template>
      <template #bottom>
        <div class="demo-split-pane">自定义下面板</div>
      </template>
    </tiny-split>
  </div>
</template>

<script lang="jsx">
import { TinySplit } from '@opentiny/vue'

export default {
  components: {
    TinySplit
  },
  data() {
    return {
      split1: 0.3
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
