import {
  saveOrUpdate,
  getPages,
  deleteTopicCopy,enableTopicCopy, forbidTopicCopy,
  type QueryCondition,
  type QueryResult,
} from '@/api/topiccopys'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

import { type FormInstance } from 'element-plus'
export const forminstance = ref<FormInstance>()
const isCreate = ref(true)
const formInitialValues = {
  id: 0,
  text: '',
  url: '',
  TypeText_id: -1,
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
    ElMessage.success(`${msgText.value}选题模板成功`)
    queryTopicCopy()
  } else {
    ElMessage.error(`${msgText.value}选题模板失败`)
    throw new Error(`${msgText.value}选题模板失败`)
  }
}

export const dialogFormVisible = ref(false)

//查询条件
export const queryCondition = ref({} as QueryCondition)

//结果
export const queriedResult = ref({} as QueryResult)

//动作
export const queryTopicCopy = async (params?: QueryCondition) => {
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


const distext = ref('账号组')
import {createHandler ,createDeleteHandler } from '@/utils/Common'
export const handleDelete = createDeleteHandler({
  deleteFn: deleteTopicCopy,
  refresh: queryTopicCopy,
  getDisplayName: () => distext.value
})
export const handleStatusChange = createHandler(
  enableTopicCopy,
  forbidTopicCopy,
  queryTopicCopy
)
