import { getAll, saveOrUpdate, deleteiteam,type Item } from '@/api/keywords'
import { ElMessage,type FormInstance  } from 'element-plus'
import { reactive, ref } from 'vue'
export const allKeyword = ref([] as Item[])
export const distext = '关键词'
export const isCreate = ref(true)
export const msgText = ref('')
export const dialogFormVisible = ref(false)
export const forminstance = ref<FormInstance>()
export const getAllKeyword = async () => {
  const { data } = await getAll()
  if (data.code === '000000') {
    allKeyword.value = data.data
  } else {
    ElMessage.error(`获取${distext}信息失败`)
    throw new Error(`获取${distext}信息失败`)
  }
}
export const form = reactive({
  text: '',
  sort: 0,
})
export const initAndShow = (id = 0) => {
  forminstance.value?.resetFields()
  dialogFormVisible.value = true
  if (id) {
    isCreate.value = false
    msgText.value = '更新'
    const TypeVideo = allKeyword.value.find((item) => item.id === id)
    Object.assign(form, TypeVideo)
  } else {
    isCreate.value = true
    msgText.value = '创建'
  }
}
export const onSubmit = async () => {
  const { data } = await saveOrUpdate(form).finally(() => (dialogFormVisible.value = false))
  if (data.code === '000000') {
    ElMessage.success(`${msgText.value}${distext}成功`)
    getAllKeyword()
  } else {
    ElMessage.error(`${msgText.value}${distext}失败`)
    throw new Error(`${msgText.value}${distext}失败`)
  }
}
import {createDeleteHandler } from '@/utils/Common'
export const DeleteKeyword = createDeleteHandler({
  deleteFn: deleteiteam,
  refresh: getAllKeyword,
  getDisplayName: () => distext
})


