<template>
  <div>
    <tiny-button @click="fn" type="primary"> 宽度拖拽 </tiny-button>
    <tiny-drawer title="标题" :width="width" dragable :visible="visible" @update:visible="visible = $event">
      <div style="height: 200px; text-align: center">
        <tiny-button @click="width = '600px'"> 抽屉宽度改为 700px </tiny-button>
        <tiny-button @click="width = '80%'"> 抽屉宽度改为 80% </tiny-button>
      </div>
    </tiny-drawer>
  </div>
</template>

<script>
import { TinyDrawer, TinyButton } from '@opentiny/vue'

export default {
  components: {
    TinyDrawer,
    TinyButton
  },
  data() {
    return {
      visible: false,
      width: '500px'
    }
  },
  methods: {
    fn() {
      this.visible = true
    }
  }
}
</script>
