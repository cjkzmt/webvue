<script setup lang="ts">
import { ref } from 'vue'
import {
  isCreate,
  onSubmit,
  form,
  msgText,
  dialogFormVisible,
  allReleasePlan,
} from '@/composables/useReleasePlan'
import { type FormInstance } from 'element-plus'
const formLabelWidth = '140px'
const initAndShow = (id = 0) => {
  fmReleasePlan.value?.resetFields()
  dialogFormVisible.value = true
  if (id) {
    isCreate.value = false
    msgText.value = '更新'
    const ReleasePlan = allReleasePlan.value.find((item) => item.id === id)
    Object.assign(form, ReleasePlan)
  } else {
    isCreate.value = true
    msgText.value = '创建'
  }
}

const fmReleasePlan = ref<FormInstance>()
defineExpose({
  initAndShow,
})
</script>

<template>
  <el-dialog v-model="dialogFormVisible" :title="msgText + '平台'" width="500">
    <el-form :model="form" ref="fmReleasePlan">
      <el-form-item label="时" :label-width="formLabelWidth" prop="hour">
        <el-input v-model="form.hour" autocomplete="off" />
      </el-form-item>
      <el-form-item label="分" :label-width="formLabelWidth" prop="minute">
        <el-input v-model="form.minute" autocomplete="off" />
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
