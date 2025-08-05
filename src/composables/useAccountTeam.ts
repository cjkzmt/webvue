import {
  saveOrUpdate,
  getPages,
  deleteAccountTeam,
  enableAccountTeam,
  forbidAccountTeam,
  TopIteams,
  type QueryCondition,
  type QueryResult,
  type TopItem
} from '@/api/accountteams'
import {createHandler ,createDeleteHandler } from '@/utils/Common'
import { reactive, ref } from 'vue'
import { ElMessage} from 'element-plus'
import { type FormInstance } from 'element-plus'
export const forminstance = ref<FormInstance>()
const formInitialValues = {
  id: 0,
  number: 0,
  scope: '',
  Phone_id: 0,
  Computer_id: 0,
  TypeVideo_id: 1,
  TypeCover_id: 1,
  TypeSubtitle_id: 1,
  TeamOwner_id: 0,
}
export const form = reactive({...formInitialValues})

const distext = ref('账号组')


export const dialogFormVisible = ref(false)

//查询条件
export const queryCondition = ref({} as QueryCondition)

//结果
export const queriedResult = ref({} as QueryResult)


//动作
export const queryAccountTeam = async (params?: QueryCondition) => {
  Object.assign(queryCondition.value, params)
  const { data } = await getPages(queryCondition.value)
  if (data.code === '000000') {
    queriedResult.value = data.data
    console.log(`${distext.value}列表数据`, data.data) // 添加打印数据
  } else {
    ElMessage.error(`获取${distext.value}列表失败` + data.mesg)
    throw new Error(`获取${distext.value}列表失败` + data.mesg)
  }
}


export const handleDelete = createDeleteHandler({
  deleteFn: deleteAccountTeam,
  refresh: queryAccountTeam,
  getDisplayName: () => distext.value
})
export const handleStatusChange = createHandler(
  enableAccountTeam,
  forbidAccountTeam,
  queryAccountTeam
)

export const topAccountTeams = ref([] as TopItem[])
export const fetchTopAccountTeams = async () => {
  try {
    const { data } = await TopIteams()
    topAccountTeams.value = data.data
  } catch (error) {
    console.error(`获取${distext.value}列表失败`, error)
  }
}

export const initAndShow = (id = 0) => {
  if (id) {
    isCreate.value = false
    msgText.value = '更新'
    const variable = queriedResult.value.records.find((item) => item.id === id)
    // 使用深拷贝避免污染初始值
    Object.assign(form, {...variable})
  } else {
    isCreate.value = true
    msgText.value = '创建'
    // 显式重置表单数据
    Object.assign(form, formInitialValues)
  }

  // 强制表单重置验证状态
  forminstance.value?.clearValidate()

  dialogFormVisible.value = true
}

export const isCreate = ref(true)
export const msgText = ref('')
//提交按钮
export const onSubmit = async () => {
  const { data } = await saveOrUpdate(form).finally(() => (dialogFormVisible.value = false))
  if (data.code === '000000') {
    ElMessage.success(`${msgText.value}${distext.value}成功`)
    queryAccountTeam()
  } else {
    ElMessage.error(`${msgText.value}${distext.value}失败`)
    throw new Error(`${msgText.value}${distext.value}失败`)
  }
}
