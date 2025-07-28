
<script setup lang="ts">
import {
  forminstance,
  onSubmit,
  form,
  msgText,
  dialogFormVisible,
  initAndShow,
} from '@/composables/useTypeSubtitle'
const formLabelWidth = '140px'
defineExpose({initAndShow})
</script>
<template>
  <el-dialog v-model="dialogFormVisible" :title="msgText + '字幕样式'" width="500">
    <el-form :model="form" ref="forminstance">
      <el-form-item label="名字" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="字号" :label-width="formLabelWidth" prop="fontsize">
        <el-input v-model="form.fontsize" autocomplete="off" />
      </el-form-item>
      <el-form-item label="字色" :label-width="formLabelWidth" prop="fontcolor">
        <el-input v-model="form.fontcolor" autocomplete="off" />
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
