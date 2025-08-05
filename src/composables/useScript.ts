import {
  saveOrUpdate,
  getPages,
  deleteScript,
  addTask,
  refreshTask,
  enablesSriptStatus,
  enablescopystatus,
  enablesCopys,
  type QueryCondition,
  type QueryResult,
} from '@/api/scripts'
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { type FormInstance } from 'element-plus'
export const forminstance = ref<FormInstance>()
const isCreate = ref(true)
const formInitialValues = {
  id: 0,
  VideoTemplate_id: -1,
  topic_id: -1,
  copy_id: -1,
  PromptText_id: -1,
  title: '',
  Script_id: -1,
  cover: '',
  line: '',
  subtitle: '',
  reading: '',
  Font_id: -1,
  publishtime: '',
  videoname: '',
  Music_id: -1,
  VoiceOver_id:-1,
  AccountTeam_id:-1,
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
    ElMessage.success(`${msgText.value}脚本视频任务成功`)
    queryScript()
  } else {
    ElMessage.error(`${msgText.value}脚本视频任务失败`)
    throw new Error(`${msgText.value}脚本视频任务失败`)
  }
}

export const dialogFormVisible = ref(false)

//查询条件
export const queryCondition = ref({} as QueryCondition)

//结果
export const queriedResult = ref({} as QueryResult)

//动作
export const queryScript = async (params?: QueryCondition) => {
  Object.assign(queryCondition.value, params)
  const { data } = await getPages(queryCondition.value)
  if (data.code === '000000') {
    queriedResult.value = data.data
    console.log('脚本视频任务数据:', data.data) // 添加打印数据
  } else {
    ElMessage.error('获取脚本视频任务列表失败' + data.mesg)
    throw new Error('获取脚本视频任务列表失败' + data.mesg)
  }
}



export const EnablesSriptStatus = async (id: number) => {
  const { data } = await enablesSriptStatus(id)
  if (data.code === '000000') {
    ElMessage.success('任务审核成功')
    queryScript()
  } else {
    ElMessage.error('脚本审核失败')
    throw new Error('脚本审核失败')
  }
}

export const Enablescopystatus = async (id: number) => {
  const { data } = await enablescopystatus(id)
  if (data.code === '000000') {
    ElMessage.success('添加任务成功')
    queryScript()
  } else {
    ElMessage.error('添加任务失败')
    throw new Error('添加任务失败')
  }
}



export const EnablesCopys = async (ids: number[]) => {
  const { data } = await enablesCopys(ids)
  if (data.code === '000000') {
    ElMessage.success('添加批量通过成功')
    queryScript()
  } else {
    ElMessage.error('批量通过失败')
    throw new Error('批量通过失败')
  }
}

export const AddTask = async () => {
  const { data } = await addTask()
  if (data.code === '000000') {
    ElMessage.success('添加任务成功')
    queryScript()
  } else {
    ElMessage.error('添加任务失败')
    throw new Error('添加任务失败')
  }
}

export const RefreshTask = async () => {
  const { data } = await refreshTask()
  if (data.code === '000000') {
    ElMessage.success('刷新任务成功')
    queryScript()
  } else {
    ElMessage.error('刷新任务失败')
    throw new Error('刷新任务失败')
  }
}

import { deleteTopicCopy } from '@/api/topiccopys'
export const handleDeleteCopy = async (id: number) => {
  await ElMessageBox.confirm('此操作将永久删除该选题模板, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).catch(() => {
    ElMessage.info('已取消删除')
    return new Promise(() => {})
  })
  const { data } = await deleteTopicCopy(id)
  if (data.code === '000000') {
    ElMessage.success('删除选题模板成功')
    queryScript()
  } else {
    ElMessage.error('删除选题模板失败')
    throw new Error('删除选题模板失败')
  }
}
const distext = ref('账号组')
import {createDeleteHandler } from '@/utils/Common'
export const handleDelete = createDeleteHandler({
  deleteFn: deleteScript,
  refresh: queryScript,
  getDisplayName: () => distext.value
})
