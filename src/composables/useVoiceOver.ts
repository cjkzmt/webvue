import {
  saveOrUpdate,
  getVoiceOverPages,
  deleteVoiceOver,
  getTopVoiceOvers,
  enableVoiceOver, forbidVoiceOver,
  type QueryCondition,
  type QueryResult,
  type TopVoiceOvers
} from '@/api/voiceovers'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { type FormInstance } from 'element-plus'
export const forminstance = ref<FormInstance>()
const isCreate = ref(true)
const formInitialValues = {
  id: 0,
  name: '',
  filename: '',
  url:''
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
    ElMessage.success(`${msgText.value}配音成功`)
    queryVoiceOver()
  } else {
    ElMessage.error(`${msgText.value}配音失败`)
    throw new Error(`${msgText.value}配音失败`)
  }
}

export const dialogFormVisible = ref(false)

//查询条件
export const queryCondition = ref({} as QueryCondition)

//结果
export const queriedResult = ref({} as QueryResult)

//动作
export const queryVoiceOver = async (params?: QueryCondition) => {
  Object.assign(queryCondition.value, params)
  const { data } = await getVoiceOverPages(queryCondition.value)
  if (data.code === '000000') {
    queriedResult.value = data.data
    console.log('配音数据:', data.data) // 添加打印数据
  } else {
    ElMessage.error('获取配音列表失败' + data.mesg)
    throw new Error('获取配音列表失败' + data.mesg)
  }
}

export const topVoiceOvers = ref([] as TopVoiceOvers[])
export const fetchTopVoiceOvers = async () => {
  try {
    const { data } = await getTopVoiceOvers()
    topVoiceOvers.value = data.data
  } catch (error) {
    console.error('获取手机列表失败:', error)
  }
}
const distext = ref('账号组')
import {createHandler ,createDeleteHandler } from '@/utils/Common'
export const handleDelete = createDeleteHandler({
  deleteFn: deleteVoiceOver,
  refresh: queryVoiceOver,
  getDisplayName: () => distext.value
})
export const handleStatusChange = createHandler(
  enableVoiceOver,
  forbidVoiceOver,
  queryVoiceOver
)
