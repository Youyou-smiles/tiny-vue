<template>
  <tiny-link-menu ref="linkmenu" :data="datas">
    <template #foot>
      <div style="margin-top: 20px">
        <tiny-button @click="handleSelect()">选择</tiny-button>
        <tiny-button @click="handleCancel()">取消</tiny-button>
      </div>
    </template>
  </tiny-link-menu>
</template>

<script lang="jsx">
import { TinyLinkMenu, TinyButton } from '@opentiny/vue'

export default {
  components: {
    TinyLinkMenu,
    TinyButton
  },
  data() {
    return {
      datas: [
        {
          id: 1,
          label: '更新日志'
        },
        {
          id: 2,
          label: '开发指南',
          children: [
            {
              id: 3,
              label: '引入组件',
              url: '#/webnova/zh-CN/guide/quickstart'
            },
            {
              id: 4,
              label: '国际化',
              url: '#/webnova/zh-CN/guide/i18n'
            },
            {
              id: 5,
              label: '权限',
              url: '#/webnova/zh-CN/guide/permission'
            }
          ]
        },
        {
          id: 6,
          label: '表单组件',
          children: [
            {
              id: 7,
              label: 'Button 按钮',
              url: '#/webnova/zh-CN/component/button'
            },
            {
              id: 8,
              label: 'Input 输入框',
              url: '#/webnova/zh-CN/component/input'
            }
          ]
        },
        {
          id: 9,
          label: '数据组件',
          children: [
            {
              id: 10,
              label: 'Pager 分页',
              url: '#/webnova/zh-CN/component/pager'
            },
            {
              id: 11,
              label: 'Tree 树形控件',
              url: '#/webnova/zh-CN/component/tree'
            }
          ]
        },
        {
          id: 12,
          label: '其他组件',
          children: [
            {
              id: 13,
              label: 'BulletinBoard 公告牌',
              url: '#/webnova/zh-CN/component/bulletin-board'
            },
            {
              id: 14,
              label: 'Tag 标签',
              url: '#/webnova/zh-CN/component/tag'
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleSelect() {
      this.$refs.linkmenu.sureNodevalue()
    },
    handleCancel() {
      this.$refs.linkmenu.hideDialog()
    }
  }
}
</script>
