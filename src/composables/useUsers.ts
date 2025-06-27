import { getUserPages, type QueryCondition, type QueryResult } from '@/api/users'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

//查询条件
export const queryCondition = ref({} as QueryCondition)

//结果
export const queriedResult = ref({} as QueryResult)

//动作
export const queryUsers = async (params?: QueryCondition) => {
  Object.assign(queryCondition.value, params)
  const { data } = await getUserPages(queryCondition.value)
  if (data.code === '000000') {
    queriedResult.value = data.data
    console.log('用户数据:', data.data) // 添加打印数据
  } else {
    ElMessage.error('获取用户列表失败' + data.mesg)
    throw new Error('获取用户列表失败' + data.mesg)
  }
}
