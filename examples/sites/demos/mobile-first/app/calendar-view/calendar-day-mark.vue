<template>
  <tiny-calendar-view
    :events="eventslist"
    :year="2023"
    :month="5"
    mode="timeline"
    :show-mark="showMark"
    mark-color="red"
  >
  </tiny-calendar-view>
</template>

<script>
import { TinyCalendarView } from '@opentiny/vue'

export default {
  components: {
    TinyCalendarView
  },
  data() {
    return {
      eventslist: []
    }
  },
  methods: {
    showMark(date) {
      return date.split('-')[2] < 10
    }
  }
}
</script>
