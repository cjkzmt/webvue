import {
  saveOrUpdate,
  getPages,
  deleteFont,enableFont, forbidFont,
  type QueryCondition,
  type QueryResult,
} from '@/api/fonts'
import { reactive, ref } from 'vue'
import { ElMessage} from 'element-plus'
import { type FormInstance } from 'element-plus'
export const forminstance = ref<FormInstance>()
const isCreate = ref(true)
const formInitialValues = {
  id: 0,
  name: '',
  url:''
}
export const form = reactive({...formInitialValues})
const distext = ref('字体')
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
export const queryFont = async (params?: QueryCondition) => {
  Object.assign(queryCondition.value, params)
  const { data } = await getPages(queryCondition.value)
  if (data.code === '000000') {
    queriedResult.value = data.data
    console.log('字体数据:', data.data) // 添加打印数据
  } else {
    ElMessage.error('获取字体列表失败' + data.mesg)
    throw new Error('获取字体列表失败' + data.mesg)
  }
}
export const onSubmit = async () => {
  const { data } = await saveOrUpdate(form).finally(() => (dialogFormVisible.value = false))
  if (data.code === '000000') {
    ElMessage.success(`${msgText.value}字体成功`)
    queryFont()
  } else {
    ElMessage.error(`${msgText.value}字体失败`)
    throw new Error(`${msgText.value}字体失败`)
  }
}
import { TopIteams, type TopItem } from '@/api/fonts'
export const topFonts = ref([] as TopItem[])
export const fetchTopFonts = async () => {
  try {
    const { data } = await TopIteams()
    topFonts.value = data.data
  } catch (error) {
    console.error('获取手机列表失败:', error)
  }
}

import {createHandler ,createDeleteHandler } from '@/utils/Common'
export const handleDelete = createDeleteHandler({
  deleteFn: deleteFont,
  refresh: queryFont,
  getDisplayName: () => distext.value
})
export const handleStatusChange = createHandler(
  enableFont,
  forbidFont,
  queryFont
)
