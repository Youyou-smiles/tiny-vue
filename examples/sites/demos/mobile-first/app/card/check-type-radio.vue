<template>
  <div>
    <tiny-card title="这是mini尺寸卡片" v-model="value" check-type="radio" label="1">
      <p>
        这是一段长文本内容，这是一段长文本内容，这是一段长文本内容，这是一段长文本内容，
        这是一段长文本内容，这是一段长文本内容，这是一段长文本内容，这是一段长文本内容，
      </p>
    </tiny-card>
    <br />
    <tiny-card title="这是samll尺寸卡片" v-model="value" check-type="radio" label="2">
      <p>
        这是一段长文本内容，这是一段长文本内容，这是一段长文本内容，这是一段长文本内容，
        这是一段长文本内容，这是一段长文本内容，这是一段长文本内容，这是一段长文本内容，
      </p>
    </tiny-card>
  </div>
</template>

<script>
import { TinyCard } from '@opentiny/vue'

export default {
  components: {
    TinyCard
  },
  data() {
    return {
      value: '1'
    }
  }
}
</script>
