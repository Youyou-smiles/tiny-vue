<template>
  <tiny-grid :data="tableData" @fullscreen="onFullscreen">
    <template #toolbar>
      <tiny-grid-toolbar
        full-screen
        :before-open-full-screen="beforeOpenFullScreen"
        :before-close-full-screen="beforeCloseFullScreen"
      ></tiny-grid-toolbar>
    </template>
    <tiny-grid-column field="name" title="名称"></tiny-grid-column>
    <tiny-grid-column field="area" title="所属区域"></tiny-grid-column>
    <tiny-grid-column field="address" title="地址"></tiny-grid-column>
    <tiny-grid-column field="introduction" title="公司简介" show-overflow></tiny-grid-column>
  </tiny-grid>
</template>

<script setup lang="jsx">
import { ref } from 'vue'
import { TinyGrid, TinyGridColumn, TinyGridToolbar, TinyModal } from '@opentiny/vue'

const tableData = ref([
  {
    id: '1',
    name: 'GFD 科技 YX 公司',
    area: '华东区',
    address: '福州',
    introduction: '公司技术和研发实力雄厚，是国家 863 项目的参与者，并被政府认定为“高新技术企业”。'
  },
  {
    id: '2',
    name: 'WWWW 科技 YX 公司',
    area: '华南区',
    address: '深圳福田区',
    introduction: '公司技术和研发实力雄厚，是国家 863 项目的参与者，并被政府认定为“高新技术企业”。'
  },
  {
    id: '3',
    name: 'RFV 有限责任公司',
    area: '华南区',
    address: '中山市',
    introduction: '公司技术和研发实力雄厚，是国家 863 项目的参与者，并被政府认定为“高新技术企业”。'
  },
  {
    id: '4',
    name: 'TGBYX 公司',
    area: '华北区',
    address: '梅州',
    introduction: '公司技术和研发实力雄厚，是国家 863 项目的参与者，并被政府认定为“高新技术企业”。'
  },
  {
    id: '5',
    name: 'YHN 科技 YX 公司',
    area: '华南区',
    address: '韶关',
    introduction: '公司技术和研发实力雄厚，是国家 863 项目的参与者，并被政府认定为“高新技术企业”。'
  },
  {
    id: '6',
    name: '康康物业 YX 公司',
    area: '华北区',
    address: '广州天河区',
    introduction: '公司技术和研发实力雄厚，是国家 863 项目的参与者，并被政府认定为“高新技术企业”。'
  }
])

function beforeOpenFullScreen() {
  let doAction = true

  TinyModal.message({
    message: doAction ? '不阻止全屏' : '阻止全屏',
    status: 'info'
  })

  return doAction
}

function beforeCloseFullScreen() {
  let doAction = true

  TinyModal.message({
    message: doAction ? '不阻止退出全屏' : '阻止退出全屏',
    status: 'info'
  })

  return doAction
}

function onFullscreen(isFull) {
  TinyModal.message({
    message: isFull ? '全屏了' : '关闭全屏了',
    status: 'info'
  })
  return true
}
</script>
