<template>
  <div>
    <tiny-button @click="boxVisibility = true">弹出轮播</tiny-button>
    <tiny-dialog-box
      :visible="boxVisibility"
      @update:visible="boxVisibility = $event"
      max-height="500"
      title="弹窗事例"
      width="30%"
      :is-form-reset="false"
    >
      <tiny-carousel height="150px" arrow="always" autoplay>
        <tiny-carousel-item class="carousel-item-demo" v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
        </tiny-carousel-item>
      </tiny-carousel>
      <template #footer>
        <tiny-button type="primary" @click="handleSubmit">确定</tiny-button>
      </template>
    </tiny-dialog-box>
  </div>
</template>

<script>
import { TinyCarousel, TinyCarouselItem, TinyButton, TinyDialogBox } from '@opentiny/vue'

export default {
  components: {
    TinyCarousel,
    TinyCarouselItem,
    TinyDialogBox,
    TinyButton
  },
  data() {
    return {
      boxVisibility: false
    }
  },
  methods: {
    handleSubmit() {
      this.boxVisibility = false
    }
  }
}
</script>

<style scoped>
.tiny-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
  font-size: 25px;
}

.carousel-item-demo:nth-child(2n) {
  background-color: #fafafa;
}

.carousel-item-demo:nth-child(2n + 1) {
  background-color: #edf0f3;
}
</style>
