import { getAll, saveOrUpdate, deleteMenu, getEditMenuInfo } from '@/api/menus'
import type { MenuItem } from '@/api/menus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, computed } from 'vue'
import type { CreateOrEnditMenu } from '@/api/menus'
import router from '@/router/index'
export function useMenus() {
  const allMenus = ref([] as MenuItem[])
  const getAllMenus = async () => {
    const { data } = await getAll()
    if (data.code === '000000') {
      allMenus.value = data.data
    } else {
      ElMessage.error('获取菜单信息失败')
      throw new Error('获取菜单信息失败')
    }
  }
  const topMenus = computed(() => {
    return allMenus.value.filter((menu: MenuItem) => menu.level === 0)
  })
  //表单的响应数据
  const form = ref<CreateOrEnditMenu>({
    name: '',
    href: '',
    parentId: -1,
    description: '',
    icon: '',
    show: true,
    orderNum: 0,
  })
  //提交表单
  const onSubmit = async () => {
    const { data } = await saveOrUpdate(form.value)
    if (data.code === '000000') {
      ElMessage.success(`${msgText.value}成功！`)
      router.push({ name: 'menus' })
      // getAllMenus()
    } else {
      ElMessage.error(`${msgText.value}失败`)
      throw new Error(`${msgText.value}失败`)
    }
    return
  }

  //删除菜单事件处理
  const handleDelete = async (id: number) => {
    await ElMessageBox.confirm('此操作将永久删除该菜单, 是否继续?', '删除提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).catch(() => {
      ElMessage.info('已取消删除')
      return new Promise(() => {})
    })

    const { data } = await deleteMenu(id)
    if (data.code === '000000') {
      ElMessage.success('删除菜单成功！')
      getAllMenus()
    } else {
      ElMessage.error('删除菜单失败')
      throw new Error('删除菜单失败')
    }
  }
  const getMenuInfoById = async (id: number) => {
    if (!Number(id)) {
      isCreate.value = true
      return
    } else {
      isCreate.value = false
    }
    const { data } = await getEditMenuInfo(id)
    if (data.code === '000000') {
      ElMessage.success('获取菜单信息成功！')
      form.value = data.data
    } else {
      ElMessage.error('获取菜单信息失败')
      throw new Error('获取菜单信息失败')
    }
  }
  //状态与提示文字
  const isCreate = ref(true)
  const msgText = computed(() => (isCreate.value ? '添加菜单' : '更新菜单'))
  return { allMenus, getAllMenus, topMenus, form, onSubmit, handleDelete, getMenuInfoById, msgText }
}
