import {
  getApiTokenPages,
  deleteApiToken,
  saveOrUpdate,
  enableApiToken,
  forbidApiToken,
  type QueryCondition,
  type QueryResult,
} from '@/api/apitokens'
import {  reactive, ref } from 'vue'
import { ElMessage} from 'element-plus'

export const dialogFormVisible = ref(false)

//查询条件
export const queryCondition = ref({} as QueryCondition)

//结果
export const queriedResult = ref({} as QueryResult)
const distext = ref('Token')
export const msgText = ref('')
import { type FormInstance } from 'element-plus'
export const forminstance = ref<FormInstance>()
const isCreate = ref(true)
const formInitialValues = {
  id: 0,
  AiApiId: -1,
  PNumberId: -1,
  token: ''
}
export const form = reactive({...formInitialValues})

//动作
export const queryApiToken = async (params?: QueryCondition) => {
  Object.assign(queryCondition.value, params)
  const { data } = await getApiTokenPages(queryCondition.value)
  if (data.code === '000000') {
    queriedResult.value = data.data
    console.log('用户数据:', data.data) // 添加打印数据
  } else {
    ElMessage.error('获取用户列表失败' + data.mesg)
    throw new Error('获取用户列表失败' + data.mesg)
  }
}
export const onSubmit = async () => {
  const { data } = await saveOrUpdate(form).finally(() => (dialogFormVisible.value = false))
  if (data.code === '000000') {
    ElMessage.success(`${msgText.value}账号成功`)
    queryApiToken()
  } else {
    ElMessage.error(`${msgText.value}账号失败`)
    throw new Error(`${msgText.value}账号失败`)
  }
}



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


import {createHandler ,createDeleteHandler } from '@/utils/Common'
export const handleDelete = createDeleteHandler({
  deleteFn: deleteApiToken,
  refresh: queryApiToken,
  getDisplayName: () => distext.value
})
export const handleStatusChange = createHandler(
  enableApiToken,
  forbidApiToken,
  queryApiToken
)
