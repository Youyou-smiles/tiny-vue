<template>
  <div class="demo-form">
    <tiny-form
      ref="ruleFormRef"
      @submit.native.prevent
      :model="createData"
      :append-to-body="true"
      :rules="rules"
      label-width="100px"
    >
      <tiny-form-item label="必填" prop="users">
        <tiny-input v-model="createData.users"></tiny-input>
      </tiny-form-item>
      <tiny-form-item label="日期" prop="datepicker">
        <tiny-date-picker type="daterange" v-model="createData.datepicker"></tiny-date-picker>
      </tiny-form-item>
      <tiny-form-item label="等级" prop="radio">
        <tiny-checkbox-group v-model="createData.radio" :options="options"></tiny-checkbox-group>
      </tiny-form-item>
      <tiny-form-item label="邮件" prop="email" class="my-form-item">
        <tiny-input v-model="createData.email"></tiny-input>
      </tiny-form-item>
      <tiny-form-item label="文本" prop="textarea">
        <tiny-popeditor
          v-model="createData.textarea"
          :append-to-body="false"
          :grid-op="gridOp"
          text-field="name"
          value-field="id"
          :conditions="conditions"
        ></tiny-popeditor>
      </tiny-form-item>
      <tiny-form-item>
        <tiny-button type="primary" @click="reset">重置</tiny-button>
        <tiny-button type="primary" @click="handleSubmit()">提交</tiny-button>
      </tiny-form-item>
    </tiny-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  TinyForm,
  TinyFormItem,
  TinyInput,
  TinyDatePicker,
  TinyButton,
  TinyModal,
  TinyCheckboxGroup,
  TinyPopeditor
} from '@opentiny/vue'

const dataset = [
  {
    id: '1',
    name: 'GFD 科技 YX 公司',
    city: '福州',
    province: '福建'
  },
  {
    id: '2',
    name: 'WWW 科技 YX 公司',
    city: '深圳',
    province: '广东'
  },
  {
    id: '3',
    name: 'RFV 有限责任公司',
    city: '中山',
    province: '广东'
  },
  {
    id: '4',
    name: 'TGB 科技 YX 公司',
    city: '龙岩',
    province: '福建'
  },
  {
    id: '5',
    name: 'YHN 科技 YX 公司',
    city: '韶关',
    province: '广东'
  },
  {
    id: '6',
    name: 'WSX 科技 YX 公司',
    city: '黄冈',
    province: '武汉'
  },
  {
    id: '7',
    name: 'KBG 物业 YX 公司',
    city: '赤壁',
    province: '武汉'
  },
  {
    id: '8',
    name: '深圳市福德宝网络技术 YX 公司',
    province: '广东',
    city: '深圳'
  },
  {
    id: '9',
    name: 'KBG 物业 YX 公司',
    city: '赤壁',
    province: '武汉'
  },
  {
    id: '10',
    name: '深圳市福德宝网络技术 YX 公司',
    province: '广东',
    city: '深圳'
  }
]

const options = ref([
  { label: '45', text: '很好' },
  { label: '46', text: '一般' }
])
const createData = ref({
  radio: [],
  users: '',
  email: '',
  datepicker: [],
  textarea: ''
})
const gridOp = ref({
  columns: [
    {
      field: 'id',
      title: 'ID',
      width: 50
    },
    {
      field: 'name',
      title: '名称'
    },
    {
      field: 'province',
      title: '省份',
      width: 80
    },
    {
      field: 'city',
      title: '城市',
      width: 80
    }
  ],
  data: dataset
})
const conditions = ref([
  { label: '公司名', labelWidth: '80px', field: 'name' },
  { label: '城市', labelWidth: '80px', field: 'city' }
])
const value = ref('')
const rules = ref({
  radio: [{ required: true, message: '必填', trigger: 'change' }],
  textarea: [{ required: true, message: '必填', trigger: 'change' }],
  users: [
    { required: true, message: '必填', trigger: 'blur' },
    { min: 2, max: 11, message: '长度必须不小于 2', trigger: 'change' }
  ],
  email: { type: 'email' }
})
const ruleFormRef = ref()

function reset() {
  ruleFormRef.value.resetFields()
}

function handleSubmit() {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      TinyModal.alert('提交成功')
    }
  })
}
</script>

<style>
.demo-form {
  width: 60%;
  position: relative;
}

.demo-form .tiny-date-editor--daterange.tiny-input {
  width: 100%;
}
</style>
