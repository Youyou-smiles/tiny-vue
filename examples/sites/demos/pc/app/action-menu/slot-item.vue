<template>
  <tiny-action-menu :options="options">
    <template #item="{ data }">
      <icon-smile></icon-smile>
      <span style="vertical-align: middle"> {{ data.name }}</span>
    </template>
  </tiny-action-menu>
</template>

<script>
import { TinyActionMenu } from '@opentiny/vue'
import { iconSmile } from '@opentiny/vue-icon'

export default {
  components: {
    TinyActionMenu,
    IconSmile: iconSmile()
  },
  data() {
    return {
      options: [
        {
          name: '远程登陆'
        },
        {
          name: '开机'
        },
        {
          name: '关机'
        },
        {
          name: '重启'
        },
        {
          name: '网络设置',
          children: [{ name: '更改安全组' }, { name: '切换 VPC', divided: true }]
        }
      ]
    }
  }
}
</script>
