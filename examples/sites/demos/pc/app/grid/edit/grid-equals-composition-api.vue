<template>
  <tiny-grid :data="tableData" show-overflow="tooltip" :edit-config="{ trigger: 'click', mode: 'cell' }">
    <tiny-grid-column type="index" width="60"></tiny-grid-column>
    <tiny-grid-column field="created_date" title="创建时间"></tiny-grid-column>
    <tiny-grid-column
      field="employees"
      title="人数"
      :editor="{ component: 'input' }"
      :equals="employeesEquals"
    ></tiny-grid-column>
    <tiny-grid-column field="introduction" title="公司简介"></tiny-grid-column>
  </tiny-grid>
</template>

<script setup>
import { ref } from 'vue'
import { TinyGrid, TinyGridColumn } from '@opentiny/vue'

const tableData = ref([
  {
    id: '1',
    created_date: '2014-04-30 00:56:00',
    employees: 800,
    introduction: '公司技术和研发实力雄厚，是国家 863 项目的参与者，并被政府认定为“高新技术企业”。'
  },
  {
    id: '2',
    created_date: '2016-07-08 12:36:22',
    employees: 300,
    introduction: '公司技术和研发实力雄厚，是国家 863 项目的参与者，并被政府认定为“高新技术企业”。'
  },
  {
    id: '3',
    created_date: '2014-02-14 14:14:14',
    employees: 1300,
    introduction: '公司技术和研发实力雄厚，是国家 863 项目的参与者，并被政府认定为“高新技术企业”。'
  },
  {
    id: '4',
    created_date: '2013-01-13 13:13:13',
    employees: 360,
    introduction: '公司技术和研发实力雄厚，是国家 863 项目的参与者，并被政府认定为“高新技术企业”。'
  }
])

const employeesEquals = ({ value, originalValue }) => {
  // 如果数字相等就返回 true
  return Number(value) === Number(originalValue)
}
</script>
