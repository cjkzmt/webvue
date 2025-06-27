import request from '@/utils/request'
type Common<T> = {
  code: string
  data: T
  mesg: string
  time: string
}
export type MenuItem = {
  id: number
  name: string
  description: string
  href: string | null
  icon: string | null
  level: number
  orderNum: number
  show: boolean
  parentId: number | null
  createdBy: string
  createdTime: string
  operatorId: number | null
  updatedBy: string | null
  updatedTime: string | null
}

export const getAll = () => {
  return request<Common<MenuItem[]>>({
    method: 'GET',
    url: '/api/menu/getAll',
  }).catch((error) => {
    console.error('获取菜单信息失败', error)
    throw new Error('获取菜单信息失败')
  })
}

// type CreateOrEnditMenu = Partial<MenuItem>
export type CreateOrEnditMenu = Pick<
  MenuItem,
  'parentId' | 'name' | 'href' | 'icon' | 'orderNum' | 'description' | 'show'
> & { id?: number }
export const saveOrUpdate = (menuInfo: CreateOrEnditMenu) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/menu/saveOrUpdate',
    data: menuInfo,
  }).catch((error) => {
    console.error('添加菜单信息失败', error)
    throw new Error('添加菜单信息失败')
  })
}

export const deleteMenu = (id: number) => {
  return request<Common<boolean>>({
    method: 'DELETE',
    url: `/api/menu/${id}`,
  }).catch((error) => {
    console.error('删除菜单信息失败', error)
    throw new Error('删除菜单信息失败')
  })
}

export const getEditMenuInfo = (id: number) => {
  return request<Common<MenuItem>>({
    method: 'GET',
    url: `/api/menu/${id}`,
  }).catch((error) => {
    console.error('获取菜单信息失败', error)
    throw new Error('获取菜单信息失败')
  })
}
