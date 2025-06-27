import request from '@/utils/request'
type Common<T> = {
  code: string
  data: T
  mesg: string
  time: string
}
export type PlatformItem = {
  id: number
  name: string
  sort: number
}

export const getAll = () => {
  return request<Common<PlatformItem[]>>({
    method: 'GET',
    url: '/api/platform/getAll',
  }).catch((error) => {
    console.error('获取菜单信息失败', error)
    throw new Error('获取菜单信息失败')
  })
}

// type CreateOrEnditPlatform = Partial<PlatformItem>
export type CreateOrEnditPlatform = Partial<PlatformItem>
export const saveOrUpdate = (PlatformInfo: CreateOrEnditPlatform) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/platform/saveOrUpdate',
    data: PlatformInfo,
  }).catch((error) => {
    console.error('添加菜单信息失败', error)
    throw new Error('添加菜单信息失败')
  })
}

export const deletePlatform = (id: number) => {
  return request<Common<boolean>>({
    method: 'DELETE',
    url: `/api/Platform/${id}`,
  }).catch((error) => {
    console.error('删除菜单信息失败', error)
    throw new Error('删除菜单信息失败')
  })
}
