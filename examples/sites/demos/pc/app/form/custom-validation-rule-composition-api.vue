<template>
  <div class="demo-form">
    <tiny-form ref="ruleFormRef" :model="createData" :rules="rules" :validate-on-rule-change="isValidate">
      <tiny-form-item label="用户名" prop="username">
        <tiny-input v-model="createData.username"></tiny-input>
      </tiny-form-item>
      <tiny-form-item label="密码" prop="password">
        <tiny-input v-model="createData.password" type="password" show-password></tiny-input>
      </tiny-form-item>
      <tiny-form-item>
        <tiny-button type="primary" @click="handleSubmit()"> 注册 </tiny-button>
        <tiny-button @click="changeRule"> 改变校验规则 </tiny-button>
      </tiny-form-item>
    </tiny-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { TinyForm, TinyFormItem, TinyInput, TinyButton } from '@opentiny/vue'

const ruleFormRef = ref()
const createData = reactive({
  username: '',
  password: ''
})

let validatePass = (rule, value, callback) => {
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)) {
    callback(new Error('最少八个字符，至少包含一个大写字母，一个小写字母和一个数字'))
  } else {
    callback()
  }
}

const isValidate = ref(true)
const rules = ref({
  username: [
    { required: true, message: '必填', trigger: 'blur' },
    { min: 2, max: 11, message: '长度必须不小于 2', trigger: ['change', 'blur'] }
  ],
  password: [
    { required: true, message: '必填', trigger: 'blur' },
    { validator: validatePass, trigger: 'blur' }
  ]
})

function handleSubmit() {
  ruleFormRef.value.validate(() => {
    // empty
  })
}

function changeRule() {
  rules.value = {
    username: [
      { required: true, message: '必填', trigger: 'blur' },
      { min: 2, max: 11, message: '长度必须不小于 2', trigger: 'change' }
    ]
  }
}
</script>

<style scoped>
.demo-form {
  width: 380px;
}
</style>
