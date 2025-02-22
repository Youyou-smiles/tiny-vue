<template>
  <tiny-grid ref="basicGridRef" v-bind="op"></tiny-grid>
</template>

<script setup>
import { ref } from 'vue'
import { TinyGrid, TinyPager, TinyGridToolbar, TinyModal } from '@opentiny/vue'

const op = ref({
  seqSerial: true,
  fullScreen: true,
  editConfig: { trigger: 'click', mode: 'cell', showStatus: true },
  fetchData: {
    api: getData
  },
  toolbar: {
    component: TinyGridToolbar,
    buttons: [
      {
        code: 'insert',
        name: '新增'
      },
      {
        code: 'copy',
        name: '复制'
      },
      {
        code: 'delete',
        name: '删除'
      },
      {
        code: 'cancel',
        name: '取消选择'
      },
      {
        code: 'save',
        name: '保存'
      }
    ]
  },
  events: {
    toolbarButtonClick: toolbarButtonClickEvent
  },
  pager: {
    component: TinyPager,
    attrs: {
      currentPage: 1,
      pageSize: 5,
      pageSizes: [5, 10],
      total: 0,
      layout: 'total, sizes, prev, pager, next, jumper'
    }
  },
  columns: [
    {
      type: 'selection',
      width: '50'
    },
    {
      type: 'index',
      width: '60'
    },
    {
      field: 'name',
      title: '名称',
      showOverflow: true,
      editor: { component: 'input', autoselect: true }
    },
    {
      field: 'area',
      title: '区域',
      editor: { component: 'input' }
    },
    {
      field: 'address',
      title: '地址',
      editor: { component: 'input' }
    },
    {
      field: 'introduction',
      title: '公司简介',
      showOverflow: true,
      editor: { component: 'input', autoselect: true }
    }
  ]
})
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
  },
  {
    id: '7',
    name: '深圳市福德宝网络技术 YX 公司',
    area: '华南区',
    address: '清远',
    introduction: '公司技术和研发实力雄厚，是国家 863 项目的参与者，并被政府认定为“高新技术企业”。'
  },
  {
    id: '8',
    name: '西安门福德宝网络技术 YX 公司',
    area: '华东区',
    address: '厦门',
    introduction: '公司技术和研发实力雄厚，是国家 863 项目的参与者，并被政府认定为“高新技术企业”。'
  },
  {
    id: '9',
    name: 'WWWW 科技股份有限子公司',
    area: '华南区',
    address: '韶关',
    introduction: '公司技术和研发实力雄厚，是国家 863 项目的参与者，并被政府认定为“高新技术企业”。'
  },
  {
    id: '10',
    name: 'WSX 科技 YX 公司',
    area: '华南区',
    address: '广州',
    introduction: '公司技术和研发实力雄厚，是国家 863 项目的参与者，并被政府认定为“高新技术企业”。'
  }
])
const basicGridRef = ref()

function getData({ page }) {
  const curPage = page.currentPage
  const pageSize = page.pageSize
  const offset = (curPage - 1) * pageSize

  return new Promise((resolve) => {
    resolve({
      result: tableData.value.slice(offset, offset + pageSize),
      page: { total: tableData.value.length }
    })
  })
}

function toolbarButtonClickEvent({ code, $grid }) {
  const data = $grid.getSelectRecords()

  const editRows = $grid.getUpdateRecords().concat($grid.getInsertRecords())

  switch (code) {
    case 'insert':
      basicGridRef.value.insert({})
      break
    case 'copy': {
      if (data.length === 0) {
        TinyModal.alert('请至少选中一条记录')
      }
      data.forEach((item) => {
        delete item._RID
      })
      $grid.insert(data)
      break
    }
    case 'cancel': {
      $grid.clearSelection()
      break
    }
    case 'delete': {
      if (data.length === 0) {
        TinyModal.alert('请至少选中一条记录')
      }
      $grid.removeSelecteds()
      break
    }
    case 'save': {
      if (editRows.length === 0) {
        TinyModal.alert('没有修改记录')
      }
      break
    }
  }
}
</script>
