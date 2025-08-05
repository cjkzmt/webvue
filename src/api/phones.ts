import request from '@/utils/request'
import type {Common ,Result,Condition} from '@/utils/QueryResult'
export type QueryCondition = Partial<Condition&{
  Brand: string
  PhoneName: string
}>
export type TopItem = {
  id: number
  name: string
  sort: number}
type InItem =TopItem& {
  Model: string
  Brand: string
  Owner: string}

type Item =InItem& {
  Verification: string
  createdTime: string
  status: 'ENABLE' | 'DISABLE'}

export type QueryResult = Result<Item[]>

export const getPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/api/phone/getPages',
    data: queryCondition,
  })
}

type CreateOrEnditphone = Partial<InItem>
export const saveOrUpdate = (data: CreateOrEnditphone) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/phone/saveOrUpdate',
    data,
  }).catch((error) => {
    console.error('操作失败', error)
    throw new Error('操作失败')
  })
}

export const deletePhone = (id: number) => {
  return request<Common<boolean>>({
    method: 'DELETE',
    url: `/api/phone/${id}`,
  }).catch((error) => {
    console.error('删除手机信息失败', error)
    throw new Error('删除手机信息失败')
  })
}

export const enablePhone = (phone_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/phone/saveOrUpdate',
    data: {
      id: phone_id,
      status: 'ENABLE',
    },
  })
}

export const forbidPhone = (phone_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/phone/saveOrUpdate',
    data: {
      id: phone_id,
      status: 'DISABLE',
    },
  })
}

export const TopIteams = () => {
  return request<Common<TopItem[]>>({
    method: 'GET',
    url: '/api/phone/TopIteams',
  }).catch((error) => {
    console.error('获取菜单信息失败', error)
    throw new Error('获取菜单信息失败')
  })
}
