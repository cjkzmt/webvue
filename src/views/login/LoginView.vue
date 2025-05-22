<script setup lang="ts">
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { login } from '@/api/users'
import { useRouter, useRoute } from 'vue-router'
import { useTokenStore } from '@/stores/mytoken'
const form = reactive({ name: 'cui', password: '123456' })
const store = useTokenStore()
const router = useRouter()
const route = useRoute()
const rules = reactive<FormRules>({
  name: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur',
    },
    {
      pattern: /^[a-zA-Z0-9_-]{3,16}$/,
      message: '账号必须是3-16位数字和字母组合',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
    {
      pattern: /^[a-zA-Z0-9_-]{6,18}$/,
      message: '密码必须是6-18位',
      trigger: 'blur',
    },
  ],
})

const onSubmit = async () => {
  isLoading.value = true
  await formRef.value?.validate().catch((err) => {
    ElMessage.error('请输入账号和密码')
    isLoading.value = false
    throw err
  })
  const data = await login(form).then((res) => {
    if (!res.data.success) {
      ElMessage.error('登录信息有误')
      isLoading.value = false
      throw new Error('登录信息有误')
    }
    return res.data
  })
  console.log(data)
  store.saveToken(data.content)
  isLoading.value = false
  ElMessage.success('登录成功')
  router.push((route.query.redirect as string) || '/')
}
const isLoading = ref(false)
const formRef = ref<FormInstance>()
</script>

<template>
  <div class="login">
    <el-form
      :model="form"
      :rules="rules"
      ref="formRef"
      label-width="auto"
      style="max-width: 600px"
      label-position="top"
      size="large"
    >
      <h2>登录</h2>
      <el-form-item label="账号" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="isLoading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
  height: 100vh;
  align-items: center;
  .el-form {
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    .el-form-item {
      margin-top: 20px;
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>
