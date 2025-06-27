import request from '@/utils/request'
type Common<T> = {
  code: string
  data: T
  mesg: string
  time: string
}
export type ReleasePlanItem = {
  id: number
  hour: number
  minute: number
}

export const getAll = () => {
  return request<Common<ReleasePlanItem[]>>({
    method: 'GET',
    url: '/api/releaseplan/getAll',
  }).catch((error) => {
    console.error('获取菜单信息失败', error)
    throw new Error('获取菜单信息失败')
  })
}

export type CreateOrEnditReleasePlan = Partial<ReleasePlanItem>
export const saveOrUpdate = (ReleasePlanInfo: CreateOrEnditReleasePlan) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/releaseplan/saveOrUpdate',
    data: ReleasePlanInfo,
  }).catch((error) => {
    console.error('添加菜单信息失败', error)
    throw new Error('添加菜单信息失败')
  })
}

export const deleteReleasePlan = (id: number) => {
  return request<Common<boolean>>({
    method: 'DELETE',
    url: `/api/releaseplan/${id}`,
  }).catch((error) => {
    console.error('删除菜单信息失败', error)
    throw new Error('删除菜单信息失败')
  })
}
