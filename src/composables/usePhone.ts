import {
  saveOrUpdate,
  getPages,
  deletePhone,
  TopIteams,enablePhone, forbidPhone,
  type QueryCondition,
  type QueryResult,
  type TopItem
} from '@/api/phones'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { type FormInstance } from 'element-plus'
export const forminstance = ref<FormInstance>()
const isCreate = ref(true)
const formInitialValues = {
  id: 0,
  name: '',
  Model: '',
  Brand: '',
  Owner: '',
  sort: 0,
  deviceid: '',
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
    ElMessage.success(`${msgText.value}手机成功`)
    queryPhone()
  } else {
    ElMessage.error(`${msgText.value}手机失败`)
    throw new Error(`${msgText.value}手机失败`)
  }
}

export const dialogFormVisible = ref(false)

//查询条件
export const queryCondition = ref({} as QueryCondition)

//结果
export const queriedResult = ref({} as QueryResult)

//动作
export const queryPhone = async (params?: QueryCondition) => {
  Object.assign(queryCondition.value, params)
  const { data } = await getPages(queryCondition.value)
  if (data.code === '000000') {
    queriedResult.value = data.data
    console.log('用户数据:', data.data) // 添加打印数据
  } else {
    ElMessage.error('获取用户列表失败' + data.mesg)
    throw new Error('获取用户列表失败' + data.mesg)
  }
}

export const topPhones = ref([] as TopItem[])

export const fetchTopPhones = async () => {
  try {
    const { data } = await TopIteams()
    topPhones.value = data.data
  } catch (error) {
    console.error('获取账号组列表失败:', error)
  }
}
const distext = ref('账号组')
import {createHandler ,createDeleteHandler } from '@/utils/Common'
export const handleDelete = createDeleteHandler({
  deleteFn: deletePhone,
  refresh: queryPhone,
  getDisplayName: () => distext.value
})
export const handleStatusChange = createHandler(
  enablePhone,
  forbidPhone,
  queryPhone
)
