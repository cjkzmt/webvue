import request from '@/utils/request'
import type {Common ,Result,Condition} from '@/utils/QueryResult'
export type QueryCondition = Partial<Condition&{name: string}>
export type TopItem = {
  id: number
  name: string}
type InItem = TopItem&{url: string}

type Item = InItem&{
  createdTime: string
  status: 'ENABLE' | 'DISABLE'}

export type QueryResult = Result<Item[]>

type CreateOrEnditfont = Partial<InItem>

export const getPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/api/font/getPages',
    data: queryCondition,
  })
}
export const saveOrUpdate = (data: CreateOrEnditfont) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/font/saveOrUpdate',
    data,
  }).catch((error) => {
    console.error('操作失败', error)
    throw new Error('操作失败')
  })
}
export const deleteFont = (id: number) => {
  return request<Common<boolean>>({
    method: 'DELETE',
    url: `/api/font/${id}`,
  }).catch((error) => {
    console.error('删除电脑信息失败', error)
    throw new Error('删除电脑信息失败')
  })
}
export const enableFont = (font_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/font/saveOrUpdate',
    data: {
      id: font_id,
      status: 'ENABLE',
    },
  })
}
export const forbidFont = (font_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/font/saveOrUpdate',
    data: {
      id: font_id,
      status: 'DISABLE',
    },
  })
}
export const TopIteams = () => {
  return request<Common<TopItem[]>>({
    method: 'GET',
    url: '/api/font/TopIteams',
  }).catch((error) => {
    console.error('获取菜单信息失败', error)
    throw new Error('获取菜单信息失败')
  })
}
