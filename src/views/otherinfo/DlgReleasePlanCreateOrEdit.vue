<script setup lang="ts">
import {
  forminstance,
  onSubmit,
  form,
  msgText,
  dialogFormVisible,
  initAndShow,
} from '@/composables/useReleasePlan'
const formLabelWidth = '140px'
defineExpose({initAndShow})
</script>
<template>
  <el-dialog v-model="dialogFormVisible" :title="msgText + '平台'" width="500">
    <el-form :model="form" ref="forminstance">
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
