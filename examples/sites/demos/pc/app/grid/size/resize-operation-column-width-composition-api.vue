<template>
  <tiny-grid :data="tableData" operation-column-resizable>
    <tiny-grid-column type="index" width="60"></tiny-grid-column>
    <tiny-grid-column type="radio" width="60"></tiny-grid-column>
    <tiny-grid-column type="selection" width="60"></tiny-grid-column>
    <tiny-grid-column field="name" title="名称"></tiny-grid-column>
    <tiny-grid-column field="area" title="所属区域"></tiny-grid-column>
    <tiny-grid-column field="address" title="地址"></tiny-grid-column>
  </tiny-grid>
</template>

<script setup lang="jsx">
import { ref } from 'vue'
import { TinyGrid, TinyGridColumn } from '@opentiny/vue'

const tableData = ref([
  { id: '1', name: 'GFD 科技有限公司', area: '华东区', address: '福州' },
  { id: '2', name: 'WWWW 科技有限公司', area: '华南区', address: '深圳福田区' },
  { id: '3', name: 'RFV 有限责任公司', area: '华南区', address: '中山市' },
  { id: '4', name: 'TGB 有限公司', area: '华北区', address: '梅州' },
  { id: '5', name: 'YHN 科技有限公司', area: '华南区', address: '韶关' },
  { id: '6', name: '康康物业有限公司', area: '华北区', address: '广州天河区' }
])
</script>
