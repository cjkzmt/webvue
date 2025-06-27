import {
  saveOrUpdate,
  getAuthorPages,
  deleteAuthor,
  type QueryCondition,
  type QueryResult,
} from '@/api/authors'
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
export const form = reactive({
  url: '',
})
export const isCreate = ref(true)
export const msgText = ref('')
//提交按钮
export const onSubmit = async () => {
  const { data } = await saveOrUpdate(form).finally(() => (dialogFormVisible.value = false))
  if (data.code === '000000') {
    ElMessage.success(`${msgText.value}作者链接成功`)
    queryAuthor()
  } else {
    ElMessage.error(`${msgText.value}作者链接失败`)
    throw new Error(`${msgText.value}作者链接失败`)
  }
}

export const dialogFormVisible = ref(false)

//查询条件
export const queryCondition = ref({} as QueryCondition)

//结果
export const queriedResult = ref({} as QueryResult)

//动作
export const queryAuthor = async (params?: QueryCondition) => {
  Object.assign(queryCondition.value, params)
  const { data } = await getAuthorPages(queryCondition.value)
  if (data.code === '000000') {
    queriedResult.value = data.data
    console.log('用户数据:', data.data) // 添加打印数据
  } else {
    ElMessage.error('获取用户列表失败' + data.mesg)
    throw new Error('获取用户列表失败' + data.mesg)
  }
}

export const handleDelete = async (id: number) => {
  await ElMessageBox.confirm('此操作将永久删除该作者链接, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).catch(() => {
    ElMessage.info('已取消删除')
    return new Promise(() => {})
  })
  const { data } = await deleteAuthor(id)
  if (data.code === '000000') {
    ElMessage.success('删除作者链接成功')
    queryAuthor()
  } else {
    ElMessage.error('删除作者链接失败')
    throw new Error('删除作者链接失败')
  }
}
