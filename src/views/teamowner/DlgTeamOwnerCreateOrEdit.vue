<script setup lang="ts">
import {
  forminstance,
  onSubmit,
  form,
  msgText,
  dialogFormVisible,
  initAndShow,
} from '@/composables/useTeamOwner'
const formLabelWidth = '140px'
defineExpose({initAndShow})
</script>

<template>
  <el-dialog v-model="dialogFormVisible" :title="msgText + '音乐'" width="500">
    <el-form :model="form" ref="forminstance">
      <el-form-item label="简称" :label-width="formLabelWidth" prop="shorthand">
        <el-input v-model="form.shorthand" autocomplete="off" />
      </el-form-item>
      <el-form-item label="店铺名" :label-width="formLabelWidth" prop="alias">
        <el-input v-model="form.alias" autocomplete="off" />
      </el-form-item>
      <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="尊称" :label-width="formLabelWidth" prop="Title">
        <el-input v-model="form.Title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="form.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="手机号" :label-width="formLabelWidth" prop="number">
        <el-input v-model="form.number" autocomplete="off" />
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
        <el-input v-model="form.address" autocomplete="off" />
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
