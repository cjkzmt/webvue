import {
  saveOrUpdate,
  getMusicPages,
  deleteMusic,
  getTopMusics,enableMusic, forbidMusic,
  type QueryCondition,
  type QueryResult,
  type TopMusics
} from '@/api/musics'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { type FormInstance } from 'element-plus'
export const forminstance = ref<FormInstance>()
const isCreate = ref(true)
const formInitialValues = {
  id: 0,
  name: '',
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
    ElMessage.success(`${msgText.value}音乐成功`)
    queryMusic()
  } else {
    ElMessage.error(`${msgText.value}音乐失败`)
    throw new Error(`${msgText.value}音乐失败`)
  }
}

export const dialogFormVisible = ref(false)

//查询条件
export const queryCondition = ref({} as QueryCondition)

//结果
export const queriedResult = ref({} as QueryResult)

//动作
export const queryMusic = async (params?: QueryCondition) => {
  Object.assign(queryCondition.value, params)
  const { data } = await getMusicPages(queryCondition.value)
  if (data.code === '000000') {
    queriedResult.value = data.data
    console.log('音乐数据:', data.data) // 添加打印数据
  } else {
    ElMessage.error('获取音乐列表失败' + data.mesg)
    throw new Error('获取音乐列表失败' + data.mesg)
  }
}


export const topMusics = ref([] as TopMusics[])
export const fetchTopMusics = async () => {
  try {
    const { data } = await getTopMusics()
    topMusics.value = data.data
  } catch (error) {
    console.error('获取手机列表失败:', error)
  }
}
const distext = ref('账号组')
import {createHandler ,createDeleteHandler } from '@/utils/Common'
export const handleDelete = createDeleteHandler({
  deleteFn: deleteMusic,
  refresh: queryMusic,
  getDisplayName: () => distext.value
})
export const handleStatusChange = createHandler(
  enableMusic,
  forbidMusic,
  queryMusic
)
