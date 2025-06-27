import {
  getAll,
  saveOrUpdate,
  deleteCategory,
  type ResourceCategory,
} from '@/api/resource-category'
import { ElMessage, ElMessageBox } from 'element-plus'
import { reactive, ref } from 'vue'
//保存数据
export const allResourceCategory = ref([] as ResourceCategory[])
//获取所有资源分类
export const getAllResourceCategory = async () => {
  const { data } = await getAll()
  if (data.code === '000000') {
    allResourceCategory.value = data.data
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
    ElMessage.success(`${msgText.value}资源类别成功`)
    getAllResourceCategory()
  } else {
    ElMessage.error(`${msgText.value}资源类别失败`)
    throw new Error(`${msgText.value}资源类别失败`)
  }
}

export const dialogFormVisible = ref(false)
export const handleDelete = async (id: number) => {
  await ElMessageBox.confirm('此操作将永久删除该资源类别, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).catch(() => {
    ElMessage.info('已取消删除')
    return new Promise(() => {})
  })
  const { data } = await deleteCategory(id)
  if (data.code === '000000') {
    ElMessage.success('删除资源类别成功')
    getAllResourceCategory()
  } else {
    ElMessage.error('删除资源类别失败')
    throw new Error('删除资源类别失败')
  }
}
