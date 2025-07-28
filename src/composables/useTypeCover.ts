import { getAllTypeCover, saveOrUpdateTypeCover, deleteTypeCover, type TypeCoverItem } from '@/api/typevideos'
import { ElMessage} from 'element-plus'
import { reactive, ref } from 'vue'
//保存数据
export const allTypeCover = ref([] as TypeCoverItem[])
//获取所有资源分类
export const GetAllTypeCover = async () => {
  const { data } = await getAllTypeCover()
  if (data.code === '000000') {
    allTypeCover.value = data.data
  } else {
    ElMessage.error('获取资源分类信息失败')
    throw new Error('获取资源分类信息失败')
  }
}
import { type FormInstance } from 'element-plus'
export const forminstance = ref<FormInstance>()
export const form = reactive({
  name: '',
  fixedtitle: ''
})
export const initAndShow = (id = 0) => {
  forminstance.value?.resetFields()
  dialogFormVisible.value = true
  if (id) {
    isCreate.value = false
    msgText.value = '更新'
    const TypeVideo = allTypeCover.value.find((item) => item.id === id)
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
  const { data } = await saveOrUpdateTypeCover(form).finally(() => (dialogFormVisible.value = false))
  if (data.code === '000000') {
    ElMessage.success(`${msgText.value}文案类型成功`)
    GetAllTypeCover()
  } else {
    ElMessage.error(`${msgText.value}文案类型失败`)
    throw new Error(`${msgText.value}文案类型失败`)
  }
}

export const dialogFormVisible = ref(false)

const distext = ref('账号组')
import {createDeleteHandler } from '@/utils/Common'
export const DeleteTypeCover = createDeleteHandler({
  deleteFn: deleteTypeCover,
  refresh: GetAllTypeCover,
  getDisplayName: () => distext.value
})
