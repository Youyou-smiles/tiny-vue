<template>
  <tiny-calendar-view
    ref="calendar"
    v-model="selectedDates"
    :multi-select="true"
    :year="2023"
    :month="5"
    :modes="[]"
    :set-day-bg-color="setDayBgColor"
    @selected-date-change="selectedDateChange"
  >
    <template #tool>
      <tiny-button type="primary" @click="setDays('workingDays')" class="mr-2">工作日</tiny-button>
      <tiny-button type="success" @click="setDays('offDays')" class="mr-2">休息日</tiny-button>
      <tiny-button type="warning" @click="setDays('holidays')">节假日</tiny-button>
    </template>
  </tiny-calendar-view>
</template>

<script setup>
import { ref } from 'vue'
import { TinyCalendarView, TinyButton, TinyModal } from '@opentiny/vue'

const workingDays = ref([])
const offDays = ref([])
const holidays = ref([])
const selectedDate = ref([])
const selectedDates = ref([])

const map = {
  workingDays,
  offDays,
  holidays
}

const setDays = (type) => {
  if (!selectedDate.value.length) {
    TinyModal.message({ message: '请选择日期', status: 'info' })
    return
  }
  map[type].value.push(...selectedDate.value)

  selectedDate.value.forEach((date) => {
    if (type === 'workingDays') {
      removeFromArray(offDays.value, date)
      removeFromArray(holidays.value, date)
    } else if (type === 'offDays') {
      removeFromArray(holidays.value, date)
      removeFromArray(workingDays.value, date)
    } else {
      removeFromArray(offDays.value, date)
      removeFromArray(workingDays.value, date)
    }
  })
  selectedDates.value = []
  selectedDate.value = []
}

const removeFromArray = (array, item) => {
  const index = array.indexOf(item)
  if (index !== -1) {
    array.splice(index, 1)
  }
}

const setDayBgColor = (date) => {
  if (workingDays.value.includes(date)) {
    return 'blue'
  }
  if (offDays.value.includes(date)) {
    return 'green'
  }
  if (holidays.value.includes(date)) {
    return 'yellow'
  }

  return ''
}

const selectedDateChange = (date) => {
  selectedDate.value = date
}
</script>
