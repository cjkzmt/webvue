<script setup lang="ts">
import {
  forminstance,
  onSubmit,
  form,
  msgText,
  dialogFormVisible,
  initAndShow,
} from '@/composables/useScript'
const formLabelWidth = '140px'
defineExpose({initAndShow})
</script>
<template>
  <el-dialog v-model="dialogFormVisible" :title="msgText + '脚本'" width="1500">
    <el-form :model="form" ref="forminstance">
      <el-form-item label="标题描述" :label-width="formLabelWidth" prop="title">
        <el-input v-model="form.title" autocomplete="off" type="textarea" :rows="1"  />
      </el-form-item>
      <el-form-item label="封面标题" :label-width="formLabelWidth" prop="cover">
        <el-input v-model="form.cover" autocomplete="off"  type="textarea" :rows="2" />
      </el-form-item>
      <el-form-item label="显示文案" :label-width="formLabelWidth" prop="subtitle">
        <el-input v-model="form.subtitle" autocomplete="off"  type="textarea" :rows="10" />
      </el-form-item>
      <el-form-item label="字幕读音" :label-width="formLabelWidth" prop="reading">
        <el-input v-model="form.reading" autocomplete="off" type="textarea" :rows="10"  />
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
