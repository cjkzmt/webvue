<script setup lang="ts">
import {
  forminstance,
  onSubmit,
  form,
  msgText,
  dialogFormVisible,
  initAndShow,
} from '@/composables/useAiApi'
const formLabelWidth = '140px'
defineExpose({initAndShow})
</script>

<template>
  <el-dialog v-model="dialogFormVisible" :title="msgText + '平台'" width="500">
    <el-form :model="form" ref="forminstance">
      <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="描述" :label-width="formLabelWidth" prop="description">
        <el-input v-model="form.description" autocomplete="off" />
      </el-form-item>
      <el-form-item label="官网" :label-width="formLabelWidth" prop="url">
        <el-input v-model="form.url" autocomplete="off" />
      </el-form-item>
      <el-form-item label="端口" :label-width="formLabelWidth" prop="port">
        <el-input v-model="form.port" autocomplete="off" />
      </el-form-item>
      <el-form-item label="默认模型" :label-width="formLabelWidth" prop="model">
        <el-input v-model="form.model" autocomplete="off" />
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth" prop="note">
        <el-input v-model="form.note" autocomplete="off" />
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
