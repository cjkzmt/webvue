
<script setup lang="ts">
import {
  forminstance,
  onSubmit,
  form,
  msgText,
  dialogFormVisible,
  initAndShow,
} from '@/composables/useTypeCover'
const formLabelWidth = '140px'
defineExpose({initAndShow})
</script>
<template>
  <el-dialog v-model="dialogFormVisible" :title="msgText + '封面样式'" width="500">
    <el-form :model="form" ref="forminstance">
      <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="固定标题" :label-width="formLabelWidth" prop="fixedtitle">
        <el-input v-model="form.fixedtitle" autocomplete="off" />
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
