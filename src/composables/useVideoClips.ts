import {
  saveOrUpdate,
  getVideoClipsPages,
  deleteVideoClips,
  type QueryCondition,
  type QueryResult,
} from '@/api/videoclips'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { type FormInstance } from 'element-plus'
export const forminstance = ref<FormInstance>()
const isCreate = ref(true)
const formInitialValues = {
  id: 0,
  name: ''
}
export const form = reactive({...formInitialValues})

export const initAndShow = (id = 0) => {
  if (id) {
    isCreate.value = false
    msgText.value = '更新'
    const variable = queriedResult.value.records.find((item) => item.id === id)
    Object.assign(form, {...variable})
  } else {
    isCreate.value = true
    msgText.value = '创建'
    Object.assign(form, formInitialValues)
  }
  forminstance.value?.clearValidate()
  dialogFormVisible.value = true
}
export const msgText = ref('')
//提交按钮
export const onSubmit = async () => {
  const { data } = await saveOrUpdate(form).finally(() => (dialogFormVisible.value = false))
  if (data.code === '000000') {
    ElMessage.success(`${msgText.value}片段成功`)
    queryVideoClips()
  } else {
    ElMessage.error(`${msgText.value}片段失败`)
    throw new Error(`${msgText.value}片段失败`)
  }
}

export const dialogFormVisible = ref(false)

//查询条件
export const queryCondition = ref({} as QueryCondition)

//结果
export const queriedResult = ref({} as QueryResult)

//动作
export const queryVideoClips = async (params?: QueryCondition) => {
  Object.assign(queryCondition.value, params)
  const { data } = await getVideoClipsPages(queryCondition.value)
  if (data.code === '000000') {
    queriedResult.value = data.data
    console.log('片段数据:', data.data) // 添加打印数据
  } else {
    ElMessage.error('获取片段列表失败' + data.mesg)
    throw new Error('获取片段列表失败' + data.mesg)
  }
}
const distext = ref('账号组')
import {createDeleteHandler } from '@/utils/Common'
export const handleDelete = createDeleteHandler({
  deleteFn: deleteVideoClips,
  refresh: queryVideoClips,
  getDisplayName: () => distext.value
})
