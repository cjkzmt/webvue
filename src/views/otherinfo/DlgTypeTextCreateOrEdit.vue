<script setup lang="ts">
import { ref } from 'vue'
import {
  isCreate,
  onSubmit,
  form,
  msgText,
  dialogFormVisible,
  allTypeText,
} from '@/composables/useTypeText'
import { type FormInstance } from 'element-plus'
const formLabelWidth = '140px'
const initAndShow = (id = 0) => {
  fmTypeText.value?.resetFields()
  dialogFormVisible.value = true
  if (id) {
    isCreate.value = false
    msgText.value = '更新'
    const TypeText = allTypeText.value.find((item) => item.id === id)
    Object.assign(form, TypeText)
  } else {
    isCreate.value = true
    msgText.value = '创建'
  }
}

const fmTypeText = ref<FormInstance>()
defineExpose({
  initAndShow,
})
</script>

<template>
  <el-dialog v-model="dialogFormVisible" :title="msgText + '文案类型'" width="500">
    <el-form :model="form" ref="fmTypeText">
      <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="描述" :label-width="formLabelWidth" prop="description">
        <el-input v-model="form.description" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 提 交 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
