import {
  saveOrUpdate,
  getPromptTextPages,
  deletePromptText,enablePromptText, forbidPromptText,
  type QueryCondition,
  type QueryResult,
} from '@/api/prompttexts'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { type FormInstance } from 'element-plus'
export const forminstance = ref<FormInstance>()
const isCreate = ref(true)
const formInitialValues = {
  id: 0,
  text: '',
}
export const form = reactive({...formInitialValues})
const distext = ref('账号组')
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


export const dialogFormVisible = ref(false)

//查询条件
export const queryCondition = ref({} as QueryCondition)

//结果
export const queriedResult = ref({} as QueryResult)

//动作
export const queryPromptText = async (params?: QueryCondition) => {
  Object.assign(queryCondition.value, params)
  const { data } = await getPromptTextPages(queryCondition.value)
  if (data.code === '000000') {
    queriedResult.value = data.data
    console.log('提示词数据:', data.data) // 添加打印数据
  } else {
    ElMessage.error('获取提示词列表失败' + data.mesg)
    throw new Error('获取提示词列表失败' + data.mesg)
  }
}
export const onSubmit = async () => {
  const { data } = await saveOrUpdate(form).finally(() => (dialogFormVisible.value = false))
  if (data.code === '000000') {
    ElMessage.success(`${msgText.value}提示词成功`)
    queryPromptText()
  } else {
    ElMessage.error(`${msgText.value}提示词失败`)
    throw new Error(`${msgText.value}提示词失败`)
  }
}


import {createHandler ,createDeleteHandler } from '@/utils/Common'
export const handleDelete = createDeleteHandler({
  deleteFn: deletePromptText,
  refresh: queryPromptText,
  getDisplayName: () => distext.value
})
export const handleStatusChange = createHandler(
  enablePromptText,
  forbidPromptText,
  queryPromptText
)
