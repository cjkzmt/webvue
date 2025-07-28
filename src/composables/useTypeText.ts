import { getAll, saveOrUpdate, deleteTypeText, enabletopic,
  forbidtopic,
  enablecopy,
  forbidcopy,
  enableStatus,
  forbidStatus,type TypeTextItem } from '@/api/typetexts'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
//保存数据
export const allTypeText = ref([] as TypeTextItem[])
//获取所有资源分类
export const getAllTypeText = async () => {
  const { data } = await getAll()
  if (data.code === '000000') {
    allTypeText.value = data.data
  } else {
    ElMessage.error('获取资源分类信息失败')
    throw new Error('获取资源分类信息失败')
  }
}
import { type FormInstance } from 'element-plus'
export const forminstance = ref<FormInstance>()
export const form = reactive({
  name: '',
  description: '',
})
export const initAndShow = (id = 0) => {
  forminstance.value?.resetFields()
  dialogFormVisible.value = true
  if (id) {
    isCreate.value = false
    msgText.value = '更新'
    const TypeVideo = allTypeText.value.find((item) => item.id === id)
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
    ElMessage.success(`${msgText.value}文案类型成功`)
    getAllTypeText()
  } else {
    ElMessage.error(`${msgText.value}文案类型失败`)
    throw new Error(`${msgText.value}文案类型失败`)
  }
}

export const dialogFormVisible = ref(false)

export const TypeTexts = ref([] as TypeTextItem[])

export const fetchTypeTexts = async () => {
  try {
    const { data } = await getAll()
    TypeTexts.value = data.data
  } catch (error) {
    console.error('获取选题样本列表失败:', error)
  }
}
const distext = ref('账号组')
import {createHandler ,createDeleteHandler } from '@/utils/Common'
export const DeleteTypeText = createDeleteHandler({
  deleteFn: deleteTypeText,
  refresh: getAllTypeText,
  getDisplayName: () => distext.value
})
export const handleStatusChange = createHandler(
  enableStatus,
  forbidStatus,
  getAllTypeText
)

export const handletopicChange = createHandler(
  enabletopic,
  forbidtopic,
  getAllTypeText
)

export const handlecopyChange = createHandler(
  enablecopy,
  forbidcopy,
  getAllTypeText
)
