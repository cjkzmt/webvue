import { getAll, saveOrUpdate, deletePlatform, type PlatformItem } from '@/api/platform'
import { ElMessage, ElMessageBox } from 'element-plus'
import { reactive, ref } from 'vue'
//保存数据
export const allPlatform = ref([] as PlatformItem[])
//获取所有资源分类
export const getAllPlatform = async () => {
  const { data } = await getAll()
  if (data.code === '000000') {
    allPlatform.value = data.data
  } else {
    ElMessage.error('获取资源分类信息失败')
    throw new Error('获取资源分类信息失败')
  }
}

export const form = reactive({
  name: '',
  sort: 0,
})

export const isCreate = ref(true)
export const msgText = ref('')
//提交按钮
export const onSubmit = async () => {
  const { data } = await saveOrUpdate(form).finally(() => (dialogFormVisible.value = false))
  if (data.code === '000000') {
    ElMessage.success(`${msgText.value}平台成功`)
    getAllPlatform()
  } else {
    ElMessage.error(`${msgText.value}平台失败`)
    throw new Error(`${msgText.value}平台失败`)
  }
}

export const dialogFormVisible = ref(false)
export const DeletePlatform = async (id: number) => {
  await ElMessageBox.confirm('此操作将永久删除该平台, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).catch(() => {
    ElMessage.info('已取消删除')
    return new Promise(() => {})
  })
  const { data } = await deletePlatform(id)
  if (data.code === '000000') {
    ElMessage.success('删除平台成功')
    getAllPlatform()
  } else {
    ElMessage.error('删除平台失败')
    throw new Error('删除平台失败')
  }
}
