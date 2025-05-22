import { getAll } from '@/api/menus'
import type { MenuItem } from '@/api/menus'
import { ElMessage } from 'element-plus'
import { ref, computed } from 'vue'

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
  return { allMenus, getAllMenus, topMenus }
}
