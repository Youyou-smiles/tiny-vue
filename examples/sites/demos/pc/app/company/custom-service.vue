<template>
  <div class="demo-company-class">
    <tiny-company
      v-model="value"
      placeholder="请输入"
      :fetch-company="getCompanyData"
      :fields="fields"
      :max="2"
      @change="change"
      @clear="clear"
      is-drop-inherit-width
      clearable
    ></tiny-company>
  </div>
</template>

<script lang="jsx">
import { TinyCompany, TinyModal } from '@opentiny/vue'

export default {
  components: {
    TinyCompany
  },
  data() {
    return {
      fields: {
        textField: 'name',
        valueField: 'id'
      },
      value: ''
    }
  },
  methods: {
    getCompanyData() {
      return new Promise((resolve) => {
        resolve([
          {
            id: '0001',
            name: '公司一'
          },
          {
            id: '0002',
            name: '公司二'
          },
          {
            id: '0003',
            name: '公司三'
          },
          {
            id: '0004',
            name: '公司四'
          }
        ])
      })
    },
    clear() {
      TinyModal.message({ message: 'clear:触发了', status: 'info' })
    },
    change(value) {
      TinyModal.message({ message: `change:${value}`, status: 'info' })
    }
  }
}
</script>

<style scoped>
.demo-company-class {
  width: 280px;
}
</style>
