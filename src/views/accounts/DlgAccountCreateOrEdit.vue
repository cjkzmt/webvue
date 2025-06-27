<script setup lang="ts">
import { ref } from 'vue'
import {
  isCreate,
  onSubmit,
  form,
  msgText,
  dialogFormVisible,
  queriedResult,
} from '@/composables/useAccount'
import { type FormInstance } from 'element-plus'
const formLabelWidth = '140px'
const initAndShow = (id = 0) => {
  fmResourceCategory.value?.resetFields()
  dialogFormVisible.value = true
  if (id) {
    isCreate.value = false
    msgText.value = '更新'
    const resourceCategory = queriedResult.value.records.find((item) => item.id === id)
    Object.assign(form, resourceCategory)
  } else {
    isCreate.value = true
    msgText.value = '创建'
  }
}
const fmResourceCategory = ref<FormInstance>()
defineExpose({
  initAndShow,
})
import { getTopPhones, type TopPhones } from '@/api/phones'
const topPhones = ref([] as TopPhones[])
const fetchTopPhones = async () => {
  try {
    const { data } = await getTopPhones()
    topPhones.value = data.data
  } catch (error) {
    console.error('获取手机列表失败:', error)
  }
}
fetchTopPhones()
import { getTopPNumbers, type TopPNumbers } from '@/api/pnumbers'
const topPNumbers = ref([] as TopPNumbers[])
const fetchTopPNumbers = async () => {
  try {
    const { data } = await getTopPNumbers()
    topPNumbers.value = data.data
  } catch (error) {
    console.error('获取手机列表失败:', error)
  }
}
fetchTopPNumbers()
import { allPlatform, getAllPlatform } from '@/composables/usePlatform'
getAllPlatform()

import { getTopCertifiers, type TopCertifiers } from '@/api/certifiers'
const topCertifiers = ref([] as TopCertifiers[])
const fetchTopCertifiers = async () => {
  try {
    const { data } = await getTopCertifiers()
    topCertifiers.value = data.data
  } catch (error) {
    console.error('获取手机列表失败:', error)
  }
}
fetchTopCertifiers()
</script>

<template>
  <el-dialog v-model="dialogFormVisible" :title="msgText + '账号'" width="500">
    <el-form :model="form" ref="fmResourceCategory">
      <el-form-item label="所在手机" :label-width="formLabelWidth">
        <el-select v-model="form.PhoneId" placeholder="请选择所在手机">
          <el-option label="未知" :value="-1" />
          <el-option
            v-for="Phone in topPhones"
            :key="Phone.id"
            :label="Phone.name"
            :value="Phone.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="所在平台" :label-width="formLabelWidth">
        <el-select v-model="form.PlatformId" placeholder="请选择所在平台">
          <el-option label="未知" :value="-1" />
          <el-option
            v-for="Platform in allPlatform"
            :key="Platform.id"
            :label="Platform.name"
            :value="Platform.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="组号" :label-width="formLabelWidth" prop="team">
        <el-input v-model="form.team" autocomplete="off" />
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

      <el-form-item label="绑定手机号" :label-width="formLabelWidth">
        <el-select v-model="form.PNumberId" placeholder="请选择绑定手机号">
          <el-option label="未知" :value="-1" />
          <el-option
            v-for="Phone in topPNumbers"
            :key="Phone.id"
            :label="Phone.number"
            :value="Phone.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="认证人" :label-width="formLabelWidth">
        <el-select v-model="form.PNumberId" placeholder="请选择认证人">
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
