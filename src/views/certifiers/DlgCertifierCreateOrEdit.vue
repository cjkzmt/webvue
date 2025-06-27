<script setup lang="ts">
import { ref } from 'vue'
import {
  isCreate,
  onSubmit,
  form,
  msgText,
  dialogFormVisible,
  queriedResult,
} from '@/composables/useCertifier'
import { type FormInstance } from 'element-plus'
const formLabelWidth = '140px'
const initAndShow = (id = 0) => {
  fmResourceCategory.value?.resetFields()
  dialogFormVisible.value = true
  if (id) {
    isCreate.value = false
    msgText.value = '更新'
    const resourceCategory = queriedResult.value.records.find((item) => item.id === id)
    Object.assign(form, resourceCategory)
  } else {
    isCreate.value = true
    msgText.value = '创建'
  }
}

const fmResourceCategory = ref<FormInstance>()
defineExpose({
  initAndShow,
})
</script>

<template>
  <el-dialog v-model="dialogFormVisible" :title="msgText + '手机'" width="500">
    <el-form :model="form" ref="fmResourceCategory">
      <el-form-item label="名字" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="身份证号" :label-width="formLabelWidth" prop="Model">
        <el-input v-model="form.idnumber" autocomplete="off" />
      </el-form-item>
      <el-form-item label="所有人" :label-width="formLabelWidth" prop="Owner">
        <el-input v-model="form.Owner" autocomplete="off" />
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
