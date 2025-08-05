<script setup lang="ts">
import {
  forminstance,
  onSubmit,
  form,
  distext,
  msgText,
  dialogFormVisible,
  initAndShow,
} from '@/composables/useKeyword'
const formLabelWidth = '140px'
defineExpose({initAndShow})
</script>
<template>
  <el-dialog v-model="dialogFormVisible" :title="msgText +distext" width="500">
    <el-form :model="form" ref="forminstance">
      <el-form-item  :label="distext"  :label-width="formLabelWidth" prop="text">
        <el-input v-model="form.text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
        <el-input v-model="form.sort" autocomplete="off" />
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
