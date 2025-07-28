import {
  getAll,
  saveOrUpdate,
  deleteCategory,
  type ResourceCategory,
} from '@/api/resource-category'
import { ElMessage } from 'element-plus'
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
import { type FormInstance } from 'element-plus'
export const forminstance = ref<FormInstance>()
export const initAndShow = (id = 0) => {
  forminstance.value?.resetFields()
  dialogFormVisible.value = true
  if (id) {
    isCreate.value = false
    msgText.value = '更新'
    const resourceCategory = allResourceCategory.value.find((item) => item.id === id)
    Object.assign(form, resourceCategory)
  } else {
    isCreate.value = true
    msgText.value = '创建'
  }
}

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

const distext = ref('账号组')
import {createDeleteHandler } from '@/utils/Common'
export const handleDelete = createDeleteHandler({
  deleteFn: deleteCategory,
  refresh: getAllResourceCategory,
  getDisplayName: () => distext.value
})
