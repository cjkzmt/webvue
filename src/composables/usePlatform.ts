import { getAll, saveOrUpdate, deletePlatform, enablepublish,forbidpublish,type Item } from '@/api/platform'
import { ElMessage, ElMessageBox } from 'element-plus'
import { reactive, ref } from 'vue'
//保存数据
export const allPlatform = ref([] as Item[])
//获取所有平台
export const getAllPlatform = async () => {
  const { data } = await getAll()
  if (data.code === '000000') {
    allPlatform.value = data.data
  } else {
    ElMessage.error('获取平台信息失败')
    throw new Error('获取平台信息失败')
  }
}
import { type FormInstance } from 'element-plus'
export const forminstance = ref<FormInstance>()
export const form = reactive({
  name: '',
  sort: 0,
  English: '',
  publishurl: '',
  Scrapeurl: '',
  character:30,
  keycount:5,
  verification:'',
  advance: 13,
  publishverif: '',
})
export const initAndShow = (id = 0) => {
  forminstance.value?.resetFields()
  dialogFormVisible.value = true
  if (id) {
    isCreate.value = false
    msgText.value = '更新'
    const TypeVideo = allPlatform.value.find((item) => item.id === id)
    Object.assign(form, TypeVideo)
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
const distext = ref('账号组')
import {createHandler ,createDeleteHandler } from '@/utils/Common'
export const handleDelete = createDeleteHandler({
  deleteFn: deletePlatform,
  refresh: getAllPlatform,
  getDisplayName: () => distext.value
})
export const handlepublishChange = createHandler(
  enablepublish,forbidpublish,
  getAllPlatform
)

