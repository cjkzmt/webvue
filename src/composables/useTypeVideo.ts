import { getAllTypeVideo, saveOrUpdateTypeVideo, deleteTypeVideo, type TypeVideoItem } from '@/api/typevideos'
import { ElMessage} from 'element-plus'
import { reactive, ref } from 'vue'
//保存数据
export const allTypeVideo = ref([] as TypeVideoItem[])
//获取所有资源分类
export const GetAllTypeVideo = async () => {
  const { data } = await getAllTypeVideo()
  if (data.code === '000000') {
    allTypeVideo.value = data.data
  } else {
    ElMessage.error('获取资源分类信息失败')
    throw new Error('获取资源分类信息失败')
  }
}
const distext = ref('账号组')
import { type FormInstance } from 'element-plus'
export const forminstance = ref<FormInstance>()
export const form = reactive({
  name: '',
  videoheight: 1280,
  videowidth: 720
})

export const initAndShow = (id = 0) => {
  forminstance.value?.resetFields()
  dialogFormVisible.value = true
  if (id) {
    isCreate.value = false
    msgText.value = '更新'
    const TypeVideo = allTypeVideo.value.find((item) => item.id === id)
    Object.assign(form, TypeVideo)
  } else {
    isCreate.value = true
    msgText.value = '创建'
  }
}

const isCreate = ref(true)
export const msgText = ref('')
//提交按钮
export const onSubmit = async () => {
  const { data } = await saveOrUpdateTypeVideo(form).finally(() => (dialogFormVisible.value = false))
  if (data.code === '000000') {
    ElMessage.success(`${msgText.value}文案类型成功`)
    GetAllTypeVideo()
  } else {
    ElMessage.error(`${msgText.value}文案类型失败`)
    throw new Error(`${msgText.value}文案类型失败`)
  }
}

export const dialogFormVisible = ref(false)

import {createDeleteHandler } from '@/utils/Common'
export const DeleteTypeVideo = createDeleteHandler({
  deleteFn: deleteTypeVideo,
  refresh: GetAllTypeVideo,
  getDisplayName: () => distext.value
})
