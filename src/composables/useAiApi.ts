import { getAll, saveOrUpdate, deleteAiApi, type Item } from '@/api/aiapis'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
const distext = ref('AI')
//保存数据
export const allAiApi = ref([] as Item[])
//获取所有AI
export const getAllAiApi = async () => {
  const { data } = await getAll()
  if (data.code === '000000') {
    allAiApi.value = data.data
  } else {
    ElMessage.error('获取AI信息失败')
    throw new Error('获取AI信息失败')
  }
}
import { type FormInstance } from 'element-plus'
export const forminstance = ref<FormInstance>()
export const form = reactive({
  name: '',
  description: '',
  url: '',
  port: -1,
  model: '',
  note: ''})
export const initAndShow = (id = 0) => {
  forminstance.value?.resetFields()
  dialogFormVisible.value = true
  if (id) {
    isCreate.value = false
    msgText.value = '更新'
    const TypeVideo = allAiApi.value.find((item) => item.id === id)
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
    ElMessage.success(`${msgText.value}AI成功`)
    getAllAiApi()
  } else {
    ElMessage.error(`${msgText.value}AI失败`)
    throw new Error(`${msgText.value}AI失败`)
  }
}

export const dialogFormVisible = ref(false)

import {createDeleteHandler } from '@/utils/Common'
export const DeleteAiApi = createDeleteHandler({
  deleteFn: deleteAiApi,
  refresh: getAllAiApi,
  getDisplayName: () => distext.value
})
