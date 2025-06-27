import request from '@/utils/request'

type Common<T> = {
  code: string
  data: T
  mesg: string
  time: string
}
export type ResourceCategory = {
  id: number
  name: string
  operatorId: number | null
  selected: boolean
  sort: number
  createdBy: string
  createdTime: string
  updatedBy: string | null
  updatedTime: string | null
}
export const getAll = () => {
  return request<Common<ResourceCategory[]>>({
    method: 'GET',
    url: '/api/resource/category/getAll',
  })
}
type ResourceCategoryprams = Pick<ResourceCategory, 'name' | 'sort'> & {
  id?: number
}
//保存或更新资源类别
export const saveOrUpdate = (data: ResourceCategoryprams) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/resource/category/saveOrUpdate',
    data,
  })
}
//删除资源类别
export const deleteCategory = (id: number) => {
  return request<Common<boolean>>({
    method: 'DELETE',
    url: `/api/resource/category/${id}`,
  })
}
