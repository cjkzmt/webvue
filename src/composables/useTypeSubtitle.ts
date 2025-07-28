import { getAllTypeSubtitle, saveOrUpdateTypeSubtitle, deleteTypeSubtitle, type TypeSubtitleItem } from '@/api/typevideos'
import { ElMessage} from 'element-plus'
import { reactive, ref } from 'vue'
//保存数据
export const allTypeSubtitle = ref([] as TypeSubtitleItem[])
//获取所有资源分类
export const GetAllTypeSubtitle = async () => {
  const { data } = await getAllTypeSubtitle()
  if (data.code === '000000') {
    allTypeSubtitle.value = data.data
  } else {
    ElMessage.error('获取资源分类信息失败')
    throw new Error('获取资源分类信息失败')
  }
}
import { type FormInstance } from 'element-plus'
export const forminstance = ref<FormInstance>()
export const form = reactive({
  name: '',
  fontsize: 35,
  fontcolor: ''
})
export const initAndShow = (id = 0) => {
  forminstance.value?.resetFields()
  dialogFormVisible.value = true
  if (id) {
    isCreate.value = false
    msgText.value = '更新'
    const TypeVideo = allTypeSubtitle.value.find((item) => item.id === id)
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
  const { data } = await saveOrUpdateTypeSubtitle(form).finally(() => (dialogFormVisible.value = false))
  if (data.code === '000000') {
    ElMessage.success(`${msgText.value}文案类型成功`)
    GetAllTypeSubtitle()
  } else {
    ElMessage.error(`${msgText.value}文案类型失败`)
    throw new Error(`${msgText.value}文案类型失败`)
  }
}

export const dialogFormVisible = ref(false)

const distext = ref('账号组')
import {createDeleteHandler } from '@/utils/Common'
export const DeleteTypeSubtitle = createDeleteHandler({
  deleteFn: deleteTypeSubtitle,
  refresh: GetAllTypeSubtitle,
  getDisplayName: () => distext.value
})
