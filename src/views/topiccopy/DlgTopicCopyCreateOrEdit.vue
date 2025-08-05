
<script setup lang="ts">
import {
  forminstance,
  onSubmit,
  form,
  msgText,
  dialogFormVisible,
  initAndShow,
} from '@/composables/useTopicCopy'
const formLabelWidth = '140px'
defineExpose({initAndShow})
import { getAllTypeText, allTypeText } from '@/composables/useTypeText'
getAllTypeText()
</script>
<template>
  <el-dialog v-model="dialogFormVisible" :title="msgText + '选题样本'" width="1000">
    <el-form :model="form" ref="forminstance">
      <el-form-item label="链接" :label-width="formLabelWidth" prop="url">
        <el-input v-model="form.url" autocomplete="off" type="textarea" :rows="3" />
      </el-form-item>
      <el-form-item label="选题样本" :label-width="formLabelWidth" prop="text">
        <el-input v-model="form.text" autocomplete="off" type="textarea" :rows="10" />
      </el-form-item>
      <el-form-item label="文案类型" :label-width="formLabelWidth">
        <el-select v-model="form.TypeText_id" placeholder="请选择文案类型">
          <el-option label="无文案类型" :value="-1" />
          <el-option
            v-for="typetext in allTypeText"
            :key="typetext.id"
            :label="typetext.name"
            :value="typetext.id"
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
