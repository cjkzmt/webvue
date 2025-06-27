import { getAll, saveOrUpdate, deleteTypeText, type TypeTextItem } from '@/api/typetext'
import { ElMessage, ElMessageBox } from 'element-plus'
import { reactive, ref } from 'vue'
//保存数据
export const allTypeText = ref([] as TypeTextItem[])
//获取所有资源分类
export const getAllTypeText = async () => {
  const { data } = await getAll()
  if (data.code === '000000') {
    allTypeText.value = data.data
  } else {
    ElMessage.error('获取资源分类信息失败')
    throw new Error('获取资源分类信息失败')
  }
}

export const form = reactive({
  name: '',
  description: '',
})

export const isCreate = ref(true)
export const msgText = ref('')
//提交按钮
export const onSubmit = async () => {
  const { data } = await saveOrUpdate(form).finally(() => (dialogFormVisible.value = false))
  if (data.code === '000000') {
    ElMessage.success(`${msgText.value}文案类型成功`)
    getAllTypeText()
  } else {
    ElMessage.error(`${msgText.value}文案类型失败`)
    throw new Error(`${msgText.value}文案类型失败`)
  }
}

export const dialogFormVisible = ref(false)
export const DeleteTypeText = async (id: number) => {
  await ElMessageBox.confirm('此操作将永久删除该文案类型, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).catch(() => {
    ElMessage.info('已取消删除')
    return new Promise(() => {})
  })
  const { data } = await deleteTypeText(id)
  if (data.code === '000000') {
    ElMessage.success('删除文案类型成功')
    getAllTypeText()
  } else {
    ElMessage.error('删除文案类型失败')
    throw new Error('删除文案类型失败')
  }
}
