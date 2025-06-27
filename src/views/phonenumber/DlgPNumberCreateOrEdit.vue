<script setup lang="ts">
import { ref } from 'vue'
import {
  isCreate,
  onSubmit,
  form,
  msgText,
  dialogFormVisible,
  queriedResult,
} from '@/composables/usePNumber'
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
</script>

<template>
  <el-dialog v-model="dialogFormVisible" :title="msgText + '手机'" width="500">
    <el-form :model="form" ref="fmResourceCategory">
      <el-form-item label="手机号" :label-width="formLabelWidth" prop="number">
        <el-input v-model="form.number" autocomplete="off" />
      </el-form-item>
      <el-form-item label="所有人" :label-width="formLabelWidth" prop="Owner">
        <el-input v-model="form.Owner" autocomplete="off" />
      </el-form-item>
      <el-form-item label="月租" :label-width="formLabelWidth" prop="rent">
        <el-input v-model="form.rent" autocomplete="off" />
      </el-form-item>
      <el-form-item label="所在手机" :label-width="formLabelWidth">
        <el-select v-model="form.PhoneId" placeholder="请选择所在手机">
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
