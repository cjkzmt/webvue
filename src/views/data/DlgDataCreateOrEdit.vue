<script setup lang="ts">
import {
  forminstance,
  onSubmit,
  form,
  msgText,
  dialogFormVisible,
  initAndShow,
} from '@/composables/useAuthor'
const formLabelWidth = '140px'
defineExpose({initAndShow})
</script>

<template>
  <el-dialog v-model="dialogFormVisible" :title="msgText + '手机'" width="500">
    <el-form :model="form" ref="forminstance">
      <el-form-item label="链接" :label-width="formLabelWidth" prop="url">
        <el-input v-model="form.url" autocomplete="off" type="textarea" :rows="3" />
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
