import { getAll, saveOrUpdate, deleteReleasePlan, type ReleasePlanItem } from '@/api/releaseplan'
import { ElMessage, ElMessageBox } from 'element-plus'
import { reactive, ref } from 'vue'
//保存数据
export const allReleasePlan = ref([] as ReleasePlanItem[])
//获取所有资源分类
export const getAllReleasePlan = async () => {
  const { data } = await getAll()
  if (data.code === '000000') {
    allReleasePlan.value = data.data
  } else {
    ElMessage.error('获取资源分类信息失败')
    throw new Error('获取资源分类信息失败')
  }
}

export const form = reactive({
  hour: 0,
  minute: 0,
})

export const isCreate = ref(true)
export const msgText = ref('')
//提交按钮
export const onSubmit = async () => {
  const { data } = await saveOrUpdate(form).finally(() => (dialogFormVisible.value = false))
  if (data.code === '000000') {
    ElMessage.success(`${msgText.value}发布计划成功`)
    getAllReleasePlan()
  } else {
    ElMessage.error(`${msgText.value}发布计划失败`)
    throw new Error(`${msgText.value}发布计划失败`)
  }
}

export const dialogFormVisible = ref(false)
export const DeleteReleasePlan = async (id: number) => {
  await ElMessageBox.confirm('此操作将永久删除该发布计划, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).catch(() => {
    ElMessage.info('已取消删除')
    return new Promise(() => {})
  })
  const { data } = await deleteReleasePlan(id)
  if (data.code === '000000') {
    ElMessage.success('删除发布计划成功')
    getAllReleasePlan()
  } else {
    ElMessage.error('删除发布计划失败')
    throw new Error('删除发布计划失败')
  }
}
