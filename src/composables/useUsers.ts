import { getPages, enableUser, forbidUser,type QueryCondition, type QueryResult } from '@/api/users'
import {createHandler  } from '@/utils/Common'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
//查询条件
export const queryCondition = ref({} as QueryCondition)

//结果
export const queriedResult = ref({} as QueryResult)
const distext = '用户'
//动作
export const queryUsers = async (params?: QueryCondition) => {
  Object.assign(queryCondition.value, params)
  const { data } = await getPages(queryCondition.value)
  if (data.code === '000000') {
    queriedResult.value = data.data
    console.log(`${distext}列表数据:`, data.data) // 添加打印数据
  } else {
    ElMessage.error(`获取${distext}列表失败` + data.mesg)
    throw new Error(`获取${distext}列表失败`+ data.mesg)
  }
}
export const handleStatusChange = createHandler(
  enableUser,
  forbidUser,
  queryUsers
)
