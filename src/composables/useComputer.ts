import {
  saveOrUpdate,
  getPages,
  deleteComputer,enablecreatetext, forbidcreatetext,enablecreatevideo, forbidcreatevideo , enablepublishvideo, forbidpublishvideo,TopIteams,
  type QueryCondition,
  type QueryResult,
  type TopItem,
} from '@/api/computers'
import {createHandler ,createDeleteHandler } from '@/utils/Common'
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
const distext = ref('账号组')
export const msgText = ref('')
//提交按钮


export const dialogFormVisible = ref(false)

//查询条件
export const queryCondition = ref({} as QueryCondition)

//结果
export const queriedResult = ref({} as QueryResult)

//动作
export const queryComputer = async (params?: QueryCondition) => {
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
export const onSubmit = async () => {
  const { data } = await saveOrUpdate(form).finally(() => (dialogFormVisible.value = false))
  if (data.code === '000000') {
    ElMessage.success(`${msgText.value}电脑成功`)
    queryComputer()
  } else {
    ElMessage.error(`${msgText.value}电脑失败`)
    throw new Error(`${msgText.value}电脑失败`)
  }
}
import { enableComputer, forbidComputer } from '@/api/computers'
export const handleStatusChange = async (act: 'ENABLE' | 'DISABLE', user_id: number) => {
  const action = {
    ENABLE: { msg: '启用', fn: enableComputer },
    DISABLE: { msg: '禁用', fn: forbidComputer },
  }
  const { data } = await action[act].fn(user_id)
  if (data.code === '000000') {
    ElMessage.success(`${action[act].msg}成功`)
    queryComputer()
  } else {
    ElMessage.error(`${action[act].msg}失败`)
    throw new Error(`${action[act].msg}失败`)
  }
}
export const handlecreatetextChange = createHandler(
  enablecreatetext, forbidcreatetext ,
  queryComputer
)
export const handlecreatevideoChange = createHandler(
  enablecreatevideo,
  forbidcreatevideo,
  queryComputer
)
export const handlepublishvideoChange = createHandler(
  enablepublishvideo, forbidpublishvideo ,
  queryComputer
)
export const handleDelete = createDeleteHandler({
  deleteFn: deleteComputer,
  refresh: queryComputer,
  getDisplayName: () => distext.value
})

export const topComputer = ref([] as TopItem[])
export const fetchTopComputer = async () => {
  try {
    const { data } = await TopIteams()
    topComputer.value = data.data
  } catch (error) {
    console.error('获取手机列表失败:', error)
  }
}
