<script setup lang="ts">
import {
  onSubmit,
  form,
  msgText,
  dialogFormVisible,
  forminstance,
  initAndShow
} from '@/composables/useApiToken'
import {allAiApi , getAllAiApi } from '@/composables/useAiApi'
import {topPNumbers , fetchTopPNumbers } from '@/composables/usePNumber'
const formLabelWidth = '140px'
getAllAiApi()
defineExpose({initAndShow})
fetchTopPNumbers()
</script>

<template>
  <el-dialog v-model="dialogFormVisible" :title="msgText + 'Token'" width="500">
    <el-form :model="form" ref="forminstance">
      <el-form-item label="所属AI" :label-width="formLabelWidth" prop="AiApi_id">
        <el-select v-model="form.AiApi_id" placeholder="请选择所属AI">
          <el-option label="未知" :value="-1" />
          <el-option
            v-for="AiApi in allAiApi"
            :key="AiApi.id"
            :label="AiApi.name"
            :value="AiApi.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="绑定手机号" :label-width="formLabelWidth" prop="PNumber_id">
        <el-select v-model="form.PNumber_id" placeholder="请选择绑定手机号">
          <el-option label="未知" :value="-1" />
          <el-option
            v-for="ApiTokenTeam in topPNumbers"
            :key="ApiTokenTeam.id"
            :label="ApiTokenTeam.number"
            :value="ApiTokenTeam.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Token值" :label-width="formLabelWidth" prop="token">
        <el-input v-model="form.token" autocomplete="off" />
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
