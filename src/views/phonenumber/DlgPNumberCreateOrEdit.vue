<script setup lang="ts">
import {
  forminstance,
  onSubmit,
  form,
  msgText,
  dialogFormVisible,
  initAndShow,
} from '@/composables/usePNumber'
import { fetchTopPhones, topPhones } from '@/composables/usePhone'
const formLabelWidth = '140px'
defineExpose({initAndShow})
fetchTopPhones()
</script>

<template>
  <el-dialog v-model="dialogFormVisible" :title="msgText + '手机'" width="500">
    <el-form :model="form" ref="forminstance">
      <el-form-item label="手机号" :label-width="formLabelWidth" prop="number">
        <el-input v-model="form.number" autocomplete="off" />
      </el-form-item>
      <el-form-item label="编号" :label-width="formLabelWidth" prop="code">
        <el-input v-model="form.code" autocomplete="off" />
      </el-form-item>
      <el-form-item label="所有人" :label-width="formLabelWidth" prop="Owner">
        <el-input v-model="form.Owner" autocomplete="off" />
      </el-form-item>
      <el-form-item label="月租" :label-width="formLabelWidth" prop="rent">
        <el-input v-model="form.rent" autocomplete="off" />
      </el-form-item>
      <el-form-item label="所在手机" :label-width="formLabelWidth">
        <el-select v-model="form.Phone_id" placeholder="请选择所在手机">
          <el-option label="未在手机" :value="-1" />
          <el-option
            v-for="Phone in topPhones"
            :key="Phone.id"
            :label="Phone.name"
            :value="Phone.id"
          />
        </el-select>
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
