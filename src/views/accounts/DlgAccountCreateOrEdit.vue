<script setup lang="ts">
import {
  forminstance,
  initAndShow,
  onSubmit,
  form,
  msgText,
  dialogFormVisible,
} from '@/composables/useAccount'

import {topCertifiers , fetchTopCertifiers } from '@/composables/useCertifier'
import { topAccountTeams, fetchTopAccountTeams } from '@/composables/useAccountTeam'
import { allPlatform, getAllPlatform } from '@/composables/usePlatform'
import {topPNumbers , fetchTopPNumbers } from '@/composables/usePNumber'
const formLabelWidth = '140px'
defineExpose({initAndShow})
fetchTopAccountTeams()
fetchTopPNumbers()
getAllPlatform()
fetchTopCertifiers()
</script>

<template>
  <el-dialog v-model="dialogFormVisible" :title="msgText + '账号'" width="500">
    <el-form :model="form" ref="forminstance">
      <el-form-item label="所在组" :label-width="formLabelWidth" prop="AccountTeam_id">
        <el-select v-model="form.AccountTeam_id" placeholder="请选择所在组">
          <el-option label="未知" :value="-1" />
          <el-option
            v-for="AccountTeam in topAccountTeams"
            :key="AccountTeam.id"
            :label="AccountTeam.number"
            :value="AccountTeam.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="所在平台" :label-width="formLabelWidth" prop="Platform_id">
        <el-select v-model="form.Platform_id" placeholder="请选择所在平台">
          <el-option label="未知" :value="-1" />
          <el-option
            v-for="Platform in allPlatform"
            :key="Platform.id"
            :label="Platform.name"
            :value="Platform.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="账号名" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="ID号" :label-width="formLabelWidth" prop="number">
        <el-input v-model="form.number" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input v-model="form.password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="简介" :label-width="formLabelWidth" prop="profile">
        <el-input v-model="form.profile" autocomplete="off" />
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth" prop="note">
        <el-input v-model="form.note" autocomplete="off" />
      </el-form-item>

      <el-form-item label="绑定手机号" :label-width="formLabelWidth" prop="PNumber_id">
        <el-select v-model="form.PNumber_id" placeholder="请选择绑定手机号">
          <el-option label="未知" :value="-1" />
          <el-option
            v-for="AccountTeam in topPNumbers"
            :key="AccountTeam.id"
            :label="AccountTeam.number"
            :value="AccountTeam.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="认证人" :label-width="formLabelWidth" prop="PNumber_id">
        <el-select v-model="form.PNumber_id" placeholder="请选择认证人">
          <el-option label="未知" :value="-1" />
          <el-option
            v-for="Certifier in topCertifiers"
            :key="Certifier.id"
            :label="Certifier.name"
            :value="Certifier.id"
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
