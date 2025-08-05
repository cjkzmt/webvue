import { getAll, saveOrUpdate, deleteReleasePlan, type Item } from '@/api/releaseplan'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
export const distext = '发布计划'
//保存数据
export const allReleasePlan = ref([] as Item[])
//获取所有资源分类
export const getAllReleasePlan = async () => {
  const { data } = await getAll()
  if (data.code === '000000') {
    allReleasePlan.value = data.data
  } else {
    ElMessage.error('获取资源分类信息失败')
    throw new Error('获取资源分类信息失败')
  }
}
import { type FormInstance } from 'element-plus'
export const forminstance = ref<FormInstance>()
export const form = reactive({
  hour: 0,
  minute: 0,
})
export const initAndShow = (id = 0) => {
  forminstance.value?.resetFields()
  dialogFormVisible.value = true
  if (id) {
    isCreate.value = false
    msgText.value = '更新'
    const TypeVideo = allReleasePlan.value.find((item) => item.id === id)
    Object.assign(form, TypeVideo)
  } else {
    isCreate.value = true
    msgText.value = '创建'
  }
}
export const isCreate = ref(true)
export const msgText = ref('')
//提交按钮
export const onSubmit = async () => {
  const { data } = await saveOrUpdate(form).finally(() => (dialogFormVisible.value = false))
  if (data.code === '000000') {
    ElMessage.success(`${msgText.value}发布计划成功`)
    getAllReleasePlan()
  } else {
    ElMessage.error(`${msgText.value}发布计划失败`)
    throw new Error(`${msgText.value}发布计划失败`)
  }
}

export const dialogFormVisible = ref(false)

import {createDeleteHandler } from '@/utils/Common'
export const DeleteReleasePlan = createDeleteHandler({
  deleteFn: deleteReleasePlan,
  refresh: getAllReleasePlan,
  getDisplayName: () => distext
})
